const baseSize = {}
for (let i = 10; i < 48; i++) {
    baseSize[i + 'px'] = i + 'px'
}

module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                teal: {
                    100: '#096'
                }
            },
            fontSize: baseSize,
            lineHeight: baseSize
        }
    }
}
