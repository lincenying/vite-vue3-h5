<template>
    <div class="home-wrap" :class="$options.name">
        <div class="route-wrap">
            <!-- <van-skeleton v-if="list.length === 0" title :row="4" class="margin-top-20px" /> -->
            <van-pull-refresh v-model="res.isLoading" @refresh="onRefresh">
                <van-list
                    :loading="res.loading"
                    :immediate-check="false"
                    :finished="res.finished"
                    :error="res.error"
                    loading-text="努力加载中"
                    finished-text="我也是有底线的"
                    error-text="请求失败，点击重新加载"
                    @load="getList"
                >
                    <van-cell
                        v-for="(item, index) in res.list"
                        :key="`${index}_${item.c_id}`"
                        :title="item.c_title"
                        is-link
                        :to="`/home/detail?id=${item.c_id}`"
                    />
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Article, userListsInitApi } from '@/types'

defineOptions({
    name: 'HomeRouter',
})

const api: userListsInitApi = {
    method: 'get',
    url: 'article/lists',
    config: { per_page: 20 },
}

const { res, getList, onRefresh } = useLists<Article>({ api })

useSaveScroll()

onMounted(() => {
    getList()
})
</script>
