import { ref, reactive, nextTick, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { sleep, random } from '@/utils'

export default init => {
    const { ctx } = getCurrentInstance()

    const store = useStore()

    const body = ref(null)
    const res = reactive({
        ...init,
        timer: null,
        // 列表数据 ==>
        list: [
            {
                page: 1,
                items: [],
                refreshing: false,
                loading: false,
                error: false,
                finished: false
            },
            {
                page: 1,
                items: [],
                refreshing: false,
                loading: false,
                error: false,
                finished: false
            },
            {
                page: 1,
                items: [],
                refreshing: false,
                loading: false,
                error: false,
                finished: false
            },
            {
                page: 1,
                items: [],
                refreshing: false,
                loading: false,
                error: false,
                finished: false
            }
        ]
        // <==列表数据
    })

    const getList = async index => {
        const list = res.list[index]
        if (list.page === 1) {
            const body = document.querySelector('.' + ctx.$options.name)
            body.scrollTo(0, 0)
        }
        // 500毫秒显示路由loading
        res.timer = setTimeout(() => {
            store.commit('global/routerLoading', true)
        }, 500)
        // 第一页直接用路由loading
        if (list.page === 1) {
            list.loading = false
        }
        // 异步更新数据
        const { method, url, config } = res.api[index]
        await sleep(random(300, 600))
        const { code, data } = await ctx.$api[method](url, { ...config, page: list.page })
        // 500毫秒内已经加载完成数据, 则清除定时器, 不再显示路由loading
        if (res.timer) clearTimeout(res.timer)
        store.commit('global/routerLoading', false)
        if (code === 200) {
            // 如果是下拉刷新, 则只保留当前数据
            if (list.refreshing) {
                list.items = [].concat(data.data)
                list.refreshing = false
            } else {
                list.items = list.items.concat(data.data)
            }
            await nextTick()
            // 加载状态结束
            list.loading = false
            // 数据全部加载完成
            if (data.last_page <= data.current_page) {
                list.finished = true
            } else {
                list.page += 1
            }
        } else {
            list.error = true
        }
    }

    const onRefresh = async index => {
        res.list[index].refreshing = true
        res.list[index].page = 1
        await getList(index)
        res.list[index].refreshing = false
        res.$toast('刷新成功')
    }

    return {
        body,
        res,
        getList,
        onRefresh
    }
}
