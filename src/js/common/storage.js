/* global localStorage */
const FR_EXPRESS_USER_INFO = 'fr_express_user_info'
const DEFAULT_ADDRESS = 'defaultAddress'
const RECEIVE_ADDRESS = 'receiveAddress'
const ADDRESS_TYPE = 'address_type'
const ADDRESS_PAGE_NEED_TAB = 'address_type_need_tab'

export default {
  setUserInfoToStorage(value) {
    localStorage.setItem(FR_EXPRESS_USER_INFO, encodeURIComponent(JSON.stringify(value)))
  },

  getUserInfoFromStorage() {
    return JSON.parse(decodeURIComponent(localStorage.getItem(FR_EXPRESS_USER_INFO)))
  },

  getUserId(userIdFromStore) {
    let userInfo

    if (!userIdFromStore) {
      userInfo = this.getUserInfoFromStorage()
      if (userInfo) {
        return userInfo.name
      }
    }

    return userIdFromStore
  },

  setAddresTypeToStorage(type) {
    localStorage.setItem(ADDRESS_TYPE, type)
  },

  getAddresTypeToStorage() {
    return parseInt(localStorage.getItem(ADDRESS_TYPE), 10)
  },

  setDefaultAddressToStorage(defaultAddress) {
    localStorage.setItem(DEFAULT_ADDRESS, encodeURIComponent(JSON.stringify(defaultAddress)))
  },

  getDefaultAddressToStorage() {
    let defaultAddress
    try {
      defaultAddress = JSON.parse(decodeURIComponent(localStorage.getItem(DEFAULT_ADDRESS)))
    } catch (err) {
      defaultAddress = ''
    }
    return defaultAddress
  },

  setReceiveAddressToStorage(receiveAddress) {
    localStorage.setItem(RECEIVE_ADDRESS, encodeURIComponent(JSON.stringify(receiveAddress)))
  },

  getReceiveAddressToStorage() {
    let receiveAddress
    try {
      receiveAddress = JSON.parse(decodeURIComponent(localStorage.getItem(RECEIVE_ADDRESS)))
    } catch (err) {
      receiveAddress = ''
    }
    return receiveAddress
  },

  setNeedAddressTabFlag(value) {
    localStorage.setItem(ADDRESS_PAGE_NEED_TAB, value)
  },

  getNeedAddressTabFlag() {
    return parseInt(localStorage.getItem(ADDRESS_PAGE_NEED_TAB), 10)
  },

  loginOutRemoveAll() {
    localStorage.clear()
  },
  get(key) {
    let res = localStorage.getItem(key)

    res = res ? decodeURIComponent(res) : ''
    if ((/\{|\}|\[|\]/g).test(res)) {
      try {
        return JSON.parse(res)
      } catch (e) {
        return res
      }
    } else {
      return res
    }
  },

  set(key, value) {
    let objKeys = typeof value === 'string' ? [] : Object.keys(value)
    let str = value

    if (objKeys.length > 0) {
      str = JSON.stringify(value)
    } else {
      if (str === null || str === undefined) {
        str = ''
      }
    }

    str = encodeURIComponent(str)

    localStorage.setItem(key, str)
  },

  remove(key) {
    localStorage.removeItem(key)
  }
}
