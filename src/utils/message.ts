import { showNotify } from 'vant'
import type { anyObject } from '@/types'

export default {
    showMsg(config: anyObject | string) {
        let content, type
        if (!config) {
            content = '接口返回数据错误'
            type = 'error'
        } else if (typeof config === 'string') {
            content = config
            type = 'error'
        } else {
            content = config.content
            type = config.type
        }
        showNotify({ type, message: content })
    }
}
