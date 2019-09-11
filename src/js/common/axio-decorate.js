import axios from 'axios'
import auth from 'common/auth'
import * as errorHandler from 'common/error-handler'

// const urlPrefix = '/api'

/* eslint-disable */
const configAxios = {
  decorate() {
    // default axios config
    // axios.defaults.baseURL = urlPrefix
    axios.defaults.withCredentials = true
    axios.defaults.header = true
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.loginToken = auth.getTokenFromCookie()

    // 添加一个请求拦截器
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // 添加一个响应拦截器
    axios.interceptors.response.use(function (response) {
      // Do something with response data
      let resData = response.data

      if (resData.code === 200 || resData.code === '200') {
        return resData
      } else {
        if (errorHandler.errorCodeMatch[resData.code]) {
          errorHandler.errorCodeMatch[resData.code](resData)
        } else {
          throw ({code: resData.code, message: resData.detailMessage || resData.message})
        }
      }
    }, function (error) {
      // Do something with response error
      return Promise.reject(error)
    // throw ({code: error.code, message: error.detailMessage || error.message})
    })
  },

  setHttpHeaderCookie() {
    axios.defaults.headers.loginToken = auth.getTokenFromCookie()
  }
}
/* eslint-enable */

export default configAxios
