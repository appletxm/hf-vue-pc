import uiCookie from 'utils/cookie'

const ACCESS_TOKEN = 'HF_Auth_Token'
const cookieTime = 1000 * 60 * 60 * 24 * 7

export function checkUserLogin() {
  let hasToken
  hasToken = false
  if (uiCookie.get(ACCESS_TOKEN)) {
    hasToken = true
  }

  return hasToken
}

export function setTokenToCookie(value) {
  uiCookie.set(ACCESS_TOKEN, value, cookieTime)
}

export function getTokenFromCookie() {
  return uiCookie.get(ACCESS_TOKEN)
}

export function removeAllCookie() {
  uiCookie.delete(ACCESS_TOKEN)
}
