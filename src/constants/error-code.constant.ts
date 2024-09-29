export enum ErrorCodeEnum {
  INVALID_DATA = 'INVALID_DATA',
  INVALID_TYPE = 'INVALID_TYPE',
  MEASURE_NOT_FOUND = 'MEASURE_NOT_FOUND',
  DOUBLE_REPORT = 'DOUBLE_REPORT',
  CONFIRMATION_DUPLICATE = 'CONFIRMATION_DUPLICATE',
}

export const ErrorCode = Object.freeze<Record<ErrorCodeEnum, [string, number]>>(
  {
    [ErrorCodeEnum.INVALID_DATA]: ['Invalid data', 400],
    [ErrorCodeEnum.INVALID_TYPE]: ['Invalid type', 400],
    [ErrorCodeEnum.MEASURE_NOT_FOUND]: ['Measure not found', 404],
    [ErrorCodeEnum.DOUBLE_REPORT]: ['Double report', 409],
    [ErrorCodeEnum.CONFIRMATION_DUPLICATE]: ['Confirmation duplicate', 409],
  },
)
