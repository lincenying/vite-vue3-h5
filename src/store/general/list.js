import get from 'lodash.get'
import api from '@/api'

const actions = {
    async ['get']({ commit }, config = {}) {
        config = { api: 'post', methods: '', ...config }
        const { code, data } = await api[config.api](config.url, config.data, config.methods)
        if (code === 1001) commit('receive', data)
    }
}

const mutations = {
    ['receive'](state, data) {
        state.data = [].concat(data)
    },
    ['modify'](state, payload) {
        const $$key = payload.$$key || 'id'
        let index = -1
        if (payload.$$index) index = Number(payload.$$index)
        else index = state.data.findIndex(item => String(get(item, $$key)) === String(get(payload, $$key)))
        if (index > -1) {
            const obj = {
                ...state.data[index],
                ...payload,
                $$index: undefined,
                $$key: undefined
            }
            delete obj.$$index
            delete obj.$$key
            state.data.splice(index, 1, obj)
        }
    },
    ['insert'](state, payload) {
        state.data = [payload].concat(state.data)
    },
    ['remove'](state, payload) {
        const $$key = payload.$$key || 'id'
        const index = payload.$$index || state.data.findIndex(item => String(get(item, $$key)) === String(get(payload, $$key)))
        state.data.splice(index, 1)
    }
}

const getters = {
    ['get'](state) {
        return state.data
    }
}
export const _actions = actions
export const _mutations = mutations
export const _getters = getters
export default {
    namespaced: true,
    state() {
        return { data: [] }
    },
    actions,
    mutations,
    getters
}
