// import auth from 'common/auth'
// import eventQueue from 'common/event-queue'
// import consts from 'common/consts'
// import storage from 'common/storage'
// import { SET_USER_LOGIN_STATUS, IS_HANDLING_EXPIRED, NEED_SHOW_LOGIN_POP } from 'store/mutation-types'
// import { getQueryString } from 'utils/ui-utils'

import navigatorList from './navigatorList'

export function getNavigatorList() {
  return navigatorList
}

export default {
  // runEventQue() {
  //   let events = eventQueue.getQueue()

  //   if (Object.keys(events).length === 0) {
  //     return false
  //   }

  //   for (let key in events) {
  //     let args = events[key]['params'] || {}
  //     let fn = events[key]['event'] || []
  //     let context = events[key]['context']
  //     let triggerUrl = events[key]['triggerUrl']

  //     if (fn && typeof fn === 'function') {
  //       if (triggerUrl !== '' && window.location.href.indexOf(triggerUrl) < 0) {
  //         return
  //       }
  //       if (context) {
  //         fn.apply(context, args)
  //       } else {
  //         fn(args)
  //       }
  //     }
  //   }
  // },

  // clearQueue() {
  //   eventQueue.clearQueue()
  // },

  // resetStoreForLogin(_this) {
  //   _this.$store.commit(NEED_SHOW_LOGIN_POP, false)
  //   _this.$store.commit(IS_HANDLING_EXPIRED, false)
  // },

  // changeHanldingState(_this) {
  //   _this.$store.commit(IS_HANDLING_EXPIRED, true)
  // },

  // changeLoginState(_this) {
  //   _this.$store.commit(SET_USER_LOGIN_STATUS, auth.checkUserLogin())
  // },

  // getReferrer() {
  //   let curUrl,
  //     queryReferrer,
  //     referrer

  //   curUrl = decodeURIComponent(window.location.hash.replace(/#\//g, ''))
  //   queryReferrer = getQueryString(consts['REGISTER_CHANEL_ID'], curUrl)
  //   referrer = (queryReferrer !== null) ? queryReferrer : ''
  //   storage.set('referrer', referrer)
  // }
}
