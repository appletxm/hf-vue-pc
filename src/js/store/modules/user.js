import * as types from '../mutation-types'

const user = {
  state: {
    userInfo: {},
    authList: [],
    isAdmin: '',
  },
  getters: {
    isAdmin(state) {
      return state.isAdmin;
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    [types.USER_INFO](state, userInfo) {
      state.userInfo = userInfo
    },

    [types.STORE_AUTH](state, authList) {
      state.authList = authList
    },

    [types.IS_ADMIN](state, bool) {
      state.isAdmin = bool;
    },
  }
}

export default user;
