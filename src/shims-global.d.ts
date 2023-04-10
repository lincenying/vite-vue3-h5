/* eslint-disable no-unused-vars */

declare type Nullable<T> = T | null

declare type NonNullable<T> = T extends null | undefined ? never : T

declare interface Window {
    $$api: {
        post: (...args) => Promise<any>
        get: (...args) => Promise<any>
        [propName: string]: (...args) => Promise<any>
    }
    $$axios: AxiosStatic
}
