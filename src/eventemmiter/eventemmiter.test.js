const EventEmmiter = require('./eventemmiter')

describe('EventEmmiter', () => {
  let emmiter
  const sayHello = jest.fn()
  const sayGoodbye = jest.fn()

  beforeEach(() => {
    emmiter = new EventEmmiter()
  })

  it('have a empty object events', () => {
    expect(emmiter._events).toEqual({})
  })

  describe('on', () => {
    it('add a event', () => {
      emmiter.on('hello', sayHello)
      expect(emmiter._events).toEqual({ hello: [sayHello] })
    })

    it('add two events', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('goodbye', sayGoodbye)
      expect(emmiter._events).toEqual({ hello: [sayHello], goodbye: [sayGoodbye] })
    })

    it('add the same event twice', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayHello)
      expect(emmiter._events).toEqual({ hello: [sayHello, sayHello] })
    })

    it('add the same event three times', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayHello)
      expect(emmiter._events).toEqual({ hello: [sayHello, sayHello, sayHello] })
    })
  })

  describe('emit', () => {

  })

  describe('removeListener', () => {

  })

  describe('removeAllListeners', () => {

  })
})
