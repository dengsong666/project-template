<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { getConfig, getUnreadCount } from './apis'
import { useCommon } from './store'

const common = useCommon()
onLaunch(async () => {
  console.log('App Launch')
  uni.hideTabBar({ animation: false })
  common.audioCtx = uni.createInnerAudioContext()
  common.config = await getConfig()
  if (uni.getStorageSync('token')) {
    const { unreadMessageCount } = await getUnreadCount()
    common.unread = unreadMessageCount
  }
  uni.loadFontFace({
    global: true,
    family: 'AlibabaPuHuiTi-Regular',
    source: 'https://file.fishyoumusic.top/source/b0ddb2c5-a8b5-4c39-97bb-150312b41d2e.ttf',
    success: console.log,
    fail: console.error
  })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import "@tuniao/tn-style/dist/uniapp/index.css";
@import "@/static/styles/iconfont.css";
@import "@/static/styles/global.scss";
@import "@/static/styles/tn-reset.scss";
</style>
