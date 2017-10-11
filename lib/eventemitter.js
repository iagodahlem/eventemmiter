'use strict'

class EventEmitter {
  constructor() {
    this._events = {}
  }

  on(event, callback) {
    if (!this.hasEvent(event)) {
      this._events[event] = [callback]
      return this
    }

    this._events[event].push(callback)
    return this
  }

  emit(event) {
    if (!this.hasEvent(event)) {
      return false
    }

    this._events[event].forEach(cb => cb())
    return true
  }

  removeListener(event, callback) {
    if (!this.hasEvent(event, callback)) {
      return this
    }

    if (this._events[event].length === 1) {
      delete this._events[event]
      return this
    }

    this._events[event].splice(this._events[event].indexOf(callback), 1)
    return this
  }

  removeAllListeners() {
    this._events = {}
    return this
  }

  hasEvent(event = '', callback = false) {
    if (event && callback) {
      return this._events.hasOwnProperty(event)
        && this._events[event].some(cb => cb === callback)
    }

    return this._events.hasOwnProperty(event)
  }
}

module.exports = EventEmitter
