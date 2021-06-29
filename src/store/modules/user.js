const state = {
  token: '',
  userInfo: {}
}

const getters = {
  token: state => { return state.token },
  userInfo: state => { return state.userInfo }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  setToken({ commit }, data) {
    commit('SET_TOKEN', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

