import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['../shared','./src','./node_modules','./dist']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../shared'),

    },
  },
  build: {
    cssMinify: true
  }
})
