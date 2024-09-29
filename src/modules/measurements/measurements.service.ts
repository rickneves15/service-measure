import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { writeFile } from 'node:fs'
import { join } from 'node:path'

import { imageBase64ToBlob } from '@/lib/images'

import { MeasureUploadDto } from '../app/dtos/upload.dto'

@Injectable()
export class MeasurementsService {
  private Logger = new Logger(MeasurementsService.name)

  constructor(private readonly prisma: PrismaService) {}

  async create(data: MeasureUploadDto) {
    return this.prisma.measurement.create({
      data: {
        customer_code: data.customer_code,
        image_url: data.image,
        measure_type: data.measure_type,
        measure_value: '0',
        meansure_datatime: data.measure_datetime,
      },
    })
  }

  async saveImage(image: string): Promise<string> {
    const blob = await imageBase64ToBlob(image)
    const buffer = Buffer.from(await blob.arrayBuffer())
    const fileName = `${Date.now()}.png`

    writeFile(join(process.cwd(), 'uploads', fileName), buffer, () =>
      this.Logger.log(`uploaded ${fileName} image to uploads directory`),
    )

    const imageUrl = `http://localhost:3000/uploads/${fileName}`

    return imageUrl
  }
}
