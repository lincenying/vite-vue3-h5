<template>
    <div class="img-list-wrap" :class="$options.name" style="display: flex">
        <div v-for="(item, index) in imgArr" :key="index">
            <slot :item="item" :index="index">
                <van-image width="60" height="60" :src="item" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'ImgList',
})

const prop = defineProps<{
    imgArr: string[]
}>()

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

const { imgArr } = toRefs(prop)
// 父子组件通讯 <===

// 全局组件通信 ===>
// const dataIsReady = inject('dataIsReady')
// 全局组件通信 <===
</script>
