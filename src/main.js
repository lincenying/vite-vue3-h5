import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from './plugin/vant'
import global from './plugin/global'

import 'virtual:windi.css'

const app = createApp(App)

app.use(store).use(router).use(vant).use(global).mount('#app')
