import ls from 'store2'
import type { TopicList, UseTabList, UseTabListsInit, UserListConfig, UserListsInit } from '@/types'

export function useGlobal() {
    const ins = getCurrentInstance()!

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type
    const route = useRoute()
    const router = useRouter()
    const globalStore = useGlobalStore()

    return {
        ctx,
        options,
        route,
        router,
        globalStore,
    }
}

/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @description
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 * @example
 * ```
 * const Fn = useLockFn(async (key) => {
 *  console.log(key)
 * }
 *
 * <div v-on:click="Fn(123)"></div>
 * ```
 */
export function useLockFn(fn: AnyFn, autoUnlock: boolean | 'auto' = 'auto') {
    const lock = ref(false)
    return async (...args: any[]) => {
        if (lock.value) {
            return
        }
        lock.value = true
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) {
                lock.value = false
            }
        }
        catch (e) {
            lock.value = false
            throw e
        }
    }
}

export function useSaveScroll() {
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

/**
 * 单列表封装
 * @param init { api: 接口封装 }
 */
export function useLists<T>(init: UserListsInit) {
    const globalStore = useGlobalStore()

    const body = $ref<HTMLElement>()!
    const res: UserListConfig<T> = reactive({
        ...init,
        timer: null,
        isLoaded: false,
        // 列表数据 ==>
        page: 1,
        dataList: [],
        // <==列表数据
        config: {
            // 下拉刷新 ==>
            isLoading: false,
            isRefresh: false,
            // <==下拉刷新
            // 滚动加载 ==>
            loadStatus: 'loadmore',
            isLock: false,
            loading: false,
            error: false,
            finished: false,
            // <==滚动加载
        },
    })

    /**
     * 请求列表接口
     */
    const getList = async () => {
        if (res.config.isLock) {
            return
        }
        res.config.isLock = true
        // 异步更新数据
        res.timer = setTimeout(() => {
            globalStore.$patch({ routerLoading: true })
        }, 500)
        // 第一页时不显示loading
        if (res.page > 1) {
            res.config.loading = true
        }
        const { data, code } = await $api[init.api.method]<ResDataLists<T>>(init.api.url, { ...init.api.config, page: res.page })
        // 500毫秒内已经加载完成数据, 则清除定时器, 不再显示路由loading
        if (res.timer) {
            clearTimeout(res.timer)
        }

        globalStore.$patch({ routerLoading: false })
        res.isLoaded = true

        if (code === 200) {
            // 如果是下拉刷新 或者是第1页, 则只保留当前数据
            if (res.config.isRefresh || res.page === 1) {
                res.dataList = [...data.list]
                res.config.isRefresh = false
            }
            else {
                res.dataList = res.dataList.concat(data.list)
            }
            await nextTick()
            // 加载状态结束
            res.config.loading = false
            // 数据全部加载完成
            if (!data.hasNext) {
                res.config.finished = true
                res.config.loadStatus = 'nomore'
            }
            else {
                res.config.loadStatus = 'loadmore'
                res.page += 1
            }
            res.config.isLock = false
        }
        else {
            res.config.error = true
        }
    }

    /**
     * 刷新接口
     */
    const onRefresh = async () => {
        res.config.isRefresh = true
        res.page = 1
        await getList()
        res.config.isLoading = false
    }

    /**
     * 触底回调
     */
    const reachBottom = () => {
        if (res.config.loadStatus === 'nomore' || res.config.loadStatus === 'loading') {
            return
        }
        res.config.loadStatus = 'loading'
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
        ...toRefs(res),
        body,
        getList,
        onRefresh,
        reachBottom,
        lazyLoading,
    }
}

/**
 * Tab接口列表
 * @param init { api: 接口封装 }
 */
export function useTabLists<T>(init: UseTabListsInit) {
    const { options, globalStore } = useGlobal()

    const body = $ref<HTMLElement>()!
    const res: UseTabList<T> = reactive({
        ...init,
        timer: null,
        // 列表数据 ==>
        list: Array.from({ length: 5 }, () => '').map(() => ({
            page: 1,
            items: [],
            refreshing: false,
            loading: false,
            error: false,
            finished: false,
        })),
        // <==列表数据
    })

    const activeIndex = ref(0)

    const getList = async (index: number) => {
        const list: TopicList<T> = JSON.parse(JSON.stringify(res.list[index]))
        if (list.page === 1) {
            const body = document.querySelector(`.${options.name}`)
            body && body.scrollTo(0, 0)
        }
        // 500毫秒数据还没请求完成, 显示路由loading
        res.timer = setTimeout(() => {
            globalStore.$patch({ routerLoading: true })
        }, 500)
        // 第一页直接用路由loading
        if (list.page === 1) {
            list.loading = false
        }

        // 异步更新数据
        const { method, url, config } = res.api[index]
        const { code, data } = await $api[method as Methods]<ResDataLists<T>>(url, { ...config, page: list.page })
        // 500毫秒内已经加载完成数据, 则清除定时器, 不再显示路由loading
        if (res.timer) {
            clearTimeout(res.timer)
        }
        globalStore.$patch({ routerLoading: false })
        if (code === 200) {
            // 如果是下拉刷新, 则只保留当前数据
            if (list.refreshing) {
                list.items = [...data.list]
                list.refreshing = false
            }
            else {
                list.items = list.items.concat(data.list)
            }
            await nextTick()
            // 加载状态结束
            list.loading = false
            // 数据全部加载完成
            if (!data.hasNext) {
                list.finished = true
            }
            else {
                list.page += 1
            }
        }
        else {
            list.error = true
        }
        res.list.splice(index, 1, list)
    }

    const onRefresh = async (index: number) => {
        res.list[index].refreshing = true
        res.list[index].page = 1
        await getList(index)
        res.list[index].refreshing = false
        showMsg('刷新成功')
    }

    return {
        res,
        body,
        getList,
        onRefresh,
        activeIndex,
    }
}
