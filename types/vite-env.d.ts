/// <reference types="vite/client" />
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title: string // 标题
    icon?: string // 图标
    hidden?: boolean // 菜单显示
  }
}
