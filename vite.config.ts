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
      '@appTypes': path.resolve(__dirname, '../shared'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@components': path.resolve(__dirname, './src/components'),
      '@images': path.resolve(__dirname, './src/assets/imgs')
    },
  },
  build: {
    cssMinify: true
  }
})
