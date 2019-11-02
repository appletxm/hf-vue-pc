/* global Vue */
import { decorate } from 'common/axio-decorate'
import global from 'common/globals'
import hasPermission from 'mixins/permission'
import * as filters from 'filters/form'
import styles from '../css/index.scss'
import router from './router'
import { setInitialStates } from './store/state'
import { getStore } from './store'
import App from './app'

const { appPrefix } = styles
const state = setInitialStates({ appPrefix })
const store = getStore(state)

function bootStrap() {
  decorate()

  // 注册全局通过过滤器
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })

  // // 注册全局权限判断
  Vue.mixin(hasPermission);

  new Vue({
    router,
    store,
    render: (h) => {
      global.store = store
      return h(App)
    }
  }).$mount('#app')
}
bootStrap()
