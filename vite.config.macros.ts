import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import type { PluginOption } from 'vite'

export default (): PluginOption[] => ([
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
