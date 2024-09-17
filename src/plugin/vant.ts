import type { App } from 'vue'
import { closeToast, showConfirmDialog, showDialog, showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant'

function install(app: App) {
    app.config.globalProperties.$dialog = {
        default: showDialog,
        confirm: showConfirmDialog,
    }
    app.config.globalProperties.$toast = {
        default: showToast,
        loading: showLoadingToast,
        success: showSuccessToast,
        fail: showFailToast,
        close: closeToast,
    }
}
export default {
    install,
}
