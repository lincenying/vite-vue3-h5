import type { App } from 'vue'
import { transformStr, UTC2Date } from '@lincy/utils'

function install(app: App) {
    app.mixin({
        mounted() {
            const blackComponents = ['router-link', 'keep-alive', 'transition-group', 'KeepAlive', 'BaseTransition', 'RouterView']
            const componentName = this.$options.name
            if (componentName && !componentName.includes('van-') && !blackComponents.includes(componentName)) {
                console.log(`%c[${UTC2Date('', 'yyyy-mm-dd hh:ii:ss.SSS')}] ${componentName} Mounted`, 'color: green')
                window[`$$${transformStr(componentName)}` as any] = this
            }
        },
        methods: {
            handleGoUrl(url: string) {
                window.location.href = url
            },
        },
    })
}
export default {
    install,
}
