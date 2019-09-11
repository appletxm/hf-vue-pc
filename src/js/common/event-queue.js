/* global EXPRESS_EVENTS */

/* eslint-disable no-global-assign */
window.EXPRESS_EVENTS = {}

export default {
  pushEvent(options) {
    let {key, event, params, context, needKeep, triggerUrl} = options
    EXPRESS_EVENTS[key] = {event, params, context, needKeep, triggerUrl}
  },

  deleteEvent(key) {
    delete EXPRESS_EVENTS[key]
  },

  clearQueue() {
    for (let key in EXPRESS_EVENTS) {
      let needKeep = EXPRESS_EVENTS[key]['needKeep']
      if (!needKeep || needKeep !== true) {
        delete EXPRESS_EVENTS[key]
      }
    }
  },

  getQueue() {
    return EXPRESS_EVENTS
  },

  generateEventId() {
    let id = 'event-' + Math.floor(Math.random() * 1000000)
    return id
  }
}
/* eslint-enable no-global-assign */
