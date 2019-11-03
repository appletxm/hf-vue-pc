const { api, isMock } = require('env.cfg')

let newApi = api
if (isMock !== true) {
  newApi = ((window.appInfo && window.appInfo.apiHost) ? window.appInfo.apiHost : '') + newApi
}
const bspDataSync = `${newApi}/bsp-data-syn-config-mgr`
const bspSys = `${newApi}/bsp-system`

export default {
  userLogin: `${bspDataSync}/user/login`,
  userLogout: `${bspDataSync}/user/logout`,
  getUserInfo: `${bspSys}/user/userInfo`,
  isAdmin: `${bspDataSync}/user/isAdmin`,
  getAuthList: `${bspSys}/menu/userPermission`,
  getWebMenuTree: `${bspSys}/menu/backEnd/listTree`,
  getMenuList: `${bspSys}/menu/backEnd/listTree`
}
