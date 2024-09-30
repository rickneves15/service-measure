import { z } from 'zod'

export const getInformationImageResponseSchema = z.object({
  GUID: z.string(),
  value: z.number(),
})

export type GetInformationImageResponse = z.infer<
  typeof getInformationImageResponseSchema
>
