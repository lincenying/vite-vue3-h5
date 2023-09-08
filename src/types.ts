export interface Article {
    c_id: string
    c_title: string
    c_content: string
    c_posttime?: string
}

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

export interface UserListsInitApi {
    method: Methods
    url: string
    config: Record<string, any>
}

export interface UserListsInit {
    api: UserListsInitApi
}

export type UserListConfig<T = any> = _UserListConfig<T> & UserListsInit

export interface TopicList<T = any> {
    page: number
    items: T[]
    refreshing: boolean
    loading: boolean
    error: boolean
    finished: boolean
}

export interface UseTabList<T> {
    api: UserListsInitApi[]
    timer: any
    list: (TopicList<T>)[]
    tabs: string[]
    [propName: string]: any
}

export interface UseTabListsInit {
    api: UserListsInitApi[]
    tabs: string[]
}
