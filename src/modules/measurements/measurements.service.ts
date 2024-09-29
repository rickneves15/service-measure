import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { MeasureUploadDto } from '../app/dtos/upload.dto'

@Injectable()
export class MeasurementsService {
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
}
