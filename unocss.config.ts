import { defineConfig, presetAttributify, presetIcons, presetUno, transformerAttributifyJsx, transformerDirectives, transformerVariantGroup } from 'unocss'
import type { Preset } from '@unocss/core'

import { fontSize } from './src/design.config'

const pxRE = /(-?[\.\d]+)px/g
const remRE = /(-?[\.\d]+)rem/g

interface opType {
    baseFontSize?: number
}

function pxToRemPreset(options: opType = {}): Preset {
    const { baseFontSize = 100 } = options

    return {
        name: 'unocss-preset-px-to-rem',
        postprocess: (util) => {
            util.entries.forEach((i) => {
                const value = i[1]
                // 将px单位转成rem单位
                if (value && typeof value === 'string' && pxRE.test(value))
                    i[1] = value.replace(pxRE, (_, p1) => `${p1 / baseFontSize}rem`)
                // 将无单位生生的rem单位还原成自己需要的rem单位
                if (value && typeof value === 'string' && remRE.test(value))
                    i[1] = value.replace(remRE, (_, p1) => `${(p1 * 4) / baseFontSize}rem`)
            })
        },
    }
}

export default defineConfig({
    shortcuts: [
        ['flex--c', 'flex items-center'],
        ['flex-cc', 'flex justify-center items-center'],
        ['flex-bc', 'flex justify-between items-center'],
        ['text-h3', 'text-34px text-orange-600 leading-45px'],
        ['text-h4', 'text-32px text-dark-200 leading-45px'],
        ['text-h5', 'text-28px text-dark-200 leading-45px'],
        ['text-h6', 'text-24px text-dark-200 leading-33px'],
        ['text-h6-b', 'text-24px text-dark-200 leading-33px font-500'],
        ['text-p', 'text-24px text-hex-999 leading-33px'],
    ],
    presets: [
        /**
         * 默认预设
         * @see https://unocss.dev/presets/uno
         */
        presetUno(),
        /**
         * 开启属性模式
         * @see https://unocss.dev/presets/attributify
         * @example <div text="sm white" font="mono light"></div>
         */
        presetAttributify(),
        /**
         * 开启自定义图标模式
         * @see https://unocss.dev/presets/icons
         * @example <div i-<collection>-<icon></div>
         */
        presetIcons({
            prefix: 'i-',
        }),
        pxToRemPreset({ baseFontSize: fontSize }),
    ],
    transformers: [
        /** 开启jsx文件的属性模式
         * @see https://unocss.dev/transformers/attributify-jsx
         */
        transformerAttributifyJsx(),
        /**
         * 启用 --uno: 功能
         * @see https://unocss.dev/transformers/directives
         * @example .custom-div { --uno: text-center my-0 font-medium; }
         */
        transformerDirectives(),
        /**
         * 启用 () 分组功能
         * @see https://unocss.dev/transformers/variant-group
         * @example <div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
         */
        transformerVariantGroup(),
    ],
    safelist: 'svg-text1 svg-text2'.split(' '),
    rules: [],
})
