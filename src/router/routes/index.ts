const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
export const modulesRoutes = Object.values(modules)
  .map((item: any) => item.default)
  .flat()
export * from './basic'
