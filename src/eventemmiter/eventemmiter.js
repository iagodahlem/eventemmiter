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

  }

  removeListener(event) {

  }

  removeAllListeners() {

  }
}

module.exports = EventEmmiter
