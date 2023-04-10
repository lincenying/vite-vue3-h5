<template>
    <!-- eslint-disable vue/valid-v-model -->
    <div class="home-wrap" :class="$options.name">
        <div class="route-wrap">
            <van-tabs v-model:active="activeIndex" :sticky="true">
                <van-tab v-for="(item, index) in res.tabs" :key="index" :title="item">
                    <van-pull-refresh v-model="res.list[index].refreshing" @refresh="onRefresh(index)">
                        <van-list v-model:loading="res.list[index].loading" :finished="res.list[index].finished" @load="getList(index)">
                            <van-cell
                                v-for="sub_item in res.list[index].items"
                                :key="`${index}_${sub_item.c_id}}`"
                                :title="sub_item.c_title"
                                is-link
                                :to="`/home/detail?id=${sub_item.c_id}`"
                            />
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { userListsInitApi } from '@/composables'

defineOptions({
    name: 'lists-router',
})

const api: userListsInitApi[] = [
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: '' } },
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: 'ask' } },
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: 'share' } },
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: 'good' } },
]
const tabs = ['全部', '问答', '分享', '推荐']

const { res, getList, onRefresh, activeIndex } = useTabLists({ api, tabs })

useSaveScroll()
</script>
