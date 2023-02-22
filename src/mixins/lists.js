import { nextTick } from 'vue'
import { sleep, random } from '@/utils'
import useGlobal from '@/mixins/global'

export default init => {
    // eslint-disable-next-line no-unused-vars
    const { ctx, options, proxy, route, router, storeToRefs, globalStore, ref, reactive, useToggle, useLockFn } = useGlobal()

    const body = ref(null)
    const res = reactive({
        ...init,
        timer: null,
        isLoaded: false,
        // 下拉刷新 ==>
        isLoading: false,
        isRefresh: false,
        // <==下拉刷新
        // 列表数据 ==>
        page: 1,
        list: [],
        // <==列表数据
        // 滚动加载 ==>
        loadStatus: 'loadmore',
        isLock: false,
        loading: false,
        error: false,
        finished: false
        // <==滚动加载
    })

    const getList = async () => {
        if (res.isLock) return
        res.isLock = true
        // 异步更新数据
        res.timer = setTimeout(() => {
            globalStore.$patch({ routerLoading: true })
        }, 500)
        // 第一页时不显示loading
        if (res.page > 1) res.loading = true
        await sleep(random(300, 600))
        const { data, code } = await ctx.$api[init.api.method](init.api.url, { ...init.api.config, page: res.page })
        // 500毫秒内已经加载完成数据, 则清除定时器, 不再显示路由loading
        if (res.timer) clearTimeout(res.timer)
        globalStore.$patch({ routerLoading: false })
        res.isLoaded = true
        if (code === 200) {
            // 如果是下拉刷新, 则只保留当前数据
            if (res.isRefresh) {
                res.list = [].concat(data.data)
                res.isRefresh = false
            } else {
                res.list = res.list.concat(data.data)
            }
            await nextTick()
            // 加载状态结束
            res.loading = false
            // 数据全部加载完成
            if (data.last_page <= data.current_page) {
                res.finished = true
                res.loadStatus = 'nomore'
            } else {
                res.loadStatus = 'loadmore'
                res.page += 1
            }
            res.isLock = false
        } else {
            res.error = true
        }
    }

    const onRefresh = async () => {
        res.isRefresh = true
        res.page = 1
        await getList()
        res.isLoading = false
    }

    const reachBottom = () => {
        if (res.loadStatus === 'nomore' || res.loadStatus === 'loading') return
        res.loadStatus = 'loading'
        getList()
    }
    const lazyLoading = () => {
        // 滚动到底部，再加载的处理事件
        const scrollTop = body.value.scrollTop
        const clientHeight = body.value.clientHeight
        const scrollHeight = body.value.scrollHeight
        if (scrollTop + clientHeight >= scrollHeight - 300) {
            reachBottom()
        }
    }

    return {
        body,
        res,
        getList,
        onRefresh,
        reachBottom,
        lazyLoading
    }
}
