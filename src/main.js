import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from './plugin/vant'
import global from './plugin/global'

console.log('当前环境: ' + import.meta.env.VITE_APP_ENV)

const app = createApp(App)

app.use(store).use(router).use(vant).use(global).mount('#app')
