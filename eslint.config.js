import { readFile } from 'node:fs/promises'
import eslintConfig from '@lincy/eslint-config'
import plugin from '@unocss/eslint-plugin'

const autoImport = JSON.parse(
    await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url)),
)

const config = eslintConfig(
    undefined,
    {
        plugins: {
            '@unocss': plugin,
        },
        rules: plugin.configs.recommended.rules,
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
    {
        ignores: [
            '**/assets',
            '**/static',
        ],
    },
)

export default config
