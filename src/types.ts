// eslint-disable-next-line no-unused-vars
declare type Nullable<T> = T | null
// eslint-disable-next-line no-unused-vars
declare type NonNullable<T> = T extends null | undefined ? never : T

export interface anyObject {
    [propName: string]: any
}

export interface anyArray {
    [index: number]: any
}

// eslint-disable-next-line no-unused-vars
export type Fn = (...args: any[]) => void

export interface GlobalStore {
    globalLoading: boolean
    routerLoading: boolean
    ISLocal: boolean
    ISDEV: boolean
    ISPRE: boolean
    ISPROD: boolean
    isPageSwitching: boolean
}

export interface Article {
    c_id: string
    c_title: string
    c_content: string
    c_posttime?: string
}
