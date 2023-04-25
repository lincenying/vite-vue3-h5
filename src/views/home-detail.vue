<template>
    <div class="home-detail-wrap">
        <van-nav-bar title="" left-text="返回" left-arrow fixed :border="false" class="fixed-center" @click-left="onClickLeft" />
        <div class="route-wrap">
            <van-skeleton v-if="!detail" title :row="4" class="mt-20px" />
            <div v-else class="article-content flex flex-col">
                <div class="title text-16px leading-20px">{{ detail.c_title }}</div>
                <p class="date-time">{{ detail.c_posttime }}</p>
                <div class="content text-green-500 p-10px text-12px font-500 rounded-full" v-html="detail.c_content" />
            </div>
            <!-- <div v-if="detail" class="replies">
                <van-panel v-for="(item, index) in detail.replies" :key="index" :title="item.author.loginname" :desc="item.create_at" status="">
                    <div v-html="item.content"></div>
                </van-panel>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '@/types'

defineOptions({
    name: 'home-detail-router',
})

const { route, router } = useGlobal()

// pinia 状态管理 ===>
// const mainStore = useMainStore()
// const { counter, name } = storeToRefs(mainStore)
// const tmpCount = computed(() => mainStore.counter)
// 监听状态变化
// mainStore.$subscribe((mutation, state) => {
//     console.log('mutation :>> ', mutation)
//     console.log('state :>> ', JSON.stringify(state))
// })
// pinia 状态管理 <===

// 父子组件通讯 ===>
// const prop = defineProps({
//     imgArr: Array
// })

// const { imgArr } = toRefs(prop)
// 父子组件通讯 <===

// 全局组件通信 ===>
// const dataIsReady = inject('dataIsReady')
// 全局组件通信 <===

let detail = $ref<Article>()

useHead({
    title: computed(() => detail?.c_title || ''),
})

async function getDetail() {
    // this.$store.commit('global/routerLoading', true)
    const { code, data } = await $Api.get(`article/detail/${route.query.id}`, {})
    if (code === 200)
        detail = data

    // this.$store.commit('global/routerLoading', false)
}

function onClickLeft() {
    router.go(-1)
}

getDetail()
</script>
