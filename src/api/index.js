import axios from 'axios'
import qs from 'qs'
import ls from 'store2'
import config from '@/config'

window.axios = axios

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

const baseConfig = {
    headers,
    timeout: 30000,
    withCredentials: true
}

axios.interceptors.request.use(
    config => {
        return config
    },
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
    return data
}

export default {
    async RESTful(url, params = {}, method = 'get', header = {}) {
        const token = ls.get('token')
        const payload = {
            ...baseConfig,
            method,
            url: config.apiUrl + url,
            headers: {
                ...baseConfig.headers,
                Authorization: 'Bearer ' + token,
                ...header
            }
        }
        if (method === 'get') {
            payload.params = params
        } else {
            payload.data = params
        }
        if (url.indexOf('NoTimeout') > -1) payload.timeout = 9999999
        const response = await axios(payload)
        const data = await checkStatus(response)
        return checkCode(data)
    },
    async fetch(url, params = {}, payload = {}, cancelToken) {
        payload.cancelToken = cancelToken
        payload.method = payload.method || 'get'
        payload.url = url || ''
        if (payload.method === 'get') {
            payload.params = params
        } else {
            payload.data = params
        }
        const response = await axios(payload)
        return checkStatus(response)
    },
    file(url, data, header = {}) {
        return this.RESTful(url, data, 'post', header)
    },
    post(url, data, header = {}) {
        return this.RESTful(url, qs.stringify(data), 'post', header)
    },
    get(url, params = {}, header = {}) {
        return this.RESTful(url, params, 'get', header)
    },
    put(url, data, header = {}) {
        return this.RESTful(url, qs.stringify(data), 'put', header)
    },
    delete(url, data, header = {}) {
        return this.RESTful(url, qs.stringify(data), 'delete', header)
    }
}
