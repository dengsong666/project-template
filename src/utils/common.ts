import type { FormItemRule, FormRules } from '@tuniao/tnui-vue3-uniapp'
import dayjs from 'dayjs'
import { baseApi } from './config'

export const showMsg = (title: string, ret = true) => {

  console.log('showMsg')
  uni.showToast({ icon: 'none', title, duration: 3000, success() { } }), ret
}
export const navTo = (url: string, params: { [key: string]: any } = {}) => uni.navigateTo({ url: `${url}?${Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')}` })
export const storage = {
  get: (key: string, sync = true) => {
    if (sync) {
      try { return uni.getStorageSync(key) }
      catch (e) { }
    }
    else { uni.getStorage({ key, success: () => { } }) }
  },
  set: (key: string, data: any, sync = true) => {
    if (sync) {
      try { uni.setStorageSync(key, data) }
      catch (e) { }
    }
    else { uni.setStorage({ key, data, success: () => { } }) }
  },
  del: (key: string, sync = true) => {
    if (sync) {
      try { uni.removeStorageSync(key) }
      catch (e) { }
    }
    else { uni.removeStorage({ key, success: () => { } }) }
  },
}
export const date = (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm')
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
/**
 * 合并对象
 * @param target 目标对象
 * @param obj 覆盖对象
 * @param exclude 排除对象
 * @returns
 */
export const mergeObj = (target: any, obj: any, exclude: string[] = []) => Object.keys(target).forEach(key => obj?.[key] !== undefined && !exclude.includes(key) && (target[key] = obj[key]))
/**
 * 针对内联样式
 * @param px
 * @returns
 */
export const px2vw = (px: number): string => `${px / 375 * 100}vw`

/**
 * 校验必填触发提交
 * @param form
 * @param rules
 * @param exclude
 * @returns
 */
export const isRequiredValid = (form: Record<string, any>, rules: FormRules, exclude: string[] = []) => Object.entries(rules).every(([k, v]) => exclude.includes(k) || ((v as FormItemRule[]).some(item => item?.required) ? (form[k] || form[k]?.length) : true))
/**
 * 复制
 * @param data
 * @param desc
 * @returns
 */
export const copy = (data: string, desc = '') => uni.setClipboardData({ data, success: () => uni.showToast({ icon: 'none', title: `复制${desc}成功` }) })

/**
 * 上传文件
 * @param api
 * @param filePath
 * @param name
 * @returns
 */
export async function uploadFile(api: string, filePath: string, name = 'file'): Promise<any> {
  uni.showLoading({ title: '上传中', })
  return new Promise(resolve => uni.uploadFile({
    url: `${baseApi}${api}`,
    filePath,
    name,
    header: { Authorization: storage.get('token') },
    success: res => {
      const { data, message, code } = JSON.parse(res.data)
      uni.hideLoading()
      code ? showMsg(message) : showMsg('上传成功')
      code || resolve(data)
    },
    fail: uni.hideLoading,
  }))
}
/**
 * 正则表达式集合
 */
export const regexp = {
  phone: /^1[3-9]\d{9}$/
}
/**
 * 通知订阅
 * @param type 
 */
type Inform = '发布作品' | '发布比稿' | '参加比稿' | '预留作品' | '放弃合作-作者' | '放弃合作-预留者'
export function inform(type: Inform) {
  uni.requestSubscribeMessage({
    tmplIds: {
      '发布作品': ['QDY82NcXHWlf5rueKttLogTx8ZilBECpjstPtrgHRyc', 'qkVjxyF-Uovz-oTwk4c_f9SDtrDFPqwppnQxN5kGYa0', 'C6NDzqA2UamqovScEhAxldBvAv2N7Sm4OtDRMtIdecE'],
      '发布比稿': ['09zzb7FnU2cA9QRBpkzJlXVps1xJTadHWzb1_963KWI'],
      '参加比稿': ['09zzb7FnU2cA9QRBpkzJlXVps1xJTadHWzb1_963KWI'],
      '预留作品': ['C6NDzqA2UamqovScEhAxldBvAv2N7Sm4OtDRMtIdecE'],
      '放弃合作-作者': ['QDY82NcXHWlf5rueKttLogTx8ZilBECpjstPtrgHRyc'],
      '放弃合作-预留者': ['C6NDzqA2UamqovScEhAxldBvAv2N7Sm4OtDRMtIdecE'],
    }[type],
    success: console.log,
    fail: console.error,
  })
}