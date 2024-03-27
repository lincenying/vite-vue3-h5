<template>
    <div class="wrap">
        <router-view v-slot="{ Component }" class="body" :class="{ 'is-tab': routeIsTab }">
            <transition
                v-if="!globalLoading"
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
            <van-tabbar-item replace to="/">
                <span>首页</span>
                <template #icon="props">
                    <div v-if="props.active" class="i-mdi-home-account" text-amber />
                    <div v-else class="i-mdi-home" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/lists">
                <span>列表</span>
                <template #icon="props">
                    <div v-if="props.active" class="i-mdi-view-dashboard-outline" text-amber />
                    <div v-else class="i-mdi-view-dashboard-outline" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/about">
                <span>关于</span>
                <template #icon="props">
                    <div v-if="props.active" class="i-mdi-account-settings" text-amber />
                    <div v-else class="i-mdi-account-settings-outline" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
        <div v-if="globalLoading" class="global-loading">
            <van-loading type="spinner" size="32px" />
        </div>
        <div v-if="routerLoading" class="router-loading">
            <van-loading type="spinner" size="32px" color="#1989fa" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AppRoot',
})

const { route, globalStore } = useGlobal()

// pinia 状态管理 ===>
const { globalLoading, routerLoading } = storeToRefs(globalStore)
// const tmpCount = computed(() => globalStore.counter)

// pinia 状态管理 <===

setTimeout(() => {
    globalStore.setGlobalLoading(false)
}, 200)

const cacheComponents = $ref('home-router,lists-router,about-router')

let transitionName = $ref('fade')
let metaIndex = $ref<number>(route.meta.index as number)

watch(
    () => route.fullPath,
    () => {
        const newMetaIndex = route.meta.index as number
        // 同级路由切换或者打开的第一个页面, 使用 fade 切换动画
        // 打开子级路由, 使用 slide-left 切换动画
        // 子级路由返回, 使用 slide-right 切换动画
        if (!metaIndex || newMetaIndex === metaIndex)
            transitionName = 'fade'
        else if (newMetaIndex > metaIndex)
            transitionName = 'slide-left'
        else
            transitionName = 'slide-right'

        metaIndex = newMetaIndex
    },
)

const routeIsTab = computed(() => {
    return ['/', '/lists', '/about'].includes(route.path)
})

function handleBeforeEnter() {
    globalStore.$patch({ isPageSwitching: true })
}
function handleAfterEnter() {
    globalStore.$patch({ isPageSwitching: false })
}
function handleAfterLeave() {
    // root.$emit('triggerScroll')
}
</script>
