;(function initObind() {
  function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function isPlainObject(x) {
    return typeof x === 'object' &&
      Object.prototype.toString.call(x) === '[object Object]';
  }

  function obind(fn, partial) {
    if (!isPlainObject(partial)) {
      throw new Error('Expected plain object partial argument');
    }
    var obj = copy(partial);

    return function obound(arg) {
      if (arguments.length === 1 &&
        isPlainObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          if (typeof copy[key] === 'undefined') {
            obj[key] = arg[key];
          }
        });
        return fn(obj);
      } else if (isPlainObject(partial)) {
        return fn(partial);
      } else {
        return fn(arg);
      }
    };
  }

  if (typeof module === 'object') {
    module.exports = obind;
  }
}());
