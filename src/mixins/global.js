import { getCurrentInstance, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useToggle } from '@vueuse/core'
import { useHead } from '@vueuse/head'

export default () => {
    const ins = getCurrentInstance()
    const ctx = ins.appContext.config.globalProperties
    const options = ins.type
    const proxy = ins.proxy
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

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
        store,
        ref,
        reactive,
        useToggle,
        useHead,
        useLockFn
    }
}
