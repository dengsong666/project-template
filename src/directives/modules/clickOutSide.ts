import { DirectiveBinding } from 'vue'
export default {
  // mounted是指令的一个生命周期
  mounted(el: HTMLElement & { __vueClickOutside__: Function }, binding: DirectiveBinding) {
    const handler = (e: Event) => {
      if (el.contains(e.target as Node)) return false
      binding.value && binding.value(e)
    }
    // 给当前元素绑定个私有变量，方便在unmounted中可以解除事件监听
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
