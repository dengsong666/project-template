import { createSSRApp } from 'vue'
import App from './App.vue'
import Store from './store'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App).use(Store)
  return { app }
}
