import { getCurrentInstance, ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useToggle } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import useGlobalStore from '@/pinia/global'

export default key => {
    let ins = getCurrentInstance()
    if (key) {
        if (!ins) {
            ins = window['$$' + key] || {}
        } else {
            window['$$' + key] = ins
        }
    }

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type
    const proxy = ins.proxy
    const route = useRoute()
    const router = useRouter()
    const globalStore = useGlobalStore()

    // autoUnlock === true 不管 fn 返回什么, 都自动解锁
    // autoUnlock === false 不管 fn 返回什么, 都不自动解锁
    // autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
    const useLockFn = (fn = () => {}, autoUnlock = 'auto') => {
        const [lock, toggleLock] = useToggle(false)
        return async (...args) => {
            if (lock.value) return
            toggleLock(true)
            try {
                const $return = await fn(...args)
                if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) toggleLock(false)
            } catch (e) {
                toggleLock(false)
                throw e
            }
        }
    }

    return {
        ctx,
        options,
        proxy,
        route,
        router,
        storeToRefs,
        globalStore,
        ref,
        reactive,
        watch,
        useToggle,
        useHead,
        useLockFn
    }
}
