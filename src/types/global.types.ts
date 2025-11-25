export interface _UserListConfig<T = any> {
    /** 定时器 */
    timer: Nullable<NodeJS.Timeout>
    /** 是否加载完成 */
    isLoaded: boolean
    // 列表数据 ==>
    /** 当前页数 */
    page: number
    /** 列表数据 */
    dataList: T[]
    // <==列表数据
    config: {
        // 下拉刷新 ==>
        /** 下拉刷新-加载状态 */
        isLoading: boolean
        /** 下拉刷新-是否刷新 */
        isRefresh: boolean
        // <==下拉刷新
        // 滚动加载 ==>
        /** 分页加载状态 */
        loadStatus: 'loadmore' | 'nomore' | 'loading'
        /** 竟态锁 */
        isLock: boolean
        /** 接口请求中 */
        loading: boolean
        /** 接口是否报错 */
        error: boolean
        /** 接口请求完成 */
        finished: boolean
    }
}

export interface UserListsInitApi<T = Record<string, any>> {
    method: Methods
    url: string
    config: T
}

export interface UserListsInit<T = Record<string, any>> {
    api: UserListsInitApi<T>
}

export type UserListConfig<T = any, U = Record<string, any>> = _UserListConfig<T> & UserListsInit<U>

export interface GlobalList<T = any> {
    page: number
    items: T[]
    refreshing: boolean
    loading: boolean
    error: boolean
    finished: boolean
}

export interface GlogbalTabList<T> {
    api: UserListsInitApi[]
    timer: any
    list: (GlobalList<T>)[]
    tabs: string[]
    [propName: string]: any
}

export interface GlobalTabListsInit {
    api: UserListsInitApi[]
    tabs: string[]
}
