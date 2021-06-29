import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  storage: window.sessionStorage,
  reducer: (state) => ({
    user: {
      token: state.user.token
    }
  })
})

const store = new Vuex.Store({
  modules: {
    settings,
    tagsView,
    user
  },
  plugins: [vuexLocal.plugin],
  getters
})

export default store
