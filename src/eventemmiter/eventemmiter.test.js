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

  })

  describe('emit', () => {

  })

  describe('removeListener', () => {

  })

  describe('removeAllListeners', () => {

  })
})
