const path = require('path')

import { loadEnv } from 'vite'
import { createStyleImportPlugin, AndDesignVueResolve, VantResolve, ElementPlusResolve, NutuiResolve, AntdResolve } from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import vueSvgPlugin from 'vite-plugin-vue-svg'
import WindiCSS from 'vite-plugin-windicss'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const config = {
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
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
            vue(),
            vueSvgPlugin(),
            createStyleImportPlugin({
                resolves: [AndDesignVueResolve(), VantResolve(), ElementPlusResolve(), NutuiResolve(), AntdResolve()],
                libs: [
                    {
                        libraryName: 'ant-design-vue',
                        esModule: true,
                        resolveStyle: name => {
                            return `ant-design-vue/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'antd',
                        esModule: true,
                        resolveStyle: name => {
                            return `antd/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'vant',
                        esModule: true,
                        resolveStyle: name => {
                            return `vant/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'element-ui',
                        resolveStyle: name => {
                            return `element-ui/lib/theme-chalk/${name}.css`
                        },
                        resolveComponent: name => {
                            return `element-ui/lib/${name}`
                        }
                    },
                    {
                        libraryName: 'element-plus',
                        resolveStyle: name => {
                            return `element-plus/lib/theme-chalk/${name}.css`
                        },
                        resolveComponent: name => {
                            return `element-plus/lib/${name}`
                        }
                    }
                ]
            }),
            WindiCSS({
                safelist: 'prose prose-sm m-auto text-left'
            })
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src')
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
