;(function initObind () {
  function copy (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  function isFunction (x) {
    return typeof x === 'function'
  }

  function isPlainObject (x) {
    return typeof x === 'object' &&
    Object.prototype.toString.call(x) === '[object Object]'
  }

  function obind (fn, partial) {
    if (!isFunction(fn)) {
      throw new Error('Expected function as first argument to obind')
    }
    if (!isPlainObject(partial)) {
      throw new Error('Expected plain object partial argument')
    }
    var obj = copy(partial)

    return function obound (arg) {
      if (arguments.length > 0 &&
        isPlainObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          if (typeof copy[key] === 'undefined') {
            obj[key] = arg[key]
          }
        })
        var allArguments = Array.prototype.slice.call(arguments, 0)
        allArguments[0] = obj
        return fn.apply(null, allArguments)
      } else if (isPlainObject(partial)) {
        return fn(partial)
      } else {
        return fn(arg)
      }
    }
  }

  if (typeof module === 'object') {
    module.exports = obind
  }
  if (typeof window === 'object') {
    window.obind = obind
  }
}())
