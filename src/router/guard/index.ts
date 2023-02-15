import type { Router } from 'vue-router'
import { createAuthGuard } from './auth'

export function setupRouterGuard(router: Router) {
  createAuthGuard(router)
}
