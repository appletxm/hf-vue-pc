import axios from 'axios'
import apiUrls from 'common/api-urls'
import { contentTypeWww } from 'common/axio-decorate'
import { removeItemAll } from 'common/storage'
import { removeAllCookie } from 'common/auth'

export function userLogout(data) {
  return axios.post(apiUrls.userLogout, {
    ...data
  }, {
    headers: { 'Content-Type': contentTypeWww }
  })
}

export function clearCacheForLogout() {
  removeItemAll()
  removeAllCookie()
}
