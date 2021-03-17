import get from 'lodash.get'

import api from '@/api'

const actions = {
    async ['get']({ commit }, config) {
        config = { api: 'post', methods: '', ...config }
        const { code, data } = await api[config.api](config.url, config.data, config.methods)
        if (code === 1001) commit('receive', data)
    },
    async ['remove']({ commit }, config) {
        config = { api: 'post', methods: '', ...config }
        const { code } = await api[config.api](config.url, config.data, config.methods)
        if (code === 1001) commit('remove', { id: config.data.id })
        return code
    }
}

const mutations = {
    ['receive'](state, { data, current_page, total }) {
        state.lists.data = [].concat(data)
        state.lists.current_page = current_page
        state.lists.total = total
    },
    ['modify'](state, payload) {
        const $$key = payload.$$key || 'id'
        let index = -1
        if (payload.$$index) index = Number(payload.$$index)
        else index = state.lists.data.findIndex(item => String(get(item, $$key)) === String(get(payload, $$key)))
        if (index > -1) {
            const obj = {
                ...state.lists.data[index],
                ...payload,
                $$index: undefined,
                $$key: undefined
            }
            delete obj.$$index
            delete obj.$$key
            state.lists.data.splice(index, 1, obj)
        }
    },
    ['insert'](state, payload) {
        state.lists.data = [payload].concat(state.lists.data)
        state.lists.total++
    },
    ['remove'](state, payload) {
        const $$key = payload.$$key || 'id'
        const index = payload.$$index || state.lists.data.findIndex(item => String(get(item, $$key)) === String(get(payload, $$key)))
        state.lists.data.splice(index, 1)
    }
}

const getters = {
    ['get'](state) {
        return state.lists
    }
}
export const _actions = actions
export const _mutations = mutations
export const _getters = getters
export default {
    namespaced: true,
    state() {
        return { lists: { data: [], total: 0, current_page: 1 } }
    },
    actions,
    mutations,
    getters
}
