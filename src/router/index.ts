import type { RouteRecordRaw } from 'vue-router'

const pages = import.meta.glob('../views/*.vue')

let routes: Array<RouteRecordRaw> = []
Object.keys(pages).forEach((path: string) => {
    const math = path.match(/\.\/views(.*)\.vue$/)
    if (math) {
        const name = math[1].toLowerCase()
        routes.push({
            name: name.replace('/', ''),
            path: name === '/home' ? '/' : name.replace(/-/g, '/'),
            component: pages[path] // () => import('./views/*.vue')
        })
    }
    return {}
})

routes = routes.concat([{ path: '/:pathMatch(.*)', redirect: '/' }])

console.log(routes)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
