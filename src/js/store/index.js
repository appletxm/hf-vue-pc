/* global Vuex */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'

export const getStore = (state) => {
  return new Vuex.Store({
    state,
    getters: {},
    actions: {},
    mutations
  })
}
