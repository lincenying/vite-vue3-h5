export type Fn = (...args: any[]) => void

export interface Article {
    c_id: string
    c_title: string
    c_content: string
    c_posttime?: string
}

export interface userListConfig<T = any> {
    timer: any
    isLoaded: boolean
    // 下拉刷新 ==>
    isLoading: boolean
    isRefresh: boolean
    // <==下拉刷新
    // 列表数据 ==>
    page: number
    list: T[]
    // <==列表数据
    // 滚动加载 ==>
    loadStatus: 'loadmore' | 'nomore' | 'loading'
    isLock: boolean
    loading: boolean
    error: boolean
    finished: boolean
    [propName: string]: any
}

export interface TopicList<T = any> {
    page: number
    items: T[]
    refreshing: boolean
    loading: boolean
    error: boolean
    finished: boolean
}

export interface userListsInitApi {
    method: Methods
    url: string
    config: Record<string, any>
}

export interface userListsInit {
    api: userListsInitApi
}

export interface useTabList<T> {
    api: userListsInitApi[]
    timer: any
    list: (TopicList<T>)[]
    tabs: string[]
    [propName: string]: any
}

export interface useTabListsInit {
    api: userListsInitApi[]
    tabs: string[]
}
