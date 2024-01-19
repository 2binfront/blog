import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    //自动导入element组件
    ElementPlus({
      // importStyle: 'SASS',
      useSource: false
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      shortcuts: {
        frc: 'flex items-center justify-center',
        fcc: 'flex flex-col items-center justify-center',
        fcb: 'flex flex-col items-center justify-between',
        frb: 'flex items-center justify-between',
        fre: 'flex items-center justify-evenly',
        full: 'w-full h-full',
        cp: 'cursor-pointer'
      },
      transformers: [transformerDirectives(), transformerVariantGroup()]
    })
  ],
  // 公共路径，默认值为‘/’
  base: '/',
  //
  server: {
    //host为前端服务器监听IP，默认为localhost，为0.0.0.0时监听所有IP
    //host: "0.0.0.0",
    host: 'localhost',
    port: 3000,

    //前端项目路径为 http://localhost:3000，需要代理所有以 /api 开头的 API 请求，
    //把它转发到 http://localhost:8000，并且后端的 API 路径中不带 /api前缀，自动去掉 /api前缀
    proxy: {
      '/api': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        ws: false,
        rewrite: (pathStr) => pathStr.replace('/api', ''),
        timeout: 5000
      },
      '/upload': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        ws: false,
        rewrite: (pathStr) => pathStr.replace('/api', ''),
        timeout: 5000
      }
    }
  }
});
