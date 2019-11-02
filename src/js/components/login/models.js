import axios from 'axios'
import apiUrls from 'common/api-urls'
import { contentTypeWww, setHttpHeaderCookie } from 'common/axio-decorate'
import { setItem } from 'common/storage'
import { setTokenToCookie } from 'common/auth'

export function userLogin(params) {
  params = JSON.parse(JSON.stringify(params))
  return axios.post(apiUrls.userLogin, params, {
    headers: { 'Content-Type': contentTypeWww }
  })
}

export function setUserInfoToCache(userInfo) {
  /* eslint-disable camelcase */
  const { HF_Auth_Token, truename, userId, username } = userInfo.data

  setHttpHeaderCookie(HF_Auth_Token)
  setTokenToCookie(HF_Auth_Token)
  setItem('userInfo', { truename, userId, username, userName: username })
  /* eslint-enable camelcase */
}
