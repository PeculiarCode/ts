import { isPlainObject } from '../helpers/utils'
export function trnasformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      //catch
    }
    return data
  }
}
