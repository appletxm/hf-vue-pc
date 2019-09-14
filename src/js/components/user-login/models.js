import axios from 'axios'
import apiUrls from 'common/api-urls'

export function doLogin(user, pass) {
  return axios.post(apiUrls.userLogin, {
    user,
    pass
  })
}
