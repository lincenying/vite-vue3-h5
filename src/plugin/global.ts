import type { App } from 'vue'
import { oc, transformStr, UTC2Date } from '@/utils'

function install(app: App) {
    app.config.globalProperties.$oc = oc
    app.mixin({
        mounted() {
            const blackComponents = ['router-link', 'keep-alive', 'transition-group', 'KeepAlive', 'BaseTransition', 'RouterView']
            const componentName = this.$options.name
            if (componentName && componentName.indexOf('van-') < 0 && !blackComponents.includes(componentName)) {
                console.log(`%c[${UTC2Date(null, 'y-m-d h:i:s.v')}] ${componentName} Mounted`, 'color: green')
                window[`$$${transformStr(componentName)}` as any] = this
            }
        },
        methods: {
            handleGoUrl(url: string) {
                window.location.href = url
            }
        }
    })
}
export default {
    install
}
