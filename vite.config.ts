import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fa } from 'element-plus/es/locale'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // 公共路径，默认值为‘/’
  // base: '/',

  //
  server: {
    //host为前端服务器监听IP，默认为localhost，为0.0.0.0时监听所有IP
    //host: "0.0.0.0",
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        ws: false,
        rewrite: (pathStr) => pathStr.replace('/api', ''),
        timeout: 5000,
      },
    },
  },
});
