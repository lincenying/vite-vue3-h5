import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { loadEnv } from 'vite'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import vueSvgPlugin from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const vmDesignWidth = 375 // 设计稿宽度
const vmDesignMultiple = vmDesignWidth / 750
const minWindow = '320Px' // 兼容最小宽度
const maxWindow = '540Px' // 兼容最小宽度
const vmFontSize = 37.5

export const fontSize = vmFontSize

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    const config = {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    $vmDesignWidth: ${vmDesignWidth};
                    $vmDesignMultiple: ${vmDesignMultiple};
                    $minWindow: ${minWindow};
                    $maxWindow: ${maxWindow};
                    $vmFontSize: ${vmFontSize};
                `
                }
            }
        },
        define: {
            designWidth: JSON.stringify(vmDesignWidth),
            designMultiple: JSON.stringify(vmDesignMultiple),
            minWindow: JSON.stringify(minWindow),
            maxWindow: JSON.stringify(maxWindow),
            fontsize: JSON.stringify(vmFontSize)
        },
        plugins: [
            createHtmlPlugin({
                inject: {
                    data: {
                        VITE_APP_ENV: process.env.VITE_APP_ENV,
                        VITE_APP_API_DOMAIN: process.env.VITE_APP_API_DOMAIN,
                        VITE_APP_API: process.env.VITE_APP_API,
                        MODE: mode
                    }
                }
            }),
            VueMacros({
                plugins: {
                    vue: vuePlugin({
                        template: {
                            compilerOptions: {
                                isCustomElement: tag => ['def'].includes(tag)
                            }
                        }
                    }),
                    vueJsx: vueJsx()
                }
            }),
            // vuePlugin({
            //     reactivityTransform: true,
            //     template: {
            //         compilerOptions: {
            //             isCustomElement: tag => ['def'].includes(tag)
            //         }
            //     }
            // }),
            // vueJsx(),
            vueSvgPlugin(),
            AutoImport({
                eslintrc: {
                    enabled: true
                },
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/ // .md
                ],
                imports: [
                    'vue',
                    'vue-router',
                    '@vueuse/core',
                    '@vueuse/head',
                    {
                        pinia: ['defineStore', 'storeToRefs'],
                        'vue-router': ['createRouter', 'createWebHashHistory'],
                        '@/utils': ['UTC2Date', 'deepClone']
                    }
                ],
                dts: 'src/auto-imports.d.ts',
                dirs: ['src/components', 'src/echarts', 'src/pinia', 'src/mixins'],

                resolvers: [VantResolver()],
                defaultExportByFilename: false,
                vueTemplate: true,
                cache: false
            }),
            Components({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/ // .md
                ],
                extensions: ['vue', 'tsx', 'jsx'],
                resolvers: [VantResolver()],
                dts: 'src/components.d.ts'
            }),
            UnoCSS({
                /* options */
            })
            // Inspect()
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src')
            }
        },

        base: './',
        build: {
            minify: true,
            assetsInlineLimit: 4096,
            chunkSizeWarningLimit: 1000,
            outDir: 'dist',
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'index.html')
                },
                external: /\.\/assets.*/
            }
        },
        server: {
            port: 7771,
            proxy: {
                '/api': {
                    target: 'http://php.mmxiaowu.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/api'
                    }
                }
            }
        }
    }
    return config
}
