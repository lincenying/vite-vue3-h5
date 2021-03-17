<template>
    <div class="home-detail-wrap">
        <van-nav-bar title="" left-text="返回" left-arrow fixed :border="false" @click-left="onClickLeft" class="fixed-center" />
        <div class="route-wrap">
            <van-skeleton v-if="!detail" title :row="4" class="mt-20px" />
            <div v-else class="article-content flex flex-col">
                <div class="title text-16px leading-20px">{{ detail.c_title }}</div>
                <p class="date-time">{{ detail.c_posttime }}</p>
                <div class="content text-green-500 p-10px text-12px font-500 rounded-full" v-html="detail.c_content"></div>
            </div>
            <!-- <div v-if="detail" class="replies">
                <van-panel v-for="(item, index) in detail.replies" :key="index" :title="item.author.loginname" :desc="item.create_at" status="">
                    <div v-html="item.content"></div>
                </van-panel>
            </div> -->
        </div>
    </div>
</template>
<script>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'home-detail-router',
    metaInfo() {
        return {
            title: (this.detail && this.detail.title) || 'home-detail'
        }
    },
    setup() {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()

        const res = reactive({
            detail: null
        })

        const detail = ref(null)

        const getDetail = async () => {
            // this.$store.commit('global/routerLoading', true)
            const { code, data } = await ctx.$api.get('ajax/article-detail?id=' + route.query.id, {})
            if (code === 200) {
                res.detail = data
                detail.value = data
            }
            // this.$store.commit('global/routerLoading', false)
        }

        const onClickLeft = () => {
            router.go(-1)
        }

        getDetail()

        return {
            res,
            detail,
            onClickLeft
        }
    }
}
</script>
