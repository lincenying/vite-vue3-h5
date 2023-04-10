import type { AxiosRequestConfig } from 'axios'

export interface anyObject {
    [propName: string]: any
}

export interface anyArray {
    [index: number]: any
}

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
    get(url: string, params: Record<string, any>, headers?: Record<string, any>): Promise<any>
    post(url: string, data: Record<string, any>, headers?: Record<string, any>): Promise<any>
    put(url: string, data: Record<string, any>, headers?: Record<string, any>): Promise<any>
    delete(url: string, data: Record<string, any>, headers?: Record<string, any>): Promise<any>
    file(url: string, data: Record<string, any>, headers?: Record<string, any>): Promise<any>
    RESTful(url: string, params: Record<string, any>, method: 'get' | 'post' | 'put' | 'delete', headers?: Record<string, any>): Promise<any>
    fetch(url: string, params: Record<string, any>, payload: AxiosRequestConfig, cancelToken?: any): Promise<any>
}
