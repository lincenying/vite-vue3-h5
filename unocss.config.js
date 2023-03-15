/* eslint-disable no-useless-escape */
import { defineConfig, presetAttributify, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { fontSize } from './vite.config'

const pxRE = /(-?[\.\d]+)px/g
const remRE = /(-?[\.\d]+)rem/g

function pxToRemPreset(options = {}) {
    const { baseFontSize = 100 } = options

    return {
        name: 'unocss-preset-px-to-rem',
        postprocess: util => {
            util.entries.forEach(i => {
                const value = i[1]
                // 将px单位转成rem单位
                if (value && typeof value === 'string' && pxRE.test(value)) i[1] = value.replace(pxRE, (_, p1) => `${p1 / baseFontSize}rem`)
                // 将无单位生生的rem单位还原成自己需要的rem单位
                if (value && typeof value === 'string' && remRE.test(value)) i[1] = value.replace(remRE, (_, p1) => `${(p1 * 4) / baseFontSize}rem`)
            })
        }
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
        ['text-p', 'text-24px text-hex-999 leading-33px']
    ],
    presets: [presetUno(), presetAttributify(), pxToRemPreset({ baseFontSize: fontSize })],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    safelist: 'svg-text1 svg-text2'.split(' '),
    rules: []
})
