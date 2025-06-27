import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
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
                        src: '/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/icon-180.png',
                        sizes: '180x180',
                        type: 'image/png',
                        purpose: 'any'
                    }
                ]
            }
        })
    ],
    server: {
        https: {
            key: fs.readFileSync('../localhost-key.pem'),
            cert: fs.readFileSync('../localhost.pem'),
        },
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    },
    //ブラウザではglobalが未定義でエラー global=>windowに置き換え
    //lamejs
    define: {
        global: 'window',
    },
    optimizeDeps: {
        include: ['lamejs'],
    },
    //@ffmpeg/ffmpeg
    // define: {
    //     'process.env.NODE_ENV': '"production"',
    //     global: 'window',
    // },
    // optimizeDeps: {
    //     include: ['@ffmpeg/ffmpeg'], // ← 明示的に含める
    // },
})