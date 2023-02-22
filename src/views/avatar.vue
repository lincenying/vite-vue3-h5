<template>
    <div class="avatar-wrap">
        <van-nav-bar title="" left-text="返回" left-arrow fixed :border="false" @click-left="onClickLeft" class="fixed-center" />
        <div class="w-400px h-400px">
            <VueCropper
                ref="cropper"
                :img="cropperOption.img"
                :outputSize="cropperOption.size"
                :outputType="cropperOption.outputType"
                :canMove="cropperOption.canMove"
                :canMoveBox="cropperOption.canMoveBox"
                :autoCrop="cropperOption.autoCrop"
                :fixedBox="cropperOption.fixedBox"
                :fixed="cropperOption.fixed"
                :centerBox="true"
                :autoCropWidth="cropperOption.autoCropWidth"
                :autoCropHeight="cropperOption.autoCropHeight"
            ></VueCropper>
        </div>
        <div style="text-align: center">
            <van-button @click="handleSave" type="primary" size="small">保存</van-button>
            <van-button @click="handleUpload" type="primary" size="small">上传</van-button>
            <label for="uploads">
                重选
                <input
                    type="file"
                    id="uploads"
                    style="position: absolute; clip: rect(0 0 0 0)"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                    @change="handleUploadImg($event, 1)"
                    ref="uploadImg"
                />
            </label>
        </div>
        <div v-if="avatar" class="preview">
            <img :src="avatar" alt="" />
        </div>
    </div>
</template>
<script setup name="avatar-router">
import { VueCropper } from 'vue-cropper'

import useGlobal from '@/mixins/global'

// eslint-disable-next-line no-unused-vars
const { ctx, options, proxy, route, router, storeToRefs, globalStore, ref, reactive, useToggle, useHead, useLockFn } = useGlobal('app-root')

useHead({
    title: 'Avatar Detail'
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
// eslint-disable-next-line no-unused-vars
// const { imgArr } = toRefs(prop)
// 父子组件通讯 <===

// 全局组件通信 ===>
// const dataIsReady = inject('dataIsReady')
// 全局组件通信 <===

const cropperOption = reactive({
    img: 'http://cdn.xyxiao.cn/Landscape_1.jpg',
    autoCrop: true,
    autoCropWidth: 200,
    autoCropHeight: 200,
    size: 1,
    fixed: true,
    outputType: 'png',
    fixedBox: false,
    canMove: true,
    canMoveBox: false
})
const avatar = ref('')
const cropper = ref(null)
const uploadImg = ref(null)

const handleSave = async () => {
    avatar.value = await new Promise(resolve => cropper.value.getCropData(resolve))
}
const handleUpload = () => {
    cropper.value.getCropBlob(blob => {
        const formData = new FormData()
        formData.append('file', blob, 'test.jpg')
        ctx.$api.RESTful('qiniu', formData, 'post')
    })
}
const handleUploadImg = (ev, num) => {
    var file = ev.target.files[0]
    const preg = /\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/
    if (!preg.test(ev.target.value)) {
        console.log('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
    }
    const reader = new FileReader()
    reader.onload = function (e) {
        let data
        if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
            data = e.target.result
        }
        if (num === 1) {
            cropperOption.img = data
        }
        uploadImg.value.value = ''
    }
    // 转化为base64
    // reader.readAsDataURL(file)
    // 转化为blob
    reader.readAsArrayBuffer(file)
}

const onClickLeft = () => {
    router.go(-1)
}
</script>
