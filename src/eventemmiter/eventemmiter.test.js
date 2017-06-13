const EventEmmiter = require('./eventemmiter')

describe('EventEmmiter', () => {
  let emmiter
  let sayHello = jest.fn()
  let sayGoodbye = jest.fn()

  beforeEach(() => {
    emmiter = new EventEmmiter()
    sayHello = jest.fn()
    sayGoodbye = jest.fn()
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
    it('emit non-existent event', () => {
      expect(emmiter.emit('non-existent')).toBe(false)
    })

    it('emit an existing event', () => {
      emmiter.on('hello', sayHello)

      expect(emmiter.emit('hello')).toBe(true)
      expect(sayHello.mock.calls.length).toBe(1)
    })

    it('emit an existing event with two equal callbacks', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayHello)

      expect(emmiter.emit('hello')).toBe(true)
      expect(sayHello.mock.calls.length).toBe(2)
    })

    it('emit an existing event with two diferent callbacks', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayGoodbye)

      expect(emmiter.emit('hello')).toBe(true)
      expect(sayHello.mock.calls.length).toBe(1)
      expect(sayGoodbye.mock.calls.length).toBe(1)
    })
  })

  describe('removeListener', () => {

  })

  describe('removeAllListeners', () => {

  })
})
