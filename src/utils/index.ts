export * from './common'
declare global {
  interface String {
    case(this: string): string
  }
}
String.prototype.case = function (upper = true) {
  return this.replace(/\S/, (s) => (upper ? s.toUpperCase() : s.toLowerCase()))
}
