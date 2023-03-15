import ls from 'store2'

export default () => {
    const ins = getCurrentInstance()
    const route = useRoute()
    const name = ins.ctx.$options.name
    onActivated(() => {
        if (name) {
            const body = document.querySelector(`.${name}`)
            const scrollTop = ls.get(route.fullPath) || 0
            body.scrollTo(0, scrollTop)
            ls.remove(route.fullPath)
        }
    })

    onBeforeRouteLeave((to, from, next) => {
        const body = document.querySelector('.body')
        ls.set(from.fullPath, body.scrollTop || 0)
        next()
    })
}
