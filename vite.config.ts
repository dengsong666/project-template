import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [AntDesignVueResolver()],
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
        dts: 'types/components.d.ts'
      }),
      Unocss({
        configFile: './uno.config.ts'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '#': resolve(__dirname, './types')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/global.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // 是否开启 https
      https: false,
      proxy: {
        '/api': {
          // 需要代理的路径   例如 '/api'
          // target: `${VITE_BASE_URL}:${VITE_BASE_PORT}`, // 代理到 目标路径
          target: `${VITE_BASE_URL}`, // 代理到 目标路径
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', '')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString()?.split('node_modules/')[2]?.split('/')
              if (arr?.includes('vue')) return 'vue'
              else return 'module'
            } else return 'src'
          }
        }
      }
    }
  })
}
