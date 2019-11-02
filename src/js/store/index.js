/* global Vuex */

import mutations from './mutations'
import user from './modules/user'
import leftbar from './modules/leftbar'

export const getStore = (state) => new Vuex.Store({
  state,
  actions: {},
  mutations,
  modules: {
    user,
    leftbar
  }
})
