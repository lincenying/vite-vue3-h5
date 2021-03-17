<template>
    <div class="avatar-wrap">
        <croppa
            v-model="croppa"
            :width="200"
            :height="200"
            placeholder="请选择图片"
            placeholder-color="#000"
            :placeholder-font-size="16"
            canvas-color="transparent"
            :show-remove-button="false"
            remove-button-color="black"
            :show-loading="true"
            :loading-size="50"
            :loading-color="`#606060`"
            :prevent-white-space="true"
        >
        </croppa>
        <div style="text-align: center">
            <van-button @click="handleSave" type="primary" size="small">保存</van-button>
            <van-button @click="handleUpload" type="primary" size="small">上传</van-button>
            <van-button v-if="croppa && croppa.img" @click="croppa.remove()" type="primary" size="small">重选</van-button>
        </div>
        <div v-if="avatar" class="preview">
            <img :src="avatar" alt="" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'avatar-router',
    metaInfo: {
        // title will be injected into parent titleTemplate
        title: 'About Detail'
    },
    data() {
        return {
            croppa: {},
            avatar: ''
        }
    },
    methods: {
        handleSave() {
            this.avatar = this.croppa.generateDataUrl('image/jpeg', 0.8)
        },
        handleUpload() {
            this.croppa.generateBlob(
                blob => {
                    const formData = new FormData()
                    formData.append('file', blob, 'test.jpg')
                    this.$api.RESTful('/upload/test', formData, 'post')
                },
                'image/jpeg',
                0.8
            )
        }
    }
}
</script>
