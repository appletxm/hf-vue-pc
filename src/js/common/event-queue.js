/* eslint-disable no-global-assign */
const currentEvents = {}

function pathIsMatched(path, triggerUrl) {
  if (typeof triggerUrl === 'string') {
    return path === triggerUrl
  }

  if (triggerUrl.constructor.name.toLocaleLowerCase() === 'array') {
    return (triggerUrl).indexOf(path) >= 0
  }
}

export default {
  pushEvent(options) {
    let {key, event, params, context, needKeep, triggerUrl} = options
    currentEvents[key] = {event, params, context, needKeep, triggerUrl}
  },

  deleteEvent(key) {
    delete currentEvents[key]
  },

  clearQueue() {
    for (let key in currentEvents) {
      let needKeep = currentEvents[key]['needKeep']
      if (!needKeep || needKeep !== true) {
        delete currentEvents[key]
      }
    }
  },

  getQueue() {
    return currentEvents
  },

  generateEventId() {
    let id = 'event-' + Math.floor(Math.random() * 1000000)
    return id
  },

  executeQueue(route) {
    let events = this.getQueue()

    if (Object.keys(events).length === 0) {
      return false
    }

    for (let key in events) {
      let args = events[key]['params'] || {}
      let fn = events[key]['event'] || []
      let context = events[key]['context']
      let triggerUrl = events[key]['triggerUrl']

      if (fn && typeof fn === 'function') {
        if (triggerUrl && !pathIsMatched(route.path, triggerUrl)) {
          return
        }
        if (context) {
          fn.apply(context, args)
        } else {
          fn(args)
        }
      }
    }
  }
}
/* eslint-enable no-global-assign */
