class EventEmmiter {
  constructor() {
    this._events = {}
  }

  on(event, callback) {
    if (!this._events.hasOwnProperty(event)) {
      this._events[event] = [callback]
      return this
    }

    this._events[event].push(callback)
    return this
  }

  emit(event) {
    if (!this._events.hasOwnProperty(event)) {
      return false
    }

    this._events[event].forEach(callback => callback())
    return true
  }

  removeListener(event) {

  }

  removeAllListeners() {

  }
}

module.exports = EventEmmiter
