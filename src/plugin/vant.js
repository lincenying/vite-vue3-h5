/* eslint-disable no-inline-comments */
import { showDialog, showConfirmDialog, showToast, showLoadingToast, showSuccessToast, showFailToast, closeToast } from 'vant'

function install(app) {
    app.config.globalProperties.$dialog = {
        default: showDialog,
        confirm: showConfirmDialog
    }
    app.config.globalProperties.$toast = {
        default: showToast,
        loading: showLoadingToast,
        success: showSuccessToast,
        fail: showFailToast,
        close: closeToast
    }
}
export default {
    install
}
