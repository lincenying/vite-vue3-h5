import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import ls from 'store2'
import config from '@/config'
import type { ApiReturn } from '@/types'

window.$$axios = axios

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
}

const baseConfig = {
    headers,
    timeout: 30000,
    withCredentials: true,
}

axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => Promise.resolve(error.response || error),
)

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.resolve(error.response || error),
)

function checkStatus(response: AxiosResponse) {
    if (response && (response.status === 200 || response.status === 304)) {
        return response
    }
    return {
        data: {
            code: -404,
            message: (response && response.statusText) || '未知错误',
            data: '',
        },
    }
}

function checkCode(res: any) {
    if (res.data.code === -500) {
        window.location.href = '/backend'
    } else if (res.data.code === -400) {
        window.location.href = '/'
    }
    return res && res.data
}

export const $Api: ApiReturn = {
    async RESTful(url, params = {}, method = 'get', header = {}) {
        const token = ls.get('token')
        const payload: AxiosRequestConfig = {
            ...baseConfig,
            method,
            url: config.apiUrl + url,
            headers: {
                ...baseConfig.headers,
                Authorization: `Bearer ${token}`,
                ...header,
            },
        }
        if (method === 'get') {
            payload.params = params
        } else {
            payload.data = params
        }
        if (url.includes('NoTimeout')) payload.timeout = 9999999
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
        return this.RESTful(url, data, 'post', header)
    },
    get(url, params = {}, header = {}) {
        return this.RESTful(url, params, 'get', header)
    },
    put(url, data, header = {}) {
        return this.RESTful(url, data, 'put', header)
    },
    delete(url, data, header = {}) {
        return this.RESTful(url, data, 'delete', header)
    },
}
