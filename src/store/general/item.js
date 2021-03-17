import api from '@/api'

const state = {
    data: []
}

const actions = {
    async ['get']({ commit }, config) {
        const { code, data } = await api.post(config.url, config.data)
        if (code === 1001) commit('receive', data)
    }
}

const mutations = {
    ['receive'](state, data) {
        state.data = [].concat(data)
    },
    ['modify'](state, payload) {
        const index = state.data.findIndex(item => item.id === payload.id)
        if (index > -1) {
            state.data.splice(index, 1, payload)
        }
    },
    ['insert'](state, payload) {
        state.data = [payload].concat(state.data)
    },
    ['remove'](state, id) {
        const index = state.data.findIndex(item => item.id === +id)
        state.data.splice(index, 1)
    }
}

const getters = {
    ['get'](state) {
        return state.data
    }
}
export const _state = state
export const _actions = actions
export const _mutations = mutations
export const _getters = getters
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
