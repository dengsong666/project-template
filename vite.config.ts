import { resolve } from 'node:path'
import Uni from '@dcloudio/vite-plugin-uni'
import PiniaAutoRefs from 'pinia-auto-refs'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import { defineConfig, loadEnv } from 'vite'
// https://vitejs.dev/config/
export default ({ mode }) => {

  // const { VITE_BASE_URL } = loadEnv(mode, process.cwd())
  return defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins: [
      PiniaAutoRefs({
        outputFile: 'src/utils/pinia-auto-refs.ts',
      }),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'uni-app',
          'pinia',
          {
            '@/utils/pinia-auto-refs': ['useStore'],
          },
        ],
        exclude: ['createApp'],
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        extensions: ['vue'],
        dts: 'types/components.d.ts',
      }),
      Uni(),
      Unocss(),
    ],
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: true, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1024, // 横屏时使用的视口宽度
          }),
        ],
      },
    },
    server: {
      open: true, // 自动打开
      base: './ ', // 生产环境路径
      proxy: {
        // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        '^/api': {
          target: 'https://api2.fishyoumusic.top/api',
          changeOrigin: true, // 开启代理
        },
      },
    },
  })
}
