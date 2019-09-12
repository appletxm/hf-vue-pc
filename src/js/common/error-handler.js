/* global Vue */
import auth from 'common/auth'
import globals from 'common/globals'
import { NEED_SHOW_LOGIN_POP } from 'store/mutation-types'

export const handleTokenExpired = function (resData) {
  if (globals.store.state.isHandingExpired !== true) {
    globals.store.commit(NEED_SHOW_LOGIN_POP, true)
  }
}

export const errorPopMsg = {
  showTimeoutErrConfrim(errorObj) {
    Vue.$messagebox.alert(TOKEN_INVALID, '登录过期').then(() => {
      let url
      auth.removeAllCookie()
      url = window.location.origin + window.location.pathname + '#/login?timeOut=1'
      window.location.href = url
    }).catch(() => {
      if (errorObj) {
        throw (errorObj)
      }
    })
  }
}

export const errorCodeMatch = {
  '-1'(resData) {
    let errorObj = {code: resData.code, message: resData.detailMessage || resData.message}

    if (HOME_PAGE.indexOf(window.location.hash) >= 0) {
      throw (errorObj)
    } else {
      errorPopMsg.showTimeoutErrConfrim(errorObj)
      throw (errorObj)
    }
  },

  '401'(resData) {
    let errorObj = {code: resData.code, message: resData.detailMessage || resData.message}

    if (HOME_PAGE.indexOf(window.location.hash) >= 0) {
      throw (errorObj)
    } else {
      handleTokenExpired(resData)
      throw (errorObj)
    }
  }
}
