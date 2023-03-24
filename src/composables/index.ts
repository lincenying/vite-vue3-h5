import ls from 'store2'
import type { anyObject, Fn } from '@/types'
import { Sleep, Random } from '@/utils'

export const useGlobal = () => {
    const ins = getCurrentInstance()!

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type
    const route = useRoute()
    const router = useRouter()
    const globalStore = useGlobalStore()

    // eslint-disable-next-line no-unused-vars

    return {
        ctx,
        options,
        route,
        router,
        globalStore
    }
}

// autoUnlock === true 不管 fn 返回什么, 都自动解锁
// autoUnlock === false 不管 fn 返回什么, 都不自动解锁
// autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
export const useLockFn = (fn: Fn, autoUnlock: boolean | string = 'auto') => {
    const [lock, toggleLock] = useToggle(false)
    return async (...args: any[]) => {
        if (lock.value) return
        toggleLock(true)
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) toggleLock(false)
        } catch (e) {
            toggleLock(false)
            throw e
        }
    }
}

interface userListConfig {
    timer: any
    isLoaded: boolean
    // 下拉刷新 ==>
    isLoading: boolean
    isRefresh: boolean
    // <==下拉刷新
    // 列表数据 ==>
    page: number
    list: any[]
    // <==列表数据
    // 滚动加载 ==>
    loadStatus: 'loadmore' | 'nomore' | 'loading'
    isLock: boolean
    loading: boolean
    error: boolean
    finished: boolean
    [propName: string]: any
}

export interface userListsInitApi {
    method: 'get' | 'post' | 'put' | 'delete'
    url: string
    config: anyObject
}

export interface userListsInit {
    api: userListsInitApi
}

export const useLists = (init: userListsInit) => {
    // eslint-disable-next-line no-unused-vars
    const { globalStore } = useGlobal()

    const body = $ref<HTMLElement>()!
    const res = reactive<userListConfig>({
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
        await Sleep(Random(300, 600))
        const { data, code } = await $Api[init.api.method](init.api.url, { ...init.api.config, page: res.page })
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
        const scrollTop = body.scrollTop
        const clientHeight = body.clientHeight
        const scrollHeight = body.scrollHeight
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

export const useSaveScroll = () => {
    const ins = getCurrentInstance()
    const route = useRoute()
    let name: string | undefined = ''
    if (ins) {
        name = ins.type.name
    }
    onActivated(() => {
        if (name) {
            const body = document.querySelector(`.${name}`)
            if (body) {
                const scrollTop = ls.get(route.fullPath) || 0
                body.scrollTo(0, scrollTop)
                ls.remove(route.fullPath)
            }
        }
    })

    onBeforeRouteLeave((to, from, next) => {
        const body = document.querySelector('.body')
        if (body) {
            ls.set(from.fullPath, body.scrollTop || 0)
        }
        next()
    })
}

interface TopicList {
    page: number
    items: any[]
    refreshing: boolean
    loading: boolean
    error: boolean
    finished: boolean
}

interface useTabList {
    api: userListsInitApi[]
    timer: any
    list: TopicList[]
    [propName: string]: any
}

interface useTabListsInit {
    api: userListsInitApi[]
    tabs: string[]
}

export const useTabLists = (init: useTabListsInit) => {
    // eslint-disable-next-line no-unused-vars
    const { options, globalStore } = useGlobal()

    const body = $ref<HTMLElement>()!
    const res = reactive<useTabList>({
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

    const activeIndex = ref(0)

    const getList = async (index: number) => {
        const list = res.list[index]
        if (list.page === 1) {
            const body = document.querySelector(`.${options.name}`)
            body && body.scrollTo(0, 0)
        }
        // 500毫秒显示路由loading
        res.timer = setTimeout(() => {
            globalStore.$patch({ routerLoading: true })
        }, 500)
        // 第一页直接用路由loading
        if (list.page === 1) {
            list.loading = false
        }
        // 异步更新数据
        const { method, url, config } = res.api[index]
        await Sleep(Random(300, 600))
        const { code, data } = await $Api[method](url, { ...config, page: list.page })
        // 500毫秒内已经加载完成数据, 则清除定时器, 不再显示路由loading
        if (res.timer) clearTimeout(res.timer)
        globalStore.$patch({ routerLoading: false })
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

    const onRefresh = async (index: number) => {
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
        onRefresh,
        activeIndex
    }
}
