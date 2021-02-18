import { AxiosRequestConfig } from './type'
export default function xhr(config: AxiosRequestConfig) {
  const { url, data = null, method = 'get' } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
