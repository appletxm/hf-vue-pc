/* global Vue */
import { decorate } from 'common/axio-decorate'
import styles from '../css/index.scss'
import router from './router'
import { setInitialStates } from './store/state'
import { getStore } from './store'
import App from './app'

const { appPrefix } = styles
const state = setInitialStates({ appPrefix })
const store = getStore(state)

decorate()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
