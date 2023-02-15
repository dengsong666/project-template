import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { basicRoutes, modulesRoutes } from './routes'
const router = createRouter({
  routes: [...basicRoutes, ...modulesRoutes],
  history: createWebHistory()
})
export function setupRouter(app: App) {
  setupRouterGuard(router)
  app.use(router)
}
export default router
