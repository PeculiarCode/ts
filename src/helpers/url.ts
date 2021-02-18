import { isDate, isObject } from './utils'
// function encode
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  /*   params:{
        bar:[],

  } */
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val == null) {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${key}=${val}`)
    })
  })
}
