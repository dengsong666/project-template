import piniaPluginPersist from 'pinia-plugin-persist-uni'

const store = createPinia()
const { screenWidth, statusBarHeight, safeAreaInsets } = uni.getSystemInfoSync()
store.use(piniaPluginPersist)
export default store
export const useCommon = defineStore('common', {
  state: () => ({
    
  }),
})
