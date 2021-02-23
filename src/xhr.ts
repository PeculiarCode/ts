import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './type'
import { parseheaders } from './helpers/header'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)
    request.onerror = function handleEror() {
      reject(new Error('Network Error'))
    }
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4 || request.status === 0) {
        return
      }
      const responseHeaders = parseheaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
    //请求超时事件
    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
