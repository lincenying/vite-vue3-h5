module.exports = {
    purge: ['./src/**/*.vue'],
    theme: {
        screens: false,
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: {
                light: '#999',
                DEFAULT: '#333',
                dark: '#000'
            },
            blue: {
                light: '#85d7ff',
                DEFAULT: '#1fb6ff',
                dark: '#009eeb'
            },
            pink: {
                light: '#ff7ce5',
                DEFAULT: '#ff49db',
                dark: '#ff16d1'
            },
            gray: {
                darkest: '#1f2d3d',
                dark: '#3c4858',
                DEFAULT: '#c0ccda',
                light: '#e0e6ed',
                lightest: '#f9fafc'
            }
        },
        extend: {}
    }
}
