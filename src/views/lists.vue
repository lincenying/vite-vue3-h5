<template>
    <!-- eslint-disable vue/valid-v-model -->
    <div class="home-wrap" :class="$options.name">
        <div class="route-wrap">
            <van-tabs :sticky="true" v-model:active="activeIndex">
                <van-tab v-for="(item, index) in res.tabs" :key="index" :title="item">
                    <van-pull-refresh v-model="res.list[index].refreshing" @refresh="onRefresh(index)">
                        <van-list v-model:loading="res.list[index].loading" :finished="res.list[index].finished" @load="getList(index)">
                            <van-cell
                                v-for="item in res.list[index].items"
                                :key="`${index}_${item.c_id}}`"
                                :title="item.c_title"
                                is-link
                                :to="`/index/detail?id=${item.c_id}`"
                            />
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script setup name="lists-router">
import saveScroll from '@/mixins/save-scroll'
import tabLists from '@/mixins/tab-lists'

saveScroll()

const api = [
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: '' } },
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: 'ask' } },
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: 'share' } },
    { method: 'get', url: 'article/lists', config: { per_page: 20, tab: 'good' } }
]
const tabs = ['全部', '问答', '分享', '推荐']
// eslint-disable-next-line no-unused-vars
const { body, res, getList, onRefresh, activeIndex } = tabLists({ api, tabs })
</script>
