import { createPinia, defineStore } from 'pinia'
import { App } from 'vue'
const store = createPinia()
export function setupStore(app: App<Element>) {
  app.use(store)
}
export const useCommon = defineStore('common', {
  state: () => ({
    xxx: true
  }),
  actions: {
    Func() {}
  }
})
