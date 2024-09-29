import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { MeasureType } from '@/common/enums/measure-type'

export const measureUploadSchema = z.object({
  image: z.string().min(1, 'Image is required').base64('Invalid base64 image'),
  customer_code: z.string().min(1, 'customer_code is required'),
  measure_datetime: z
    .string()
    .min(1, 'measure_datetime is required')
    .datetime({ message: 'Invalid measure_datetime' }),
  measure_type: z.nativeEnum(MeasureType, {
    message: 'Invalid measure_type',
  }),
})

export class MeasureUploadDto extends createZodDto(measureUploadSchema) {}
