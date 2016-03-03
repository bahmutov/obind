const la = require('lazy-ass')
const check = require('check-more-types')

/* global describe, it */
describe('obind', function () {
  var obind = require('..')
  function foo (opts) {
    la(check.object(opts), 'expected opts to be an object', opts)
    la(opts.bar === 'bar', 'expected opts.bar to be "bar", got', opts.bar)
    la(opts.baz === 'baz', 'expected opts.baz to be "baz", got', opts.baz)
    la(Object.keys(opts).length === 2, 'expected only bar and baz, got', opts)
    return 'foo'
  }

  describe('foo is a test function', function () {
    it('has check function', function () {
      la(check.fn(foo))
    })

    it('needs bar and baz', function () {
      var good = {
        bar: 'bar',
        baz: 'baz'
      }
      la(foo(good) === 'foo')
    })

    it('checks bar value', function () {
      var bad = {
        bar: 'bar2',
        baz: 'baz'
      }
      la(check.raises(function () {
        foo(bad)
      }))
    })

    it('needs nothing more', function () {
      var extra = {
        bar: 'bar',
        baz: 'baz',
        two: 2
      }
      la(check.raises(function () {
        foo(extra)
      }))
    })
  })

  it('is a function', function () {
    la(check.fn(obind))
  })

  it('returns a new function', function () {
    var withBar = obind(foo, {})
    la(check.fn(withBar))
  })

  it('combines old and new args', function () {
    var withBar = obind(foo, { bar: 'bar' })
    var result = withBar({ baz: 'baz' })
    la(result === 'foo', 'correct result', result)
  })

  it('can combine empty object', function () {
    var withEmpty = obind(foo, {})
    var result = withEmpty({ bar: 'bar', baz: 'baz' })
    la(result === 'foo', 'correct result', result)
  })

  it('can combine multiple times', function () {
    var withEmpty = obind(foo, {})
    var withBar = obind(withEmpty, { bar: 'bar' })
    var withBarBaz = obind(withBar, { baz: 'baz' })
    var result = withBarBaz()
    la(result === 'foo', 'correct result', result)
  })

  it('clones initial object', function () {
    var bar = { bar: 'bar' }
    var withBar = obind(foo, bar)
    var result = withBar({ baz: 'baz' })
    la(result === 'foo', 'initial result', result)
    bar.bar = 'nope'
    result = withBar({ baz: 'baz' })
    la(result === 'foo', 'second result', result)
  })
})

describe('obind examples', function () {
  var obind = require('..')
  it('simple', function () {
    function add (options) {
      return options.a + options.b
    }
    var add2 = obind(add, { a: 2 })
    var result = add2({ b: 3 })
    la(result === 5)
  })

  it('multiple steps', function () {
    function add (options) {
      return options.a + options.b
    }
    var add2 = obind(add, { a: 2 })
    var add2to5 = obind(add2, { b: 5 })
    var result = add2to5()
    la(result === 7)
  })

  it('needs empty object to start with', function () {
    function add (options) {
      return options.a + options.b
    }
    var addNothing = obind(add, {})
    var result = addNothing({ a: 2, b: 10 })
    la(result === 12)
  })

  it('no changes to bound values', function () {
    function add (options) {
      return options.a + options.b
    }
    var options = {
      a: 10,
      b: 20
    }
    var add10to20 = obind(add, options)
    options.a = 1
    var result = add10to20({})
    // changing options.a has no effect
    la(result === 30)
  })
})

describe('multiple arguments', function () {
  var obind = require('..')
  function foo (opts, second, third) {
    la(check.object(opts), 'expected opts to be an object', opts)
    la(opts.bar === 'bar', 'expected opts.bar to be "bar", got', opts.bar)
    la(opts.baz === 'baz', 'expected opts.baz to be "baz", got', opts.baz)
    la(Object.keys(opts).length === 2, 'expected only bar and baz, got', opts)

    la(second === 'second', 'second arg', second)
    la(third === 'third', 'third arg', third)

    return 'foo'
  }

  it('needs second and third arguments too', function () {
    var options = {
      bar: 'bar',
      baz: 'baz'
    }
    var bound = obind(foo, options)
    la(check.fn(bound), 'returned bound function')

    var result = bound({}, 'second', 'third')
    la(result === 'foo', 'returned result', result)
  })
})
