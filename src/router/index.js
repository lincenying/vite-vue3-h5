import { createRouter, createWebHashHistory } from 'vue-router'
// import Meta from 'vue-meta'

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        name: 'index',
        path: '/index',
        component: () => import(/* webpackChunkName: "chunk-index" */ '@/views/home.vue'),
        meta: { title: '首页', index: 1 }
    },
    {
        name: 'lists',
        path: '/lists',
        component: () => import(/* webpackChunkName: "chunk-index" */ '@/views/lists.vue'),
        meta: { title: '列表', index: 1 }
    },
    {
        name: 'index-detail',
        path: '/index/detail',
        component: () => import(/* webpackChunkName: "chunk-index" */ '@/views/home-detail.vue'),
        meta: { title: '详情', index: 2 }
    },
    {
        name: 'about',
        path: '/about',
        component: () => import(/* webpackChunkName: "chunk-about" */ '@/views/about.vue'),
        meta: { title: '关于', index: 1 }
    },
    {
        name: 'about-detail',
        path: '/about/detail',
        component: () => import(/* webpackChunkName: "chunk-about" */ '@/views/about-detail.vue'),
        meta: { title: '关于', index: 2 }
    },
    {
        name: 'avatar',
        path: '/avatar',
        component: () => import(/* webpackChunkName: "chunk-about" */ '@/views/avatar.vue'),
        meta: { title: '头像', index: 2 }
    },

    { path: '/:pathMatch(.*)', redirect: '/' }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
