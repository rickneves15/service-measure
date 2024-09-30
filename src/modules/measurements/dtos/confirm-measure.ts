import { z } from 'zod'

import { measureModelSchema } from '@/common/models/measurement'

export const confirmMeasureSchema = measureModelSchema.pick({
  measure_uuid: true,
  measure_value: true,
})

export type ConfirmMeasure = z.infer<typeof confirmMeasureSchema>
