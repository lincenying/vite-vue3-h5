<template>
    <div class="about-detail-wrap">
        <van-nav-bar title="标题" left-text="返回" left-arrow fixed :border="false" class="fixed-center" @click-left="onClickLeft" />
        <div class="route-wrap">
            <div class="mt-10px">
                <van-grid square>
                    <van-grid-item v-for="value in 28" :key="value" icon="photo-o" text="文字" />
                </van-grid>
                <div class="w-30px h-30px"><MyIcon /></div>
                <JsxComponents />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MyIcon from '@/assets/svgs/mp3.svg?component'

defineOptions({
    name: 'AboutDetailRouter',
})

const { router } = useGlobal()

useHead({
    title: 'About Detail',
})

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

function onClickLeft() {
    router.go(-1)
}
</script>
