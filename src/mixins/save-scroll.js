import { onActivated, getCurrentInstance } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import ls from 'store2'

export default () => {
    const { ctx } = getCurrentInstance()
    const route = useRoute()

    onActivated(() => {
        if (ctx.$options.name) {
            const body = document.querySelector('.' + ctx.$options.name)
            const scrollTop = ls.get(route.fullPath) || 0
            body.scrollTo(0, scrollTop)
            ls.remove(route.fullPath)
        }
    })
    onBeforeRouteLeave(() => {
        const body = document.querySelector('.body')
        ls.set(route.fullPath, body.scrollTop || 0)
    })
}
