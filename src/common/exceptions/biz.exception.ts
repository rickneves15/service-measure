import { HttpException } from '@nestjs/common'

import { ErrorCode, ErrorCodeEnum } from '@/constants/error-code.constant'

export class BizException extends HttpException {
  constructor(code: ErrorCodeEnum, message?: string) {
    const [defaultMessage, status] = ErrorCode[code]
    super(
      HttpException.createBody({
        error_code: code,
        error_description: message || defaultMessage,
      }),
      status,
    )
  }
}
