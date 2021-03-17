import { createStore } from 'vuex'
import global from './global'

export default createStore({
    namespaced: true,
    modules: {
        global
    },
    getters: {
        ['route'](state) {
            return state.route
        }
    }
})
