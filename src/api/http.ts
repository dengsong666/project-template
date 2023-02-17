import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000
})
const errors: AnyObj = {
  401: 'token 失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址错误',
  500: '服务器故障',
  undefined: '网络连接故障'
}
interface ResponseData<T> {
  msg?: string
  data: T
  code: string
}
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    //  伪代码
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data
    // 根据自定义错误码判断请求是否成功
    if (code === 200) return data
    else {
      // 处理业务错误。
      // Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // Message.error(errors[status as unknown as string])
    return Promise.reject(error)
  }
)

export const http = <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', config: AxiosRequestConfig): Promise<ResponseData<T>> => service.request({ ...config, method })
