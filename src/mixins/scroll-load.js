import { sleep, random } from '@/utils'

export default {
    data() {
        return {
            timer: null,
            isLoaded: false,
            // 下拉刷新 ==>
            isLoading: false,
            // 列表数据 ==>
            page: 1,
            list: [],
            // <==列表数据
            scrollDir: 'down',
            identifier: new Date().getTime()
        }
    },
    methods: {
        onRefresh() {
            this.list = []
            this.identifier += 1
            this.isLoading = false
        },
        async infiniteHandler($state) {
            this.loading = true
            this.timer = setTimeout(() => {
                this.$store.commit('global/routerLoading', true)
            }, 500)
            const { data, code } = await this.$api[this.api.method](this.api.url, { ...this.api.config, page: this.page })
            await sleep(random(300, 600))
            if (this.timer) clearTimeout(this.timer)
            this.$store.commit('global/routerLoading', false)
            this.isLoaded = true
            if (code === 200) {
                if (this.scrollDir === 'down') {
                    this.list.push(...data.data)
                } else {
                    this.list.unshift(...data.data.reverse())
                }
                if (data.data.length > 0) {
                    $state.loaded()
                }
                if (data.last_page <= data.current_page) {
                    $state.complete()
                } else {
                    this.page += 1
                }
            } else {
                $state.error()
            }
        }
    }
}
