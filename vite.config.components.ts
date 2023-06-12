import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default () => ([
    AutoImport({
        eslintrc: {
            enabled: true,
        },
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        imports: [
            'vue',
            'vue-router',
            '@vueuse/core',
            '@vueuse/head',
            {
                'pinia': ['defineStore', 'storeToRefs'],
                'vue-router': ['createRouter', 'createWebHashHistory'],
                'vant': ['showDialog'],
                '@lincy/utils': ['deepClone', 'deepMerge', 'UTC2Date'],
            },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/components', 'src/composables', 'src/pinia', 'src/api'],

        resolvers: [VantResolver()],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    Components({
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        extensions: ['vue', 'tsx', 'jsx'],
        resolvers: [VantResolver()],
        dts: 'src/components.d.ts',
    }),
])
