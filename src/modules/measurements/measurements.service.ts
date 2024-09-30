import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from '@google/generative-ai/server'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { writeFile } from 'node:fs'
import { join } from 'node:path'

import { MeasureType } from '@/common/enums/measure-type'
import { BizException } from '@/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '@/constants/error-code.constant'
import { imageBase64ToBlob } from '@/lib/images'
import { generateUUID } from '@/lib/uuid'

import { ConfirmMeasure } from './dtos/confirm-measure'
import { CreateMeasure } from './dtos/create-measure'
import { GetInformationImageResponse } from './dtos/get-information-image'
import { SaveImageResponse } from './dtos/save-image-response'

@Injectable()
export class MeasurementsService {
  private Logger = new Logger(MeasurementsService.name)

  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMeasure) {
    const measurementExists = await this.prisma.measurement.findUnique({
      where: {
        measure_uuid: '019243f2-e6dd-7995-9e38-524a3c06272c',
      },
    })

    if (
      measurementExists &&
      new Date(data.measure_datetime).getMonth() ===
        new Date(measurementExists.measure_datetime).getMonth()
    ) {
      throw new BizException(
        ErrorCodeEnum.DOUBLE_REPORT,
        'Leitura do mês já realizada',
      )
    }

    return this.prisma.measurement.create({
      data: {
        measure_uuid: data.measure_uuid,
        customer_code: data.customer_code,
        image_url: data.image_url,
        measure_type: data.measure_type,
        measure_value: data.measure_value,
        measure_datetime: data.measure_datetime,
      },
    })
  }

  async findByUuid(measureUuid: string) {
    const measurementExists = await this.prisma.measurement.findUnique({
      where: {
        measure_uuid: measureUuid,
      },
    })

    if (!measurementExists) {
      throw new BizException(
        ErrorCodeEnum.MEASURE_NOT_FOUND,
        'Nenhuma leitura encontrada',
      )
    }

    return measurementExists
  }

  async findByCustomerCode(customerCode: string, measureType?: MeasureType) {
    let measurements = await this.prisma.measurement.findMany({
      where: {
        customer_code: customerCode,
      },
    })

    if (measureType && Object.keys(MeasureType).indexOf(measureType) === -1) {
      throw new BizException(
        ErrorCodeEnum.INVALID_TYPE,
        'Tipo de medição não permitida',
      )
    }

    if (measureType && measureType in MeasureType) {
      console.log('AAAAAAAA')
      measurements = measurements.filter(
        (measurement) => measurement.measure_type === measureType,
      )
    }

    if (!measurements) {
      throw new BizException(
        ErrorCodeEnum.MEASURE_NOT_FOUND,
        'Nenhuma leitura encontrada',
      )
    }

    return {
      customer_code: customerCode,
      measures: measurements,
    }
  }

  async confirm(data: ConfirmMeasure) {
    const measurement = await this.findByUuid(data.measure_uuid)

    if (measurement.has_confirmed) {
      throw new BizException(
        ErrorCodeEnum.CONFIRMATION_DUPLICATE,
        'Leitura do mês já realizada',
      )
    }

    await this.prisma.measurement.update({
      where: {
        measure_uuid: data.measure_uuid,
      },
      data: {
        has_confirmed: true,
        measure_value: data.measure_value ?? measurement.measure_value,
      },
    })

    return {
      success: true,
    }
  }

  async saveImage(image: string): Promise<SaveImageResponse> {
    const blob = await imageBase64ToBlob(image)
    const buffer = Buffer.from(await blob.arrayBuffer())
    const fileName = `${Date.now()}.png`

    writeFile(join(process.cwd(), 'uploads', fileName), buffer, () =>
      this.Logger.log(`uploaded ${fileName} image to uploads directory`),
    )

    const imageUrl = `http://localhost:3000/uploads/${fileName}`

    return {
      imageUrl,
      fileName,
    }
  }

  async getInformationImage(
    imageUrl: string,
    fileName: string,
  ): Promise<GetInformationImageResponse> {
    const uploadDir = join(process.cwd(), 'uploads')
    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY)

    const imagePath = join(uploadDir, fileName)

    const uploadResult = await fileManager.uploadFile(imagePath, {
      mimeType: 'image/png',
      displayName: fileName,
    })

    this.Logger.log(
      `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
    )

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent([
      ` Leia a imagem do hidrômetro e extraia o GUID e o valor atual do consumo, se possível e me liste usando JSON schema.

        Link da imagem: ${imageUrl}

        Retorno esperado: {
        "GUID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        "value": valor desconhecido
        }

        OBS: caso ocorra um erro, retorne um GUID com valor null.
      `,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ])

    let response
    try {
      JSON.parse(result.response.text())
    } catch (error) {
      this.Logger.log("JSON isn't valid", error)
    }

    return {
      GUID: response?.GUID || generateUUID(),
      value: response?.Valor || 0,
    }
  }
}
