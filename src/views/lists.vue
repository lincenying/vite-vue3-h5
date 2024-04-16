<template>
    <!-- eslint-disable vue/valid-v-model -->
    <div class="home-wrap" :class="$options.name">
        <div class="route-wrap">
            <van-tabs v-model:active="activeIndex" :sticky="true">
                <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
                    <van-pull-refresh v-model="config.isLoading" @refresh="onRefresh">
                        <van-list v-model:loading="config.loading" :finished="config.finished" @load="getList">
                            <van-cell
                                v-for="sub_item in dataList"
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
import type { Article } from '@/types'

defineOptions({
    name: 'ListsRouter',
})

useHead({
    title: 'Lists',
})

const activeIndex = ref(0)

const tabs = ref(['全部', '问答', '分享', '推荐'])
const tabsKey = ref(['', 'ask', 'share', 'good'])

const { api, page, config, dataList, getList, onRefresh } = useLists<Article>({ api: { method: 'get', url: 'article/lists', config: { limit: 20, tab: '' } } })

watch(activeIndex, async (val: number) => {
    page.value = 1
    api.value.config.tab = tabsKey.value[val]
    await getList()
    const $body = document.querySelector('.body')
    if ($body) {
        $body.scrollTop = 0
    }
})

useSaveScroll()
</script>
