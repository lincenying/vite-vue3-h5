const pxtorem = require('postcss-pxtorem')

module.exports = () => {
    return {
        plugins: [
            pxtorem({
                rootValue: 37.5,
                propList: ['*'],
                selectorBlackList: ['van-circle__layer']
            })
        ]
    }
}
