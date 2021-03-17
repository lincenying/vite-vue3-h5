/* eslint-disable no-prototype-builtins */
/* eslint-disable require-atomic-updates */
import api from '@/api'
import config from '@/config'
import cloneDeep from 'lodash/clonedeep'
import get from 'lodash/get'
import isBoolean from 'lodash/isboolean'
import isEmpty from 'lodash/isempty'
import isInteger from 'lodash/isinteger'
import isNumber from 'lodash/isnumber'
import merge from 'lodash/merge'
import ls from 'store2'

const user = ls.get('user')
let userId = (user && user.id) || ''
userId = userId ? userId + '_' : ''

export const inBrowser = typeof window !== 'undefined'

export const getSumDay = (dateTemp, days) => {
    const arr_dateTemp = dateTemp.split(' ')[0].split('-')
    var nDate = new Date(arr_dateTemp[1] + '/' + arr_dateTemp[2] + '/' + arr_dateTemp[0] + ' 00:00:00')
    var millSeconds = nDate.getTime() + days * 24 * 60 * 60 * 1000
    var rDate = new Date(millSeconds)
    var year = rDate.getFullYear()
    var month = rDate.getMonth() + 1
    if (month < 10) month = '0' + month
    var date = rDate.getDate()
    if (date < 10) date = '0' + date
    return year + '-' + month + '-' + date
}

export const UTC2Date = (utc, format, add) => {
    if (!format) format = 'y-m-d'
    if (utc && typeof utc === 'string') utc = utc.replace(/-/g, '/').replace('.000000', '')
    let newDate = utc ? new Date(utc) : new Date()
    if (add) newDate = new Date(newDate.setDate(newDate.getDate() + add))
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let date = newDate.getDate()
    let hours = newDate.getHours()
    let minutes = newDate.getMinutes()
    let seconds = newDate.getSeconds()
    let mseconds = newDate.getMilliseconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    if (mseconds < 100 && mseconds > 9) {
        mseconds = '0' + mseconds
    } else if (mseconds < 10) {
        mseconds = '00' + mseconds
    }
    return format
        .replace(/y/gi, year)
        .replace(/m/gi, month)
        .replace(/d/gi, date)
        .replace(/h/gi, hours)
        .replace(/i/gi, minutes)
        .replace(/s/gi, seconds)
        .replace(/v/gi, mseconds)
}

export const diff = (date, day) => {
    if (date) {
        date = date.replace(/-/g, '/').replace('.000000', '')
        const now = new Date().getTime()
        const dateTime = new Date(date).getTime()
        return now - dateTime > day * 86400000
    }
    return false
}

export const diffDay = (date1, date2) => {
    if (!date1) {
        date1 = new Date()
    } else {
        date1 = new Date(date1.replace(/-/g, '/').replace('.000000', ''))
    }
    if (!date2) {
        date2 = new Date()
    } else {
        date2 = new Date(date2.replace(/-/g, '/').replace('.000000', ''))
    }
    const days = date1.getTime() - date2.getTime()
    return parseInt(days / (1000 * 60 * 60 * 24), 10)
}

export const formatSeconds = value => {
    var theTime = parseInt(value, 10)
    var theTime1 = 0
    var theTime2 = 0
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60, 10)
        theTime = parseInt(theTime % 60, 10)
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60, 10)
            theTime1 = parseInt(theTime1 % 60, 10)
        }
    }
    var s = parseInt(theTime, 10)
    s = s > 9 ? s : '0' + s
    var m = parseInt(theTime1, 10)
    m = m > 9 ? m : '0' + m
    var h = parseInt(theTime2, 10)
    h = h > 9 ? h : '0' + h
    var result = s
    result = m + ':' + result
    result = h + ':' + result
    return result
}

function _randomChar(length) {
    var x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
    var tmp = ''
    var timestamp = new Date().getTime()
    for (var i = 0; i < length; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
    }
    return timestamp + tmp
}

export const randomChar = _randomChar

const upload_base = async (files, progress, params = {}) => {
    var oMyForm = new FormData()
    try {
        const data = await api.fetch(config.apiUrl + 'oss/upload?noLoading', params)
        const name = files.name
        const arr_name = name.split('.')
        const ext = arr_name[arr_name.length - 1]
        const key = data.dir + userId + _randomChar(6) + '.' + ext
        const url = data.cdn_host + '/' + key
        oMyForm.append('name', files.name)
        oMyForm.append('key', key)
        oMyForm.append('success_action_status', '200')
        Object.keys(data).forEach(item => {
            if (item === 'accessid') oMyForm.append('OSSAccessKeyId', data[item])
            else oMyForm.append(item, data[item])
        })
        oMyForm.append('file', files)
        const apiUrl = data.host + (data.host.indexOf('?') > -1 ? '&' : '?') + 'noLoading'
        window.source = window.axios.CancelToken.source()
        const { Status, message } = await api.fetch(
            apiUrl,
            oMyForm,
            {
                method: 'post',
                withCredentials: false,
                onUploadProgress: progress
            },
            window.source.token
        )
        if (Status === 'Ok') return Promise.resolve(url)
        return Promise.reject(message || '上传失败')
    } catch (error) {
        return Promise.reject(error.toString())
    }
}

// 上传图片
const upload_img = async files => {
    const isJPG = ['image/jpeg', 'image/x-png', 'image/png', 'image/gif'].includes(files.type)
    const isLt2M = files.size / 1024 / 1024 < 2
    if (!isJPG) {
        return Promise.reject('选择的文件只能是图片格式!')
    }
    if (!isLt2M) {
        return Promise.reject('上传的图片大小不能超过 2MB!')
    }
    try {
        const url = await upload_base(files)
        return Promise.resolve(url)
    } catch (error) {
        return Promise.reject(error.toString())
    }
}
// 上传压缩文件
const upload_rar = async (files, progress) => {
    const name = files.name
    const arr_name = name.split('.')
    const ext = arr_name[arr_name.length - 1]
    const isRAR = ['zip', 'rar'].includes(ext.toLowerCase())
    if (!isRAR) {
        return Promise.reject('选择的文件只能是 RAR 或者 ZIP 格式!')
    }
    try {
        const url = await upload_base(files, progress)
        return Promise.resolve(url)
    } catch (error) {
        return Promise.reject(error.toString())
    }
}
// 上传视频文件
const upload_video = async (files, progress) => {
    const name = files.name
    const arr_name = name.split('.')
    const ext = arr_name[arr_name.length - 1]
    const isRAR = ['mp4', 'mov'].includes(ext.toLowerCase())
    if (!isRAR) {
        return Promise.reject('选择的文件只能是 MP4 或者 MOV 格式!')
    }
    try {
        const url = await upload_base(files, progress, { t: 'video' })
        return Promise.resolve(url)
    } catch (error) {
        return Promise.reject(error.toString())
    }
}

export const uploadBase = upload_base
export const uploadimg = upload_img
export const uploadrar = upload_rar
export const uploadvideo = upload_video

export const setConfig = () => ({
    dialog: false,
    row: {}
})

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const str2array = str => {
    try {
        str = JSON.parse(str)
    } catch (error) {
        str = []
    }
    if (typeof str === 'object') return str
    return []
}

export const oc = get

export const is = {
    // $is.false('') === true
    // $is.false('1') === false
    // $is.false(0.11) === false
    // $is.false(0) === true
    // $is.false(1) === false
    // $is.false(null) === true
    // $is.false({}) === true
    // $is.false({ a: 1 }) === false
    // $is.false([]) === true
    // $is.false([1]) === false
    // $is.false(undefined) === true
    // $is.false(true) === false
    // $is.false(false) === true
    false(payload) {
        return !!payload === false || (!isBoolean(payload) && !isNumber(payload) && isEmpty(payload))
    },
    // $is.empty('') === true
    // $is.empty('1') === false
    // $is.empty(0.11) === false
    // $is.empty(1) === false
    // $is.empty(null) === true
    // $is.empty({}) === true
    // $is.empty({ a: 1 }) === false
    // $is.empty([1]) === false
    // $is.empty(undefined) === true
    // $is.empty(true) === true
    // $is.empty(false) === true
    empty(payload) {
        return !isNumber(payload) && isEmpty(payload)
    },
    number(payload) {
        return isNumber(payload)
    },
    array(payload) {
        return Array.isArray(payload)
    },
    int(payload) {
        return isInteger(payload)
    }
}
export const isempty = payload => {
    return !isNumber(payload) && isEmpty(payload)
}

// 获取滚动条宽度
export const getScrollWidth = () => {
    //creates a DOM element
    const testDiv = document.createElement('div')
    //stores the CSS atributes
    const cssAttributes = {
        width: '100px',
        height: '100px',
        overflow: 'scroll',
        position: 'absolute',
        top: '-999px'
    }
    //sets all the styles on testDiv
    for (const attr in cssAttributes) {
        testDiv.style[attr] = cssAttributes[attr]
    }
    //adds the testDiv to the DOM
    document.body.appendChild(testDiv)
    //measures the the scrollWidth
    const width = testDiv.offsetWidth - testDiv.clientWidth
    //removes the testDiv from the DOM
    document.body.removeChild(testDiv)
    //returns the width
    return width
}

export const addNewStyle = newStyle => {
    var styleElement = document.getElementById('styles_js')

    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.type = 'text/css'
        styleElement.id = 'styles_js'
        document.getElementsByTagName('head')[0].appendChild(styleElement)
    }

    styleElement.appendChild(document.createTextNode(newStyle))
}

// 将字符串中的横线模式替换成驼峰模式
// a-bc-df => aBcDf
export const tranformStr = str => {
    const strArr = str.split('-')
    for (let i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
    }
    return strArr.join('')
}

// 深度合并对象
export const deepMerge = merge

// 深度克隆
export const deepClone = cloneDeep

export const strlen = str => {
    var len = 0
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i)
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++
        } else {
            len += 2
        }
    }
    return len
}

export const paramsToObject = str => {
    const obj = {}
    if (!str) return null
    const strArr = str.split('&')
    strArr.forEach(item => {
        const arr_item = item.split(':')
        obj[arr_item[0]] = arr_item[1]
    })
    return obj
}

// 返回一个lower - upper之间的随机数
export const random = (lower, upper) => {
    lower = +lower || 0
    upper = +upper || 0
    return Math.random() * (upper - lower) + lower
}
