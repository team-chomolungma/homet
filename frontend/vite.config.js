// Viteの設定ファイル
import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import fs from 'fs'

export default defineConfig(({mode}) => {
    //環境読み取り
    const env = loadEnv(mode, process.cwd(), '')

    if (env.VITE_APP_ENV === 'development') {
        console.log('開発環境です')
    } else if (env.VITE_APP_ENV === 'production') {
        console.log('本番環境です')
    } else {
        console.log('🟥環境状況が読み取れませんでした🟥')
    }


    // 環境がdevelopmentか判断(https付与すべきか判断したい)
    //Herokuは自動でやってくれるからもうまんたい
    const Local = env.VITE_APP_ENV === 'development'

    return {
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
            host: true,
            https: Local
                ? {
                    key: fs.readFileSync('../localhost-key.pem'),
                    cert: fs.readFileSync('../localhost.pem')
                }
                : false,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true
                }
            }
        }
    }
})
