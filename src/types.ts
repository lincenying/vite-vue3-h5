import type { AxiosRequestConfig } from 'axios'

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

export interface ApiReturn {
    get(url: string, params: Obj, headers?: Obj): Promise<any>
    post(url: string, data: Obj, headers?: Obj): Promise<any>
    put(url: string, data: Obj, headers?: Obj): Promise<any>
    delete(url: string, data: Obj, headers?: Obj): Promise<any>
    file(url: string, data: Obj, headers?: Obj): Promise<any>
    RESTful(url: string, params: Obj, method: 'get' | 'post' | 'put' | 'delete', headers?: Obj): Promise<any>
    fetch(url: string, params: Obj, payload: AxiosRequestConfig, cancelToken?: any): Promise<any>
}
