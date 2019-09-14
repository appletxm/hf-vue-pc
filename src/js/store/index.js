/* global Vuex */
import mutations from './mutations'

export const getStore = (state) => {
  return new Vuex.Store({
    state,
    getters: {},
    actions: {},
    mutations
  })
}
