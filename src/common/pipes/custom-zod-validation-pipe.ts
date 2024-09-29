import { createZodValidationPipe } from 'nestjs-zod'
import { ZodError } from 'zod'

import { BizException } from '@/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '@/constants/error-code.constant'

export const CustomZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) =>
    new BizException(ErrorCodeEnum.INVALID_DATA, error?.errors[0]?.message),
})
