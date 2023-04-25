<template>
    <!-- eslint-disable vue/valid-v-model -->
    <div class="about-wrap" :class="$options.name">
        <div class="route-wrap p-10px">
            <div class="">
                <van-cell-group>
                    <van-cell icon="points" title="我的积分" is-link to="/about/detail" />
                    <van-cell icon="gold-coin-o" title="我的优惠券" is-link to="/about/detail" />
                    <van-cell icon="gift-o" title="我的头像" is-link to="/about/avatar" />
                </van-cell-group>
            </div>
            <div class="mt-10px">
                <van-cell-group>
                    <van-field value="输入框已禁用" label="用户名" left-icon="contact" />
                    <van-field value="输入框已禁用" label="密码" left-icon="browsing-history-o" />
                </van-cell-group>
            </div>
            <div class="mt-10px">
                <van-button plain hairline type="primary" size="small">细边框按钮</van-button>
                <van-button loading type="primary" size="small" />
                <van-button loading type="primary" size="small" loading-type="spinner" />
                <van-button loading type="danger" size="small" loading-text="加载中..." />
            </div>
            <div class="mt-10px">
                <van-image width="5rem" height="5rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="mt-10px">
                <van-button type="primary" size="small" @click="showPopup"> 展示弹出层 </van-button>
                {{ res.dateText }}
            </div>
            <div class="mt-10px">
                <van-button type="primary" size="small" @click="handleToast">加载提示</van-button>
            </div>
            <div class="mt-10px">
                <van-button type="primary" size="small" @click="previewShow = true">图片预览</van-button>
                <van-image-preview v-model:show="previewShow" :images="images" />
            </div>
            <div class="mt-10px">
                <van-button type="primary" size="small" @click="dialogShow = true">组件调用Dialog</van-button>
                <van-button type="primary" size="small" @click="handleDialog">全局调用Dialog</van-button>
            </div>
            <!-- slot 插槽示例 -->
            <img-list :img-arr="images">
                <template #default="props">
                    <!-- {{ props }} -->
                    <van-image width="60" height="60" :src="props.item" @click="handleClickImg(props)" />
                </template>
            </img-list>
            <!-- <div class="mt-10px">
                <van-count-down :time="100000000" format="DD 天 HH 时 mm 分 ss 秒" />
                <van-count-down :time="100000000" format="HH 时 mm 分 ss 秒" />
            </div> -->
            <van-popup v-model:show="res.show" position="bottom" class="fixed-center" :style="{ height: '40%' }">
                <van-date-picker v-model="res.currentDate" type="date" @confirm="dateChange" @cancel="res.show = false" />
            </van-popup>
            <van-dialog v-model:show="dialogShow" :before-close="dialogBeforeClose" title="标题" show-cancel-button>
                <img src="https://img.yzcdn.cn/vant/apple-3.jpg" style="max-width: 100%">
            </van-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showImagePreview } from 'vant'

defineOptions({
    name: 'about-router',
})

const { ctx } = useGlobal()

useHead({
    title: 'About',
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

useSaveScroll()

const previewShow = ref(false)
const dialogShow = ref(false)

const res = reactive({
    show: false,
    currentDate: [],
    dateText: '',
})

function showPopup() {
    res.show = true
}
function dateChange(val: { selectedValues: any[] }) {
    res.dateText = val.selectedValues.join('-')
    res.show = false
}

function handleToast() {
    const toast1 = ctx.$toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...',
    })
    setTimeout(() => {
        toast1.close()
    }, 3000)
}
function dialogBeforeClose(action: 'confirm' | 'cancel'): any {
    return new Promise((resolve) => {
        if (action === 'confirm') {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        }
        else {
            resolve(true)
        }
    })
}
function handleDialog() {
    ctx.$dialog
        .confirm({
            title: '提示',
            message: '代码是写出来给人看的，附带能在机器上运行',
        })
        .then(() => {
            ctx.$toast.default('click confirm')
        })
        .catch(() => {
            ctx.$toast.default('click cancel')
        })
}

const images = ref([
    'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
    'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
    'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
    'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
])
function handleClickImg(props: { index: number }) {
    showImagePreview({
        images: images.value,
        startPosition: props.index,
    })
}
</script>
