const useStore = defineStore('globalStore', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            globalLoading: true,
            routerLoading: false,
            image: {
                visible: false,
                url: undefined,
                index: 1
            },
            video: {
                visible: false,
                url: ''
            },
            ISLocal: import.meta.env.VITE_APP_ENV === 'development',
            ISDEV: import.meta.env.VITE_APP_ENV === 'development',
            ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
            ISPROD: import.meta.env.VITE_APP_ENV === 'production',
            isPageSwitching: null
        }
    },
    // 相当于 vue 中的 computed 计算属性
    getters: {
        getGlobalStore: state => state
    },
    // 相当于 vue 中的 methods 方法
    actions: {
        setImg(payload) {
            this.image = payload
        },
        setImgIndex(payload) {
            this.image.index = payload
        },
        setVideo(payload) {
            this.video = payload
        },
        setGlobalLoading(payload) {
            this.globalLoading = payload
        },
        setRouterLoading(payload) {
            this.routerLoading = payload
        }
    }
})
export default useStore //导出
