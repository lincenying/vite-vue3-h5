import axios from 'axios'
import qs from 'qs'
import ls from 'store2'
import message from '@/utils/message'
import jsonp from './jsonp'

window.axios = axios

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

const baseConfig = {
    headers,
    timeout: 30000,
    withCredentials: false
}

axios.interceptors.request.use(
    config => config,
    error => Promise.resolve(error.response || error)
)

axios.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response || error)
)

function checkStatus(response) {
    if (response && (response.status === 200 || response.status === 304)) {
        return response.data
    }
    return {
        code: -404,
        info: response.message || response.statusText || response.toString(),
        data: response.message || response.statusText || response.toString()
    }
}

function checkCode(data) {
    const code = [0]
    if (data.code === 900) {
        ls.remove('user')
        const pathname = encodeURIComponent(window.location.pathname)
        if (!window.$$lock) {
            window.$$lock = true
            message['loginMsgBox']('当前登录状态已失效, 请重新登录', pathname)
        }
    } else if (!code.includes(data.code)) {
        message['showMsg'](data.msg)
    }
    return data
}

const api = {
    jsonp,
    async $RESTful(url, data = {}, method = 'get') {
        const token = ls.get('token')
        const config = {
            ...baseConfig,
            headers: {
                ...baseConfig.headers,
                Authorization: 'Bearer ' + token
            },
            method,
            url: process.env.VUE_APP_API + url
        }
        if (method === 'get') {
            config.params = data
        } else {
            config.data = qs.stringify(data)
        }
        if (url.indexOf('NoTimeout') > -1) config.timeout = 9999999
        const response = await axios(config)
        return checkStatus(response)
    },
    async RESTful(url, data = {}, method = 'get') {
        const xhr = await this.$RESTful(url, data, method)
        return checkCode(xhr)
    },
    async $normal(url, params = {}, method = 'post') {
        const token = ls.get('token')
        const initConfig = {
            ...baseConfig,
            headers: {
                ...baseConfig.headers,
                Authorization: 'Bearer ' + token
            },
            method,
            url
        }
        if (method === 'get') {
            initConfig.params = params
        } else {
            initConfig.data = qs.stringify(params)
        }
        if (url.indexOf('NoTimeout') > -1) initConfig.timeout = 9999999
        const response = await axios(initConfig)
        return checkStatus(response)
    },
    async normal(url, params = {}, method = 'post') {
        const data = await this.$normal(url, params, method)
        return checkCode(data)
    },
    async fetch(url, params = {}, config = {}, cancelToken) {
        config.cancelToken = cancelToken
        config.method = config.method || 'get'
        config.url = url || ''
        if (url.indexOf('//img.') < 0 && url.indexOf('up.daliangju.com') < 0 && url.indexOf('aliyuncs.com') < 0) {
            config.withCredentials = true
        }
        if (config.method === 'get') {
            config.params = params
        } else {
            config.data = params
        }
        const response = await axios(config)
        return checkStatus(response)
    },
    post(url, data) {
        return this.RESTful(url, data, 'post')
    },
    get(url, params = {}) {
        return this.RESTful(url, params, 'get')
    },
    put(url, data) {
        return this.RESTful(url, data, 'put')
    },
    delete(url, data) {
        return this.RESTful(url, data, 'delete')
    }
}
window.$$api = api
export default api
