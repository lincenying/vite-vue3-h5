/* eslint-disable no-unused-vars */

/**
 * Null 或者 T
 */
declare type Nullable<T> = T | null
/**
 * 非 Null 类型
 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/**
 * Undefined 或者 T
 */
declare type UnfAble<T> = T | undefined
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Obj = Record<string, any>

/**
 * 键为字符串, 值为 T 的对象
 */
declare type ObjT<T> = Record<string, T>

declare interface Window {
    $$api: {
        post: (...args) => Promise<any>
        get: (...args) => Promise<any>
        [propName: string]: (...args) => Promise<any>
    }
    $$axios: AxiosStatic
}
