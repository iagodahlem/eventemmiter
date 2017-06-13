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
      expect(emmiter.on('hello', sayHello)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayHello] })
    })

    it('add two events', () => {
      expect(emmiter.on('hello', sayHello)).toBe(emmiter)
      expect(emmiter.on('goodbye', sayGoodbye)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayHello], goodbye: [sayGoodbye] })
    })

    it('add the same event twice', () => {
      expect(emmiter.on('hello', sayHello)).toBe(emmiter)
      expect(emmiter.on('hello', sayHello)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayHello, sayHello] })
    })

    it('add the same event three times', () => {
      expect(emmiter.on('hello', sayHello)).toBe(emmiter)
      expect(emmiter.on('hello', sayHello)).toBe(emmiter)
      expect(emmiter.on('hello', sayHello)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayHello, sayHello, sayHello] })
    })
  })

  describe('emit', () => {
    it('emit non-existent event', () => {
      expect(emmiter.emit('non-existent')).toBe(false)
    })

    it('emit an existent event', () => {
      emmiter.on('hello', sayHello)

      expect(emmiter.emit('hello')).toBe(true)
      expect(sayHello.mock.calls.length).toBe(1)
    })

    it('emit an existent event with two equal callbacks', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayHello)

      expect(emmiter.emit('hello')).toBe(true)
      expect(sayHello.mock.calls.length).toBe(2)
    })

    it('emit an existent event with two diferent callbacks', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayGoodbye)

      expect(emmiter.emit('hello')).toBe(true)
      expect(sayHello.mock.calls.length).toBe(1)
      expect(sayGoodbye.mock.calls.length).toBe(1)
    })
  })

  describe('removeListener', () => {
    it('remove non-existent listener', () => {
      emmiter.on('hello', sayHello)

      expect(emmiter._events).toEqual({ hello: [sayHello] })
      expect(emmiter.removeListener('non-existent', sayHello)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayHello] })
    })

    it('remove listener with non-existent callback', () => {
      emmiter.on('hello', sayHello)

      expect(emmiter._events).toEqual({ hello: [sayHello] })
      expect(emmiter.removeListener('hello', sayGoodbye)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayHello] })
    })

    it('remove an existent listener', () => {
      emmiter.on('hello', sayHello)

      expect(emmiter._events).toEqual({ hello: [sayHello] })
      expect(emmiter.removeListener('hello', sayHello)).toBe(emmiter)
      expect(emmiter._events).toEqual({})
    })

    it('remove one callback from a listener with two equal callbacks', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayHello)

      expect(emmiter._events).toEqual({ hello: [sayHello, sayHello] })
      expect(emmiter.removeListener('hello', sayHello)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayHello] })
    })

    it('remove one callback from a listener with two diferent callbacks', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('hello', sayGoodbye)

      expect(emmiter._events).toEqual({ hello: [sayHello, sayGoodbye] })
      expect(emmiter.removeListener('hello', sayHello)).toBe(emmiter)
      expect(emmiter._events).toEqual({ hello: [sayGoodbye] })
    })
  })

  describe('removeAllListeners', () => {
    it('remove all existent listeners', () => {
      emmiter.on('hello', sayHello)
      emmiter.on('goodbye', sayGoodbye)

      expect(emmiter.removeAllListeners()).toBe(emmiter)
      expect(emmiter._events).toEqual({})
    })
  })
})
