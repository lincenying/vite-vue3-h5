<template>
    <div class="about-detail-wrap">
        <van-nav-bar title="标题" left-text="返回" left-arrow fixed :border="false" @click-left="onClickLeft" class="fixed-center" />
        <div class="route-wrap">
            <div class="mt-10px">
                <van-grid square>
                    <van-grid-item v-for="value in 28" :key="value" icon="photo-o" text="文字" />
                </van-grid>
                <div class="w-30px h-30px"><MyIcon></MyIcon></div>
            </div>
        </div>
    </div>
</template>
<script>
import useGlobal from '@/mixins/global'
import MyIcon from '@/assets/svgs/mp3.svg?component'

export default {
    name: 'about-detail-router',
    components: {
        MyIcon
    },
    metaInfo: {
        // title will be injected into parent titleTemplate
        title: 'About Detail'
    },
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const onClickLeft = () => {
            router.go(-1)
        }
        return {
            onClickLeft
        }
    }
}
</script>
