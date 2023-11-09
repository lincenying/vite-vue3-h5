import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { BuildOptions, ServerOptions } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: { server: ServerOptions; build: BuildOptions } = {
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        minify: true,
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            },
            external: /\.\/static.*/,
        },
    },
    server: {
        port: 7771,
        proxy: {
            '/api': {
                target: 'https://php.mmxiaowu.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
        },
    },
}

export default config
