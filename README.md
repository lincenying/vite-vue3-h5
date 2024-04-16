# Vue3 项目模板

vue3 H5端脚手架, 包含技术栈(Vue3 + Vant + Pinia + Vite + TS + Unocss)

## Variations

-   [vite-nuxt3](https://github.com/lincenying/vite-nuxt3) - Nuxt3 + Vite 入门模板
-   [vite-uniapp-vue3](https://github.com/lincenying/vite-uniapp-vue3) - Uniapp3 + Vite 入门模板
-   [vite-react-mobx-ssr](https://github.com/lincenying/vite-react-mobx-ssr) - React + Mobx + Vite + SSR 入门模板
-   [vite-react-mobx](https://github.com/lincenying/vite-react-mobx) - React + Mobx + Vite 入门模板
-   [vite-react-redux](https://github.com/lincenying/vite-react-redux) - React + Redux + Vite 入门模板
-   [vite-vue3-h5-ssr](https://github.com/lincenying/vite-vue3-h5-ssr) - Vue3 + Vant + Vite + SSR 入门模板
-   [vite-vue3-h5](https://github.com/lincenying/vite-vue3-h5) - Vue3 + Vant + Vite 入门模板
-   [vite-vue3-admin](https://github.com/lincenying/vite-vue3-admin) - Vue3 + ElementPlus + Vite 管理后台入

## 环境变量

预留4套环境变量, 具体参数可查看根目录的 `.env.xxx`, 其中 `development` 为开发环境, `test, staging, production` 依次为 `测试环境, 预发布环境, 正式环境`
根据自己需要, 启动/编译不同的环境

## Rem 适配

设计稿相关参数配置见: `src/design.config.ts`, 按UI给的设计稿, 修改即可

设计稿宽度: `designWidth`
设计稿高度: `designHeight`
字号: `fontSize`

字号大小, 尽量配合Ui库, 比如默认使用的vant UI组件库就是设计稿宽度为375, rootfontsize为37.5
如果你的设计稿是750的, 方法有2
1: 设计稿宽度设置为750, 然后字号设置成75, 然后css代码的宽高按设计稿中实际的书写, 然后在postcss插件, 针对性判断vant的字号改成37.5( vite.config.css.ts 里已做了适配vant组件库)
2: 设计稿宽度设置为375, 然后字号设置成37.5, 然后css代码的宽高按设计稿中实际尺寸/2书写, 也可以将设计稿尺寸调整到375后, 按375的实际尺寸书写

一般项目中有3类代码的单位需要转换, 分别是自己写的css代码, 组件库或者其他第三方插件带的css代码, 使用unocss写的原子化css
具体插件配置详见: `vite.config.css.ts`

## 自动引入UI库组件/项目组件/函数等

项目已经配置了`unplugin-auto-import`和`unplugin-vue-components`
前者能自动引入vue, vue-router, vueuse等提供的方法, 而无需一遍遍的`import`
后者能自动引入UI组件, 及项目被定义的组件, 也不用一遍遍的`import`
详细配置见: `vite.config.components.ts`
相关文档见:
https://github.com/antfu/unplugin-auto-import#readme
https://github.com/antfu/unplugin-vue-components#readme

## Pinia 状态管理

vue 官方出品的, 比vuex更好用的状态管理
使用方法:
在pinia文件夹下,新建一个ts文件, 如: `use-global-store.ts`
里面代码如下:

```ts
import type { GlobalState } from './pinia.types'

const useStore = defineStore('globalStore', () => {
    const state: GlobalState = reactive({
        globalLoading: true,
        routerLoading: false,
    })

    const setGlobalLoading = (payload: boolean) => {
        state.globalLoading = payload
    }
    const setRouterLoading = (payload: boolean) => {
        state.routerLoading = payload
    }

    return {
        ...toRefs(state),
        setGlobalLoading,
        setRouterLoading,
    }
})

export default useStore
```

那么在需要用到该状态管理的地方, 只需要

```ts
const userStore = useGlobalStore()
userStore.setGlobalLoading(true)
```

即可, 因为配置了`unplugin-auto-import`, 所以根本无需要`import`, 你只需要直接把文件名改成驼峰的方式, 直接当函数使用即可
注意: 直接用文件名当函数名, 只有代码是用`export default`导出时可用, 如果是用`export const xxx`, `export function xxx {}` 这样导出的, 那么直接使用xxx作为方法名即可
具体可以看`src/auto-imports.d.ts`为你生成了那些方法, 这里的方法都可以直接使用, 而无需`import`

## 路由

放在`views`文件夹下的`vue`文件, 都会自动加入路由中, 子文件夹里的则不会, 根据你自己的使用情况, 可以修改`src/router/index.ts`以适配
是使用`hash`还是`history`模式, 也可以在上面的文件中修改

## Api封装

`src/api/index.ts`封装了`get, post, put, delete`4中常用的方法, 分别对应4种method, 而`$api`为全局方法, 可以在任何`.vue`页面, 直接使用`$api.get/post/put/delete`
接口默认判断code=200为正常返回, 如果后端接口不是用code作为判断, 那么需要在`src/api/index.ts`做对应修改
如:

```ts
let detail: NullAble<Article> = null
async function getDetail() {
    const { code, data } = await $api.get<Article>('article/detail', {})
    if (code === 200) {
        detail = data
    }
}

getDetail()
```

## 列表封装: useLists

在`src/composables/index.ts`中封装了`useLists`方法, 让你所有上拉加载, 下拉刷新几行代码就搞定, 如:

```ts
const apiConfig = {
    api: {
        method: 'get',
        url: 'article/lists',
        config: { per_page: 20, tab: '' },
    },
}
const { api, page, config, dataList, getList, onRefresh } = useLists<Article>(apiConfig)
```

如上面代码, 只需要将接口相关参数传入接口, 返回的参数中, `api`为传入的接口相关参数(响应式的Ref数据), `page`为当前页数(响应式的Ref数据),
`config`为加载状态(响应式的Ref数据), `dataList`为数据列表(响应式的Ref数据), `getList`为请求列表的方法, `onRefresh`为刷新数据的方法

模板代码为:

```html
<template>
    <van-pull-refresh v-model="config.isLoading" @refresh="onRefresh">
        <van-list
            :loading="config.loading"
            :immediate-check="false"
            :finished="config.finished"
            :error="config.error"
            loading-text="努力加载中"
            finished-text="我也是有底线的"
            error-text="请求失败，点击重新加载"
            @load="getList"
        >
            <van-cell
                v-for="(item, index) in dataList"
                :key="`${index}_${item.c_id}`"
                :title="item.c_title"
                is-link
                :to="`/home/detail?id=${item.c_id}`"
            />
        </van-list>
    </van-pull-refresh>
</template>
```

如果你需要做搜索, 或者切换分类什么的, 也很简单, 假设我现在需要修改tab的值,然后重新请求接口, 那么只需要:

```ts
function changeTab(tab: string) {
    api.value.config.tab = tab
    page.value = 1
    getList()
}
```

先更新api里的相关参数/充值page数为1, 然后重新请求接口即可

上面`config`返回的参数如下:

```json
{
  // 下拉刷新 ==>
  "isLoading": false,
  "isRefresh": false,
  // <==下拉刷新
  // 滚动加载 ==>
  "loadStatus": "loadmore", // 'loadmore' | 'nomore' | 'loading'
  "isLock": false, // 请求过程中锁定, 防止重复请求
  "loading": false, // 加载状态 (直接判断loadStatus==='loading'也可以)
  "error": false, // 接口是否报错
  "finished": false // 列表是否已加载完成, 即是否到最后一页 (直接判断loadStatus==='nomore'也可以)
  // <==滚动加载
}
```

接口默认返回数据接口为:

```json
{
  "code": 200,
  "data": {
    "total": 992,
    "per_page": 20,
    "current_page": 1,
    "last_page": 50,
    "data": []
  }
}
```

如果你用的接口返回数据结构不一样, 需要在`src/composables/index.ts`稍做修改

## 开发环境配置proxy跨域

```
{
    server: {
        port: 7771,
        proxy: {
            '/api': {
                target: 'https://php.mmxiaowu.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
        },
    },
}
```

详见: `vite.config.build.ts`

## Mock

在`mock`文件夹, 创建ts文件, 按mock规则添加接口即可, 详情见: `mock/module-index.ts`
相关文档见:
https://github.com/anncwb/vite-plugin-mock/tree/master/#readme

## Unocss

unocss是一个及时/按需/原子化的css引擎, 项目中也做了相关配置, 可直接使用
配置见:
https://github.com/lincenying/base-config/blob/main/src/uno.h5.config.ts
官方文档见:
https://unocss.dev/

## eslint/stylelint/prettierrc/vue-tsc

根目录下的`.eslintrc.json`、`.stylelintrc.json`、`.prettier`内置了 lint 规则，帮助你规范地开发代码，有助于提高团队的代码质量和协作性，可以根据团队的规则进行修改
注意: `prettier`只在编辑器层面, 在`eslint`中并没有添加`prettier`插件

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm serve
```

### Compiles and minifies for production

```bash
# 测试环境
pnpm build:test
# 预发布环境
pnpm build:staging
# 生产环境
pnpm build
```

### Preview for production

```
pnpm start
```

### Lints and fixes files

```
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
