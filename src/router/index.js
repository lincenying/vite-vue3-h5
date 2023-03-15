const pages = import.meta.glob('../views/*.vue')

const routes1 = Object.keys(pages).map(path => {
    const name = path.match(/\.\/views(.*)\.vue$/)[1].toLowerCase()
    return {
        name: name.replace('/', ''),
        path: name === '/home' ? '/' : name.replace(/-/g, '/'),
        component: pages[path], // () => import('./views/*.vue')
        meta: { index: name.split('-').length }
    }
})

const routes = [...routes1, { path: '/:pathMatch(.*)', redirect: '/' }]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
