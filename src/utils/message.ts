import type { NotifyType } from 'vant'
import { showNotify } from 'vant'

interface ConfigType {
    content: string
    type: NotifyType
}

export default {
    showMsg(config: ConfigType | string) {
        let content, type: NotifyType
        if (!config) {
            content = '接口返回数据错误'
            type = 'danger'
        }
        else if (typeof config === 'string') {
            content = config
            type = 'danger'
        }
        else {
            content = config.content
            type = config.type
        }
        showNotify({ type, message: content })
    },
}
