<template>
    <div class="wrap">
        <router-view v-slot="{ Component }" class="body" :class="{ 'is-tab': routeIsTab }">
            <transition
                v-if="!$$global.globalLoading"
                :name="transitionName"
                @before-enter="handleBeforeEnter"
                @after-enter="handleAfterEnter"
                @after-leave="handleAfterLeave"
            >
                <keep-alive :include="cacheComponents">
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
        <van-tabbar v-if="routeIsTab" route :border="false" class="fixed-center">
            <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/home-normal" icon="home-o">首页2</van-tabbar-item>
            <van-tabbar-item replace to="/lists" icon="home-o">列表</van-tabbar-item>
            <van-tabbar-item replace to="/about" icon="search">关于</van-tabbar-item>
        </van-tabbar>
        <div v-if="$$global.globalLoading" class="global-loading">
            <van-loading type="spinner" size="32px" />
        </div>
        <div v-if="$$global.routerLoading" class="router-loading">
            <van-loading type="spinner" size="32px" color="#1989fa" />
        </div>
    </div>
</template>
<script>
import {
    // 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并应返回一个带有 get 和 set 的对象
    // customRef,
    // 检查对象是否是由 reactive 或 readonly 创建的 proxy
    // isProxy,
    // 检查对象是否是 reactive创建的响应式 proxy
    // isReactive,
    // 检查对象是否是由readonly创建的只读 proxy
    // isReadonly,
    // 检查值是否是由 ref 创建的 proxy
    // isRef,
    // 标记一个对象，使其永远不会转换为 proxy。返回对象本身
    // markRaw,
    // 返回对象的响应式副本
    // reactive,
    // 获取一个对象 (响应式或纯对象) 或 ref 并返回原始 proxy 的只读 proxy
    // readonly,
    // 接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property .value
    ref,
    // 返回 reactive 或 readonly proxy 的原始对象
    // toRaw,
    // 可以用来为源响应式对象上的 property 新创建一个 ref
    // toRef,
    // 使用 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象
    computed,
    // 创建一个只有在需要时才会加载的异步组件
    // defineAsyncComponent,
    // 从实现上看，defineComponent 只返回传递给它的对象
    // defineComponent,
    // getCurrentInstance 支持访问内部组件实例，用于高阶用法或库的开发
    // getCurrentInstance,
    // 将回调推迟到下一个 DOM 更新周期之后执行
    // nextTick,
    // 生命周期 ======>
    // 被 keep-alive 缓存的组件激活时调用
    // onActivated,
    // 在挂载开始之前被调用
    // onBeforeMount,
    // 在卸载组件实例之前调用
    // onBeforeUnmount,
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前
    // onBeforeUpdate,
    // 被 keep-alive 缓存的组件停用时调用
    // onDeactivated,
    // 当捕获一个来自子孙组件的错误时被调用
    // onErrorCaptured,
    // 实例被挂载后调用
    // onMounted,
    // 卸载组件实例后调用
    // onUnmounted,
    // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
    // onUpdated,
    // 生命周期 <======
    // useContext,
    watch
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它
    // watchEffect,
    // 返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文
    // createApp,
    // 字符串模板的另一种选择，允许你充分利用 JavaScript 的编程功能
    // render
} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import 'virtual:windi.css'
import '@/assets/scss/style.scss'

export default {
    name: 'app-root',
    setup() {
        const route = useRoute()
        const store = useStore()

        setTimeout(() => {
            store.commit('global/globalLoading', false)
        }, 1500)

        const transitionName = ref('fade')
        const cacheComponents = ref('home-router,home-normal-router,lists-router,about-router')

        const metaIndex = ref(route.meta.index)

        watch(
            () => route.fullPath,
            () => {
                const newMetaIndex = route.meta.index
                // 同级路由切换或者打开的第一个页面, 使用 fade 切换动画
                // 打开子级路由, 使用 slide-left 切换动画
                // 子级路由返回, 使用 slide-right 切换动画
                if (!metaIndex.value || newMetaIndex === metaIndex.value) {
                    transitionName.value = 'fade'
                } else if (newMetaIndex > metaIndex.value) {
                    transitionName.value = 'slide-left'
                } else {
                    transitionName.value = 'slide-right'
                }
                metaIndex.value = newMetaIndex
            }
        )

        const routeIsTab = computed(() => {
            return ['/index', '/home-normal', '/lists', '/about'].includes(route.path)
        })

        const handleBeforeEnter = () => {
            store.commit('global/setPageSwitching', true)
        }
        const handleAfterEnter = () => {
            store.commit('global/setPageSwitching', false)
        }
        const handleAfterLeave = () => {
            // root.$emit('triggerScroll')
        }

        return {
            routeIsTab,
            transitionName,
            cacheComponents,
            handleBeforeEnter,
            handleAfterEnter,
            handleAfterLeave
        }
    }
}
</script>
