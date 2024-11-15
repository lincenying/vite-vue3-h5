import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default () => ([
    /**
     * 按需自动导入API
     * @see https://github.com/antfu/unplugin-auto-import#readme
     */
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
            {
                'vant': ['closeToast', 'showConfirmDialog', 'showDialog', 'showFailToast', 'showLoadingToast', 'showSuccessToast', 'showToast', 'showImagePreview'],
                'pinia': ['defineStore', 'storeToRefs'],
                'vue-router': ['createRouter', 'createWebHashHistory'],
                '@unhead/vue': ['useHead'],
                '@lincy/utils': ['deepClone', 'deepMerge', 'UTC2Date'],
            },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/components', 'src/**/components', 'src/composables', 'src/stores'],

        resolvers: [VantResolver()],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    /**
     * 按需自动导入Vue组件
     * @see https://github.com/antfu/unplugin-vue-components#readme
     */
    Components({
        dirs: ['src/components', 'src/**/components'],
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
    /**
     * 按需访问数千个图标作为组件
     * @see https://github.com/antfu/unplugin-icons#readme
     * @example <i-mdi-account-box style="font-size: 2em; color: red"/>
     */
    Icons({
        autoInstall: true,
    }),
])
