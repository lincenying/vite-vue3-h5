import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { viteMockServe } from '@lincy/vite-plugin-mock'

import vueSvgPlugin from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'

import VueMacros from 'unplugin-vue-macros'
import { warmup } from 'vite-plugin-warmup'

import Components from './vite.config.components'
import Build from './vite.config.build'
import Css from './vite.config.css'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    const localMock = true

    const config = {
        plugins: [
            VueMacros.vite({
                plugins: {
                    vue: vuePlugin({
                        template: {
                            compilerOptions: {
                                isCustomElement: tag => ['def'].includes(tag),
                            },
                        },
                    }),
                    vueJsx: vueJsx(),
                },
            }),
            vueSvgPlugin(),
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve' && localMock,
                logger: true,
            }),
            Components(),
            UnoCSS({
                /* options */
            }),
            warmup({
                // warm up the files and its imported JS modules recursively
                clientFiles: ['./src/main.ts', './src/views/*.vue'],
            }),
            // Inspect()
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },

        base: './',
        ...Build,
        ...Css,
    }
    return config
})
