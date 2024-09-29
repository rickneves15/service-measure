import { Body, Controller, Get } from '@nestjs/common'

import { MeasurementsService } from '../measurements/measurements.service'
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
    const imageUrl = await this.measurementsService.saveImage(data.image)
    const measurementData = {
      ...data,
      image: imageUrl,
    }
    return this.measurementsService.create(measurementData)
  }
}
