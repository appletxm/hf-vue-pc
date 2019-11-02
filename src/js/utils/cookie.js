export default {
  set(name, value, time) {
    const exp = new Date()
    exp.setTime(exp.getTime() + (+time)) // 过期时间以毫秒为单位
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },

  get(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)

    if (arr && arr.length >= 3) {
      return (arr[2])
    } else {
      return null
    }
  },

  delete(name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.get(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
    }
  }
}
