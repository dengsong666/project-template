import type { Router } from "vue-router";

export function createAuthGuard(router: Router) {
  // 全局导航守卫
  router.beforeEach((to, from, next) => {
    if (to.name !== "NotFound" && to.matched.length === 0) {
      // 如果没有匹配到任何路由或无权限路由跳转到404
      next({ name: "NotFound" });
    } else next(); //直接放行
  });
}
