import { Dialog, Notify } from 'vant'

export default {
    showMsg(config) {
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
        Notify({ type, message: content })
    },
    loginMsgBox(content, pathname) {
        Dialog.alert({
            title: '提示',
            message: content
        }).then(() => {
            window.$$lock = false
            window.location.href = '/login?_=liangju&callback=' + pathname
        })
    }
}
