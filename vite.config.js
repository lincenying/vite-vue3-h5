const path = require('path')
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default () => {
    const config = {
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        plugins: [
            getBabelOutputPlugin({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: '3'
                        }
                    ]
                ],
                plugins: ['@babel/plugin-proposal-class-properties']
            }),
            vue(),
            styleImport({
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
