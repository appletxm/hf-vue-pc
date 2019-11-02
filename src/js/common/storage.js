/* global localStorage */
// 获取item
export const getItem = (key) => {
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
}

// 设置item
export const setItem = (key, value = '') => {
  const objKeys = typeof value === 'string' ? [] : Object.keys(value)
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
}

// 清除item
export const removeItem = (key) => {
  localStorage.removeItem(key)
}

export const removeItemAll = () => {
  const userName = localStorage.getItem('userName_remember')
  localStorage.clear()
  localStorage.setItem('userName_remember', userName)
}
