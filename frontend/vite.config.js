import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Homet',
        short_name: 'Homet',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3f51b5',
        icons: [
          {
            src: '/IMG_5860.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/IMG_5860.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})