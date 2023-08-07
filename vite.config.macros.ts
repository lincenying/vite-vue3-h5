import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import type { PluginOption } from 'vite'

export default (): PluginOption[] => ([
    /**
     * 探索更多的宏和语法糖到 Vue 中
     * @see https://vue-macros.sxzz.moe/zh-CN/
     */
    VueMacros.vite({
        plugins: {
            vue: vuePlugin({
                template: {
                    compilerOptions: {
                        isCustomElement: (tag: string) => ['def'].includes(tag),
                    },
                },
                script: {
                    defineModel: true,
                    propsDestructure: true, // 解构 props
                },
            }),
            vueJsx: vueJsx(),
        },
    }),
])
