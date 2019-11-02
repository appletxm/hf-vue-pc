import eventQueue from 'common/event-queue'
import { getItem } from 'common/storage'
import axios from 'axios'
import apiUrls from 'common/api-urls'

export function getUserInfoFromCache() {
  const userInfo = getItem('userInfo')
  if (userInfo) {
    return userInfo
  } else {
    return {}
  }
}

export function runEventQueue(route) {
  eventQueue.executeQueue(route)
}

export function clearQueue() {
  eventQueue.clearQueue()
}

export function isAdmin() {
  return axios.get(apiUrls.isAdmin)
}

export function getAuthList(data) {
  return axios.get(apiUrls.getAuthList, {
    params: {
      ...data
    }
  })
}

export function getWebMenuTree(data) {
  return axios.get(apiUrls.getWebMenuTree, {
    params: {
      ...data
    }
  })
}
