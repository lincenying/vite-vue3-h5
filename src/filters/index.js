import { UTC2Date } from '@/utils'

export function fotmatTime(value, format) {
    format = format || 'y-m-d'
    return UTC2Date(value, format)
}
export function dateTime(value) {
    if (!value || typeof value !== 'string') return ''
    const arr = value.split(':')
    return arr[0] + ':' + arr[1]
}

export function arrToStr(value) {
    try {
        if (typeof value === 'string') value = JSON.parse(value)
        if (Object.prototype.toString.call(value) === '[object Array]') {
            return value.join(', ')
        }
        return value
    } catch (error) {
        return ''
    }
}

export function tofixed(value) {
    return Number(value).toFixed(2)
}
