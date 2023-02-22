import { Type } from './common'

/** @desc storage相关 */
type TStorageItem = {
  value: any
  expire?: string | number
  time: Date
}

type TStorageName = 'localStorage' | 'sessionStorage'

/**
 * @desc 设置storage
 * @param key 键
 * @param value 值
 * @param exprie 过期时间，如果是数值，多长时间后清除，单位毫秒，如果是string，则表示哪个时间清除
 */
const _setStorage = (storageName: TStorageName = 'localStorage', key: string, value: any, expire?: string | number) => {
  if (expire === undefined) expire = getExpire(key)
  try {
    const data: TStorageItem = {
      value, // 值
      expire, // 过期时间
      time: new Date() // 存的时间
    }

    window[storageName].setItem(key, encodeURIComponent(JSON.stringify(data)))
  } catch (err) {
    // 失败不管
  }
}

/**
 * @desc 获取storage
 * @param key 键
 */
const _getStorage = (storageName: TStorageName = 'localStorage', key: string) => {
  try {
    const data: string = window[storageName].getItem(key) as string
    // 转换
    const obj: TStorageItem = JSON.parse(decodeURIComponent(data))

    const { value, expire, time } = obj
    const now = new Date().getTime()

    // 判断有没有过期
    if (Type.isNumber(expire)) {
      const delta = now - new Date(time).getTime()

      if (delta > (expire as number)) {
        window[storageName].removeItem(key)

        return null
      }
    }

    if (Type.isString(expire)) {
      const endTime = new Date(expire as string).getTime()
      const delta = now - endTime

      if (delta >= 0) {
        window[storageName].removeItem(key)

        return null
      }
    }

    return value
  } catch (err) {
    return null
  }
}

/** @desc 获取expire */
export const getExpire = (key: string) => {
  const data: string = (localStorage.getItem(key) || sessionStorage.getItem(key)) as string
  return JSON.parse(decodeURIComponent(data))?.expire
}

/** @desc 设置localStorage */
export const setLocalStorage = (key: string, value: any, expire?: string | number) => _setStorage('localStorage', key, value, expire)

/** @desc 获取localStorage */
export const getLocalStorage = (key: string) => _getStorage('localStorage', key)

/** @desc 删除localStorage */
export const delLocalStorage = (key: string) => localStorage.removeItem(key)

/** @desc 设置sessionStorage */
export const setSessionStorage = (key: string, value: any, expire?: string | number) => _setStorage('sessionStorage', key, value, expire)

/** @desc 获取sessionStorage */
export const getSessionStorage = (key: string) => _getStorage('sessionStorage', key)

/** @desc 删除localStorage */
export const delSessionStorage = (key: string) => sessionStorage.removeItem(key)

/** @desc 获取Storage */
export const getStorage = (key: string) => getLocalStorage(key) || getSessionStorage(key)

/** @desc 删除Storage */
export const delStorage = (key: string) => (delLocalStorage(key), delSessionStorage(key))

/** @desc 正常获取localStorage */
export const localStorageNormal = (key: string, value?: string) => {
  if (value !== undefined) {
    return window.localStorage.setItem(key, value)
  }
  return window.localStorage.getItem(key)
}
