import type { AnyFn } from '@vueuse/core'

/** 登录 */
export const onLoginKey = Symbol('onLoginKey') as InjectionKey<AnyFn>
/** 更新路由组件数据 */
export const updateParentKey = Symbol('updateParentKey') as InjectionKey<AnyFn>

/** 路由组件name */
export const routerKey = Symbol('routerKey') as InjectionKey<Ref<string>>

/** 路由组件接口是否报错 */
export const dataHasErrorKey = Symbol('dataHasErrorKey') as InjectionKey<ComputedRef<boolean>>
/** 路由组件接口是否请求完成 */
export const dataIsReadyKey = Symbol('dataIsReadyKey') as InjectionKey<ComputedRef<number>>

export const showDialogKey = Symbol('showDialogKey') as InjectionKey<ComputedRef<boolean>>
export const toggleDialogKey = Symbol('toggleDialogKey') as InjectionKey<AnyFn>
