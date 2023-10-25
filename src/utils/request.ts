/* eslint-disable no-console */
import { navTo, showMsg, sleep, storage } from './common'
import { baseApi } from './config'
let reqCount = 0
interface Response {
  code: number
  data: any
  message: string
}
interface CustomOpt {
  loadingText?: string
}
/**
 * 请求
 * @param opt 
 * @param customOpt 
 * @returns 
 */
export default function http<T = any>(opt: UniApp.RequestOptions, customOpt: CustomOpt = {}): Promise<T> {
  const token = storage.get('token')
  const { url, data, method, header = {} } = opt
  const { loadingText = '加载中' } = customOpt
  token && (header.Authorization = token)
  reqCount || uni.showLoading({ title: loadingText })
  reqCount++
  return new Promise((resolve, reject) => uni.request({
    url: baseApi + url,
    data,
    method,
    header,
    success: async res => {
      reqCount--
      reqCount || uni.hideLoading()
      const { code, data, message } = res.data as Response
      if (code) {
        showMsg(message)
        if (code === 9) {
          await sleep(1000)
          storage.del('token')
          navTo('/pages/common/login/index')
        }
        reject(message)
      } else { resolve(data) }
    },
    fail: err => {
      reqCount--
      reqCount || uni.hideLoading()
      showMsg(err.errMsg)
    },
  }))
}
