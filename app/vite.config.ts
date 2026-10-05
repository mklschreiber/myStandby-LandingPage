import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { seoPlugin } from './vite-plugin-seo'

// https://vite.dev/config/
export default defineConfig({
  // Base URL for GitHub Pages; '/' for a custom domain, '/repo-name/' for username.github.io
  base: process.env.VITE_BASE_URL || '/',
  plugins: [vue(), seoPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
