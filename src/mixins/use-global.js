export default key => {
    let ins = getCurrentInstance()
    if (key) {
        if (!ins) {
            ins = window[`$$${key}`] || {}
        } else {
            window[`$$${key}`] = ins
        }
    }

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type
    const route = useRoute()
    const router = useRouter()
    const globalStore = useGlobalStore()

    const log = (text, color = 'blue') => {
        console.log(`%c[${options.name}]  >> `, `color: ${color}`, `${text} <<-- (${UTC2Date(null, 'y-m-d h:i:s')})`)
    }

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

    const useDataIsLoaded = (fullData, dataHasError, initSuccess = () => {}, initError = () => {}) => {
        const noNeedToWait = typeof fullData === 'function'

        let stopWatchFullData
        let stopWatchError

        if (noNeedToWait) {
            initSuccess = fullData
            fullData = ref(true)
        } else {
            stopWatchFullData = watch(
                fullData,
                () => {
                    log('Parent component data has changed')
                    initSuccess()
                },
                {
                    deep: true
                }
            )
            stopWatchError = watch(dataHasError, () => {
                log('Parent component data has error')
                initError()
            })

            onBeforeUnmount(() => {
                stopWatchFullData()
                stopWatchError()
                log('watch stopped')
            })
        }

        onMounted(() => {
            if (noNeedToWait || unref(fullData)) {
                log('init in mounted')
                initSuccess()
            } else {
                log('Wait for parent data loading to complete')
            }
        })

        return () => {
            if (stopWatchFullData) stopWatchFullData()
            if (stopWatchError) stopWatchError()
        }
    }

    const useAutoRefresh = (fn, timer) => {
        let $$timer
        if (timer) {
            if (ctx.$is.int(timer)) {
                log(`定时器计时开始: ${timer}秒`)
                $$timer = useTimeoutFn(async () => {
                    log('定时器计时结束, 开始刷新数据')
                    await fn()
                    log(`定时器计时开始: ${timer}秒`)
                    $$timer.start()
                }, timer * 1000)
            } else {
                console.warn(`[${options.name}]  >> 定时器配置必须为数值型`)
            }

            const visibility = useDocumentVisibility()
            const stopWatch = watch(visibility, (current, previous) => {
                if (current === 'visible' && previous === 'hidden') {
                    log(`定时器计时开始: ${timer}秒`)
                    $$timer.stop()
                    $$timer.start()
                } else {
                    log('定时器已清理')
                    $$timer.stop()
                }
            })

            onUnmounted(() => {
                if ($$timer) {
                    log('定时器已清理')
                    $$timer.stop()
                }
                if (stopWatch) stopWatch()
            })
        }
        return $$timer
    }

    return {
        ctx,
        options,
        route,
        router,
        globalStore,
        useLockFn,
        useDataIsLoaded,
        useAutoRefresh
    }
}
