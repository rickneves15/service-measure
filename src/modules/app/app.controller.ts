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
  upload(@Body() data: MeasureUploadDto) {
    return this.measurementsService.create(data)
  }
}
