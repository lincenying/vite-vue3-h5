import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import DefineProps from '@vue-macros/define-props/vite'
import DefinePropsRefs from '@vue-macros/define-props-refs/vite'

import type { PluginOption } from 'vite'

export default (): PluginOption[] => ([
    vuePlugin({
        template: {
            compilerOptions: {
                isCustomElement: (tag: string) => ['def'].includes(tag),
            },
        },
    }),
    vueJsx(),
    /**
     * Reactivity Transform
     * @see https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html
     */
    ReactivityTransform(),
    /**
     * defineProps
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props.html
     */
    DefineProps(),
    /**
     * definePropsRefs
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props-refs.html
     */
    DefinePropsRefs(),
])
