import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'
import vant from './plugin/vant'
import global from './plugin/global'

console.log('当前环境: ' + import.meta.env.VITE_APP_ENV)

const app = createApp(App)
const store = createPinia()
const head = createHead()

app.use(store).use(router).use(head).use(vant).use(global).mount('#app')
