import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from '@lincy/vite-plugin-mock'
import UnoCSS from 'unocss/vite'
import { warmup } from 'vite-plugin-warmup'
import Progress from 'vite-plugin-progress'
import Inspect from 'vite-plugin-inspect'

import Macros from './vite.config.macros'
import Components from './vite.config.components'
import Build from './vite.config.build'
import Css from './vite.config.css'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    console.log(`当前编译环境: ${process.env.VITE_APP_ENV}`)

    return {
        base: './',
        ...Build,
        ...Css,
        plugins: [
            ...Macros(),
            ...Components(),
            UnoCSS(),
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve' || process.env.VITE_APP_ENV === 'test',
                logger: true,
            }),
            warmup({
                clientFiles: ['./src/main.ts', './src/views/*.vue'],
            }),
            Inspect(),
            Progress(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },
    }
})
