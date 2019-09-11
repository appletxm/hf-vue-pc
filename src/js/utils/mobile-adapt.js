export default function uiAdapt (win, doc, uxWidth) {
  var docEl,
    rem,
    dpr,
    resizeEvt,
    recalc

  uxWidth = uxWidth || 750
  docEl = doc.documentElement
  dpr = win.devicePixelRatio || 1
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  recalc = function () {
    var clientWidth = docEl.clientWidth * dpr
    if (!clientWidth) return
    if (clientWidth >= uxWidth) {
      rem = 100
    } else {
      rem = 100 * (clientWidth / uxWidth)
    }
    docEl.style.fontSize = rem + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

  // 给js调用的，某一dpr下rem和px之间的转换函数
  win.rem2px = function (v) {
    v = parseFloat(v)
    return v * rem
  }
  win.px2rem = function (v) {
    v = parseFloat(v)
    return v / rem
  }
  window.dpr = dpr
  window.rem = rem

  // var dpr, rem, scale
  // var docEl = doc.documentElement
  // var fontEl = doc.createElement('style')
  // var metaEl = doc.querySelector('meta[name="viewport"]')

  // dpr = win.devicePixelRatio || 2
  // rem = docEl.clientWidth * dpr / 10
  // scale = 1 / dpr

  // // 设置viewport，进行缩放，达到高清效果
  // metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no')

  // // 设置data-dpr属性，留作的css hack之用
  // docEl.setAttribute('data-dpr', dpr)

  // // 动态写入样式
  // docEl.firstElementChild.appendChild(fontEl)
  // fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}'

  // // 给js调用的，某一dpr下rem和px之间的转换函数
  // win.rem2px = function (v) {
  //   v = parseFloat(v)
  //   return v * rem
  // }
  // win.px2rem = function (v) {
  //   v = parseFloat(v)
  //   return v / rem
  // }

// win.dpr = dpr
// win.rem = rem
}
