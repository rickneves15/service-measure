import { z } from 'zod'

export const saveImageResponseSchema = z.object({
  imageUrl: z.string(),
  fileName: z.string(),
})

export type SaveImageResponse = z.infer<typeof saveImageResponseSchema>
