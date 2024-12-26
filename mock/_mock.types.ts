import type { IncomingMessage, ServerResponse } from 'node:http'

export interface ViteMockOptions {
    mockPath?: string
    configPath?: string
    ignore?: RegExp | ((fileName: string) => boolean)
    watchFiles?: boolean
    enable?: boolean
    logger?: boolean
    cors?: boolean
}
export interface RespThisType {
    req: IncomingMessage
    res: ServerResponse
    parseJson: () => any
}
type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch'
type Recordable<T = any> = Record<string, T>
export interface MockMethod<Q = any, B = any> {
    url: string
    method?: MethodType
    timeout?: number
    statusCode?: number
    response?: ((this: RespThisType, opt: {
        url: Recordable
        body: B
        query: Q
        headers: Recordable
    }) => any)
    rawResponse?: (this: RespThisType, req: IncomingMessage, res: ServerResponse) => void
}
export interface MockConfig {
    env: Record<string, any>
    mode: string
    command: 'build' | 'serve'
}

export interface RequestParams {
    method: string
    body: any
    headers?: { authorization?: string }
    query: any
}
