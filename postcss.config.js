const pxtorem = require('postcss-pxtorem')

var charsetRemoval = () => {
    return {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
            charset: atRule => {
                if (atRule.name === 'charset') {
                    atRule.remove()
                }
            }
        }
    }
}

module.exports = () => {
    return {
        plugins: [
            charsetRemoval(),
            pxtorem({
                rootValue: 37.5,
                propList: ['*'],
                selectorBlackList: ['van-circle__layer']
            })
        ]
    }
}
