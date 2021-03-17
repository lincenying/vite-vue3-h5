import api from '@/api'

const state = {
    message: {
        visible: false,
        text: ''
    },
    userInfo: null,
    globalLoading: true,
    routerLoading: false
}

const actions = {
    async ['getUserInfo'](store) {
        const { commit } = store
        const { data, code } = await api('/api/user/user_info')
        if (code === 200) {
            commit('receiveUserInfo', data)
        }
    }
}

const mutations = {
    ['setMsg'](state, payload) {
        state.message.visible = !!payload
        state.message.text = payload
    },
    ['setPageSwitching'](state, isPageSwitching) {
        state.isPageSwitching = isPageSwitching
    },
    ['globalLoading'](state, payload) {
        state.globalLoading = payload
    },
    ['routerLoading'](state, payload) {
        state.routerLoading = payload
    }
}

const getters = {
    ['getGlobal'](state) {
        return state
    }
}

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters
}
