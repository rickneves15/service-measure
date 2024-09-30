import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { MeasureType } from '@/common/enums/measure-type'
import { MeasurementsService } from '@/modules/measurements/measurements.service'

import { ConfirmMeasure } from '../measurements/dtos/confirm-measure'
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

  @Post('upload')
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

  @Patch('confirm')
  confirm(@Body() data: ConfirmMeasure) {
    return this.measurementsService.confirm(data)
  }

  @Get(':customerCode/list')
  findOne(
    @Param('customerCode') customerCode: string,
    @Query('measure_type') measureType: MeasureType,
  ) {
    return this.measurementsService.findByCustomerCode(
      customerCode,
      measureType,
    )
  }
}
