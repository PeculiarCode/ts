import { AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosInstance } from './type'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { transformResponse } from './helpers/data'
import xhr from './core/xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'
// function axios(config: AxiosRequestConfig): AxiosPromise {
//   processConfig(config)
//   return xhr(config).then(res => {
//     return transformResponseData(res)
//   })
// }
// function transformResponseData(res: AxiosResponse): AxiosResponse {
//   res.data = transformResponse(res.data)
//   return res
// }
// function processConfig(config: AxiosRequestConfig): void {
//   config.url = transformURL(config)
//   config.headers = transformHeaders(config)
//   config.data = transformRequestData(config)
// }
// function transformURL(config: AxiosRequestConfig): string {
//   const { url, params } = config
//   return buildURL(url!, params)
// }
// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }
// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance()
export default axios
