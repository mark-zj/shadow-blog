// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/shadow-blog',
  mode:'development',
  publicDir:'public',
  build:{
    outDir: "docs",
    assetsDir: './assets', // 指定静态文件引入路径为 "./assets"
    sourcemap: false,
    chunkSizeWarningLimit: 2000, // 设置 chunk 大小警告的限制为 2000 KiB
    chunkSizeLimit: 5000, // 设置 chunk 大小的限制为 5000 KiB
    emptyOutDir: true, // 在构建之前清空输出目录
    rollupOptions: {
      output: {
        // 在这里修改静态资源路径
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        // assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        assetFileNames(assetInfo) {
          const baseUrl = 'assets'
          if (assetInfo.name.endsWith(".css")) {
            return `${baseUrl}/css/[name]-[hash].css`
          }
          if ([".png", ".jpg", ".jpeg", ".svg", ".ico", ".webp"].some((item) => assetInfo.name.endsWith(item))) {
            return `${baseUrl}/img/[name]-[hash].[ext]`
          }
          if([".ttf",".eot","woff2","woff"].some((item) => assetInfo.name.endsWith(item))) {
            return `${baseUrl}/fonts/[name]/[hash].[ext]`
          }
          return `${baseUrl}/[name]-[hash].[ext]`
        },
        manualChunks(id) {
          // Vue 及其相关库的 chunk
          if (id.includes('vue') || id.includes('core-js') || id.includes('@babel/runtime')) {
            return 'vendor';
          }
          // 其他库的 chunk
          if (id.includes('node_modules')) {
            return 'dependencies';
          }
          // 默认情况下将模块放入一个单独的 chunk
          return 'common';
        },
      },
    },
  },
  plugins: [
    VueRouter(),
    Layouts(),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components(),
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
