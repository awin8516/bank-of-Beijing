import { defineConfig, resolveBaseUrl } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
const pathResolve = (dir) => resolve( __dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"./",
  resolve:{
    alias:{
      "@":pathResolve("./src")
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "@/assets/scss/global.scss";'
      }
    }
  }
  
})
