// 类型
export const Type = {
  value: (obj: any) => Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'),
  isNumber: (obj: any) => Type.value(obj) === 'Number',
  isString: (obj: any) => Type.value(obj) === 'String',
  isBoolean: (obj: any) => Type.value(obj) === 'Boolean',
  isObject: (obj: any) => Type.value(obj) === 'Object',
  isSymbol: (obj: any) => Type.value(obj) === 'Symbol',
  isUndefined: (obj: any) => Type.value(obj) === 'Undefined',
  isNull: (obj: any) => Type.value(obj) === 'Null',
  isFunction: (obj: any) => Type.value(obj) === 'Function',
  isDate: (obj: any) => Type.value(obj) === 'Date',
  isArray: (obj: any) => Type.value(obj) === 'Array',
  isRegexp: (obj: any) => Type.value(obj) === 'Regexp',
  isError: (obj: any) => Type.value(obj) === 'Error',
  isHTMLDocument: (obj: any) => Type.value(obj) === 'HTMLDocument',
  isGlobal: (obj: any) => Type.value(obj) === 'global'
}
// 保证数的运算浮点精度
export const strip = (num: number, precision = 12) => +parseFloat(isNaN(num) ? '0' : num.toPrecision(precision))
// 倒计时
export const countDown = (s: number, cb: Function, timer?: any) => (timer = setInterval(() => (s < 0 ? clearInterval(timer) : cb(s--)), 1000))
// hms格式化
export const hms = (s: number, f: [string, string, string] = [':', ':', '']) =>
  new Date(s * 1000)
    .toISOString()
    .slice(11, 19)
    .replace(/(\d+)/, (r, p) => `${parseInt(`${s / 86400}`) * 24 + +p}`)
    .replace(/(\d+):(\d+):(\d+)/g, (r, p1, p2, p3) => `${p1 + f[0] + p2 + f[1] + p3 + f[2]}`)

// 钱格式化
export const moneyFormat = (v: number, delimiter = ',') => v.toString().replace(/(\d)(?=(?:\d{3})+$)/g, `$1${delimiter}`)
