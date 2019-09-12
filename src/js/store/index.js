/* global Vuex */
import * as consts from './mutation-types'

const store = new Vuex.Store({
  state: {
    announcement: {
      userId: ''
    }
  },

  getters: {},

  actions: {},

  mutations: {
    [consts.SET_USER_INFO](state, payLoad) {
      state.userInfo = payLoad
    },

    [consts.NEED_SHOW_LOGIN_POP](state, value) {
      state.needShowLoginPop = value
    },

    [consts.SET_CURRENT_MODULE](state, value) {
      state.currentModule = value
    },

    [consts.SET_SHOW_NAVIGATOR](state, value) {
      state.showNavigator = value
    },

    [consts.SET_LOGIN_METHOD](state, value) {
      state.loginMethod = value
    },

    [consts.SET_USER_LOGIN_STATUS](state, value) {
      state.isUserLogin = value
    },

    [consts.IS_HANDLING_EXPIRED](state, value) {
      state.isHandingExpired = value
    },

    [consts.SET_RESET_PASS_TOKEN](state, value) {
      state.resetPassToken = value
    }
  }
})

export default store
