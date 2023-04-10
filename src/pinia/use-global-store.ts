import type { GlobalStore } from '@/types'

const useStore = defineStore('globalStore', () => {
    const state = reactive<GlobalStore>({
        globalLoading: true,
        routerLoading: false,
        ISLocal: import.meta.env.VITE_APP_ENV === 'development',
        ISDEV: import.meta.env.VITE_APP_ENV === 'development',
        ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
        ISPROD: import.meta.env.VITE_APP_ENV === 'production',
        isPageSwitching: false,
    })

    const setGlobalLoading = (payload: boolean) => {
        state.globalLoading = payload
    }
    const setRouterLoading = (payload: boolean) => {
        state.routerLoading = payload
    }

    return {
        ...toRefs(state),
        setGlobalLoading,
        setRouterLoading,
    }
})

export default useStore // 导出
