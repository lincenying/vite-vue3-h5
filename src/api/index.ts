import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import ls from 'store2'
import config from '@/config'
import type { anyObject } from '@/types'

window.$$axios = axios

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

function checkStatus(response: AxiosResponse) {
    if (response && (response.status === 200 || response.status === 304)) {
        return response
    }
    return {
        data: {
            code: -404,
            message: (response && response.statusText) || '未知错误',
            data: ''
        }
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

export const $Api = {
    async RESTful(url: string, params = {}, method = 'get', header = {}) {
        const token = ls.get('token')
        const payload: AxiosRequestConfig = {
            ...baseConfig,
            method,
            url: config.apiUrl + url,
            headers: {
                ...baseConfig.headers,
                Authorization: `Bearer ${token}`,
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
    async fetch(url: string, params = {}, payload: AxiosRequestConfig = {}, cancelToken: any) {
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
    file(url: string, data: anyObject, header = {}) {
        return this.RESTful(url, data, 'post', header)
    },
    post(url: string, data: anyObject, header = {}) {
        return this.RESTful(url, qs.stringify(data), 'post', header)
    },
    get(url: string, params = {}, header = {}) {
        return this.RESTful(url, params, 'get', header)
    },
    put(url: string, data: anyObject, header = {}) {
        return this.RESTful(url, qs.stringify(data), 'put', header)
    },
    delete(url: string, data: anyObject, header = {}) {
        return this.RESTful(url, qs.stringify(data), 'delete', header)
    }
}
