import * as types from '../mutation-types'

const leftbar = {
  state: {
    isLeftbarCollapse: false,
    menuList: []
  },
  getters: {
    isLeftbarCollapse(state) {
      return state.isLeftbarCollapse;
    },
    menuList(state) {
      return state.menuList
    }
  },
  mutations: {
    [types.LEFTBAR_CHANGE](state, val) {
      state.isLeftbarCollapse = !val;
    },
    [types.MENU_LIST](state, val) {
      state.menuList = val
    }
  }
};

export default leftbar;
