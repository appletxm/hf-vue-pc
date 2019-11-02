import * as actionTypes from './mutation-types'

export default {
  [actionTypes.NEED_SHOW_LOGIN_POP](state, value) {
    state.needShowLoginPop = value
  }
}
