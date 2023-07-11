function formatTime(value: any, format: string) {
    format = format || 'y-m-d'
    return UTC2Date(value, format)
}

function dateTime(value: string) {
    if (!value || typeof value !== 'string')
        return ''
    const arr = value.split(':')
    return `${arr[0]}:${arr[1]}`
}

function arrToStr(value: string | any[]) {
    try {
        if (typeof value === 'string')
            value = JSON.parse(value)
        if (Array.isArray(value))
            return value.join(', ')

        return value
    }
    catch (error) {
        return ''
    }
}

function tofixed(value: string | number) {
    return Number(value).toFixed(2)
}

export function useFilters() {
    return {
        formatTime,
        dateTime,
        arrToStr,
        tofixed,
    }
}
