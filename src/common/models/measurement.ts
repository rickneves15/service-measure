import { z } from 'zod'

import { MeasureType } from '../enums/measure-type'

export const measureModelSchema = z.object({
  measure_uuid: z.string().uuid(),
  customer_code: z.string(),
  image_url: z.string(),
  measure_type: z.nativeEnum(MeasureType),
  measure_value: z.number(),
  has_confirmed: z.boolean(),
  measure_datetime: z.string().datetime(),
})

export type MeasureModel = z.infer<typeof measureModelSchema>
