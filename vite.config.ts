import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许所有 IP 地址访问
    port: 5173 // 可以指定端口号，Vite 默认端口是 5173
  }
})
