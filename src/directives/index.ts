import type { App } from 'vue'
const modules = import.meta.glob('./modules/*.ts', { eager: true })

export function setupDirective(app: App<Element>) {
  Object.keys(modules).forEach((k) => {
    app.directive(
      k.replace(/.\/modules\/(\w+).ts/g, (r, p) => p),
      (modules[k] as any).default
    )
  })
}
