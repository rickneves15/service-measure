import { z } from 'zod'

import { measureModelSchema } from '@/common/models/measurement'

export const createMeasureSchema = measureModelSchema.omit({
  has_confirmed: true,
})

export type CreateMeasure = z.infer<typeof createMeasureSchema>
