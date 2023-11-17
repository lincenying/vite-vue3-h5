// import 'default-passive-events'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import vant from './plugin/vant'
import global from './plugin/global'

import 'uno.css'
import 'vue-cropper/dist/index.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import './assets/scss/style.scss'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

const app = createApp(App)
const store = createPinia()
const head = createHead()

app.use(store).use(router).use(head).use(vant).use(global).mount('#app')
