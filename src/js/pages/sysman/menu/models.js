import axios from 'axios'
import apiUrls from 'common/api-urls'

// 查询菜单信息列表
export function getMenuList(data) {
  return axios.get(apiUrls.getMenuList, {
    params: {
      ...data
    }
  })
}

// 查询菜单树
export function getMenuTree(data) {
  return axios.get(apiUrls.getMenuTree, {
    params: {
      ...data
    }
  })
}

// 失效或恢复菜单
export function expireOrRecMenu(data) {
  return axios.get(apiUrls.expireOrRecMenu, {
    params: {
      ...data
    }
  })
}

// 查询菜单信息列表
export function delMenus(data) {
  return axios.post(apiUrls.delMenus, {
    ...data
  })
}

// 获取菜单信息
export function getMenu(data) {
  return axios.get(apiUrls.getMenu, {
    params: {
      ...data
    }
  })
}

// 更新菜单信息
export function updateMenu(data) {
  return axios.post(apiUrls.updateMenu, {
    ...data
  })
}

// 新增菜单信息
export function addMenu(data) {
  return axios.post(apiUrls.addMenu, {
    ...data
  })
}
