/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
    const arr = base64Buf.split(',')
    const typeItem = arr[0]
    const mime = typeItem.match(/:(.*?);/)![1]
    const bstr = window.atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--)
        u8arr[n] = bstr.charCodeAt(n)

    return new Blob([u8arr], { type: mime })
}

/**
   * img url to base64
   * @param url
   */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>
        const ctx = canvas!.getContext('2d')

        const img = new Image()
        img.crossOrigin = ''
        img.onload = function () {
            if (!canvas || !ctx)
                return reject(new Error('当前浏览器不支持'))

            canvas.height = img.height
            canvas.width = img.width
            ctx.drawImage(img, 0, 0)
            const dataURL = canvas.toDataURL(mineType || 'image/png')
            canvas = null
            resolve(dataURL)
        }
        img.src = url
    })
}

type TargetContext = '_self' | '_blank'
export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
    const feature: string[] = []

    noopener && feature.push('noopener=yes')
    noreferrer && feature.push('noreferrer=yes')

    window.open(url, target, feature.join(','))
}

/**
 * 在线下载图片
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
    urlToBase64(url).then((base64) => {
        downloadByBase64(base64, filename, mime, bom)
    })
}

/**
 * 下载基于base64的图片
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
    const base64Buf = dataURLtoBlob(buf)
    downloadByData(base64Buf, filename, mime, bom)
}

/**
 * 根据后端Api下载文件流
 * @param {*} data
 * @param {*} filename
 * @param {*} mime
 * @param {*} bom
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
    const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
    const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

    const blobURL = window.URL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)
    if (typeof tempLink.download === 'undefined')
        tempLink.setAttribute('target', '_blank')

    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
}

interface DownloadByUrlType {
    url: string
    target?: TargetContext
    fileName?: string
}

/**
 * 根据文件地址下载文件
 * @param {*} sUrl
 */
export function downloadByUrl({ url, target = '_blank', fileName }: DownloadByUrlType): boolean {
    const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome')
    const isSafari = window.navigator.userAgent.toLowerCase().includes('safari')

    if (/(iP)/g.test(window.navigator.userAgent)) {
        console.error('您的浏览器不支持下载!')
        return false
    }
    if (isChrome || isSafari) {
        const link = document.createElement('a')
        link.href = url
        link.target = target

        if (link.download !== undefined)
            link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)

        if (document.createEvent) {
            const e = document.createEvent('MouseEvents')
            e.initEvent('click', true, true)
            link.dispatchEvent(e)
            return true
        }
    }
    if (!url.includes('?'))
        url += '?download'

    openWindow(url, { target })
    return true
}
