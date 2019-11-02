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

  // /** 菜单管理 */
  // 菜单树
  // getMenuTree: `${bspSys}/menu/listTree`,
  // getMenuList: `${bspSys}/menu/list`,
  // // 失效或恢复菜单
  // expireOrRecMenu: `${bspSys}/menu/expireOrRec`,
  // // 删除菜单信息
  // delMenus: `${bspSys}/menu/del`,
  // // 获取菜单信息
  // getMenu: `${bspSys}/menu/getById`,
  // // 更新菜单信息
  // updateMenu: `${bspSys}/menu/mod`,
  // // 新增菜单
  // addMenu: `${bspSys}/menu/add`,

  // /** 配置管理 */
  // // 查询配置管理列表
  // getConfigList: `${bspSys}/config/list`,
  // // 删除配置管理s
  // delConfigs: `${bspSys}/config/del`,
  // // 获取配置管理
  // getConfig: `${bspSys}/config/getById`,
  // // 更新配置管理
  // updateConfig: `${bspSys}/config/mod`,
  // // 新增配置管理
  // addConfig: `${bspSys}/config/add`,

  // /** 用户管理 */
  // // 查询用户信息列表
  // getUserList: `${bspSys}/user/backend/list`,
  // // 读取配置
  // getConfigVal: `${bspSys}/config/view`,
  // // 重置用户密码
  // resetUserPwd: `${bspSys}/user/resetPwd`,
  // // 失效或恢复用户
  // expireOrRecUser: `${bspSys}/user/expireOrRec`,
  // // 删除用户信息s
  // delUsers: `${bspSys}/user/del`,
  // // 获取用户信息
  // getUser: `${bspSys}/user/getById`,
  // // 更新用户信息
  // updateUser: `${bspSys}/user/mod`,
  // // 新增用户
  // addUser: `${bspSys}/user/addUserExtRole`,
  // // 字典类型 获取 字典数据列表
  // getCodeDataList: `${bspSys}/code/list`,

  // /** 角色管理 */
  // // 查询角色信息列表
  // getRoleList: `${bspSys}/role/list`,
  // // 失效或恢复角色
  // expireOrRecRole: `${bspSys}/role/expireOrRec`,
  // // 获取某角色对应的用户列表
  // getRoleUserList: `${bspSys}/userRoleRel/userListByRoleId`,
  // // 为角色分配用户
  // putUserIn: `${bspSys}/role/putUserIn`,
  // // 获取角色信息
  // getRole: `${bspSys}/role/getById`,
  // // 角色名查重
  // checkRoleName: `${bspSys}/role/isRoleNameExist`,
  // // 新增角色
  // addRole: `${bspSys}/role/add`,
  // // 更新角色信息
  // updateRole: `${bspSys}/role/mod`,
  // // 删除角色信息s
  // delRoles: `${bspSys}/role/del`,
  // /** 用户组角色管理 */
  // // 获取某角色对应的用户组列表
  // getRoleGroupList: `${bspSys}/groupRoleRel/groupListByRoleId`,
  // // 为角色分配用户组
  // putGroupIn: `${bspSys}/role/putGroupIn`,
  // /** 用户组信息 */
  // // 用户组用户选择列表
  // userListByGroupId: `${bspSys}/userGroupRel/userListByGroupId`,
  // // 为用户组配置角色
  // putUserInG: `${bspSys}/user/group/putUserIn`,

  // /** 字典管理 */
  // // 查询字典管理列表
  // getDictList: `${bspSys}/codeType/list`,
  // // 删除字典管理s
  // delDicts: `${bspSys}/codeType/del`,
  // // 获取字典管理
  // getDict: `${bspSys}/codeType/view`,
  // // 更新字典管理
  // updateDict: `${bspSys}/codeType/mod`,
  // // 新增字典管理
  // addDict: `${bspSys}/codeType/add`,
  // /** 字典（数据） */
  // // 查询字典（数据）列表
  // getCodeList: `${bspSys}/code/list`,
  // // 删除字典（数据）s
  // delCodes: `${bspSys}/code/del`,
  // // 获取字典（数据）
  // getCode: `${bspSys}/code/getById`,
  // // 更新字典（数据）
  // updateCode: `${bspSys}/code/mod`,
  // // 新增字典（数据）
  // addCode: `${bspSys}/code/add`,
}
