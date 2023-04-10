import type { App } from 'vue'
import { UTC2Date, transformStr } from 'lcy-utils'

function install(app: App) {
    app.mixin({
        mounted() {
            const blackComponents = ['router-link', 'keep-alive', 'transition-group', 'KeepAlive', 'BaseTransition', 'RouterView']
            const componentName = this.$options.name
            if (componentName && !componentName.includes('van-') && !blackComponents.includes(componentName)) {
                console.log(`%c[${UTC2Date('', 'y-m-d h:i:s.v')}] ${componentName} Mounted`, 'color: green')
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
