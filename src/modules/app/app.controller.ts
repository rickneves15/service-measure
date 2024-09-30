import { Body, Controller, Get } from '@nestjs/common'

import { MeasurementsService } from '@/modules/measurements/measurements.service'

import { AppService } from './app.service'
import { MeasureUploadDto } from './dtos/upload.dto'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly measurementsService: MeasurementsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('upload')
  async upload(@Body() data: MeasureUploadDto) {
    const { imageUrl, fileName } = await this.measurementsService.saveImage(
      data.image,
    )

    const { GUID, value } = await this.measurementsService.getInformationImage(
      imageUrl,
      fileName,
    )

    return this.measurementsService.create({
      measure_uuid: GUID,
      customer_code: data.customer_code,
      image_url: imageUrl,
      measure_type: data.measure_type,
      measure_value: value,
      measure_datetime: data.measure_datetime,
    })
  }
}
