import { v7 } from 'uuid'

export const generateUUID = (): string => {
  return v7()
}
