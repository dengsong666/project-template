import { createApp } from 'vue'
import App from './App.vue'
import { setupDirective } from './directives'
import { setupRouter } from './router'
import { setupStore } from './store'
import 'uno.css'
const app = createApp(App)
setupDirective(app)
setupStore(app)
setupRouter(app)
app.mount('#app')
