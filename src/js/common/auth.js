import * as uiUtils from 'utils/ui-utils'

const FR_EXPRESS_ACCESS_TOKEN = 'loginToken'

export default {
  checkUserLogin() {
    let hasToken
    // ,getLoginUserInfo

    hasToken = false
    // getLoginUserInfo = false

    if (uiUtils.uiCookie.get(FR_EXPRESS_ACCESS_TOKEN)) {
      hasToken = true
    }

    // if (store.state.userInfo.userId) {
    //   getLoginUserInfo = true
    // }

    return hasToken
  },

  setTokenToCookie(value) {
    let cookieTime

    cookieTime = 1000 * 60 * 60 * 24 * 7
    uiUtils.uiCookie.set(FR_EXPRESS_ACCESS_TOKEN, value, cookieTime)
  },

  getTokenFromCookie() {
    return uiUtils.uiCookie.get(FR_EXPRESS_ACCESS_TOKEN)
  },

  removeAllCookie() {
    uiUtils.uiCookie.delete(FR_EXPRESS_ACCESS_TOKEN)
  }
}
