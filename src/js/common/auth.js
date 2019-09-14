import * as uiUtils from 'utils/ui-utils'

const ACCESS_TOKEN = 'loginToken'

export function checkUserLogin() {
  let hasToken
  hasToken = false
  if (uiUtils.uiCookie.get(ACCESS_TOKEN)) {
    hasToken = true
  }

  return hasToken
}

export function setTokenToCookie(value) {
  let cookieTime
  cookieTime = 1000 * 60 * 60 * 24 * 7
  uiUtils.uiCookie.set(ACCESS_TOKEN, value, cookieTime)
}

export function getTokenFromCookie() {
  return uiUtils.uiCookie.get(ACCESS_TOKEN)
}

export function removeAllCookie() {
  uiUtils.uiCookie.delete(ACCESS_TOKEN)
}
