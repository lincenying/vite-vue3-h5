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
     * @description 响应性语法糖
     * @see https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html
     */
    ReactivityTransform(),
    /**
     * defineProps
     * @description 使用 $defineProps 可以正确地解构 props 的类型
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props.html
     */
    DefineProps(),
    /**
     * definePropsRefs
     * @description 从 defineProps 中将返回 refs 而不是 reactive 对象，可以在不丢失响应式的情况下解构 props
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props-refs.html
     */
    DefinePropsRefs(),
])
