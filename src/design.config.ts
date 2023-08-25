/** 设计稿宽度 */
export const designWidth = 375
/** 设计稿高度 */
export const designHeight = 667
export const designMultiple = designWidth / 750
/** 兼容最小宽度 */
export const minWidth = 320
/** 兼容最小宽度 */
export const minWindow = `${minWidth}Px`
/** 兼容最大宽度 */
export const maxWidth = 540
/** 兼容最大宽度 */
export const maxWindow = `${maxWidth}Px`
/**
 * ```字号大小, 尽量配合Ui库, 比如vant就是设计稿宽度为375, rootfontsize为37.5
 * 如果你的设计稿是750的, 方法有2
 * 1: 将上面的设计稿宽度设置为750, 然后字号设置成70, 然后css代码的宽高按设计稿中实际的书写, 然后在postcss插件, 针对性判断vant的字号改成37.5
 * 2: 将上面的设计稿宽度设置为375, 然后字号设置成37.5, 然后css代码的宽高按设计稿中实际/2书写, 也可以将设计稿尺寸调整到375后, 按375的实际尺寸书写```
 */
export const fontSize = 37.5

export const charsetRemoval = function () {
    return {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
            charset: (atRule: any) => {
                if (atRule.name === 'charset')
                    atRule.remove()
            },
        },
    }
}
