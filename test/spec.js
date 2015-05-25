require('lazy-ass');
var check = require('check-more-types');

describe('obind', function () {
  var obind = require('..');
  function foo(opts) {
    la(check.object(opts), 'expected opts to be an object', opts);
    la(opts.bar === 'bar', 'expected opts.bar to be "bar", got', opts.bar);
    la(opts.baz === 'baz', 'expected opts.baz to be "baz", got', opts.baz);
    la(Object.keys(opts).length === 2, 'expected only bar and baz, got', opts);
    return 'foo';
  }

  describe('foo is a test function', function () {
    it('has check function', function () {
      la(check.fn(foo));
    });

    it('needs bar and baz', function () {
      var good = {
        bar: 'bar',
        baz: 'baz'
      };
      la(foo(good) === 'foo');
    });

    it('checks bar value', function () {
      var bad = {
        bar: 'bar2',
        baz: 'baz'
      };
      la(check.raises(function () {
        foo(extra);
      }));
    });

    it('needs nothing more', function () {
      var extra = {
        bar: 'bar',
        baz: 'baz',
        two: 2
      };
      la(check.raises(function () {
        foo(extra);
      }));
    });
  });

  it('is a function', function () {
    la(check.fn(obind));
  });

  it('returns a new function', function () {
    var withBar = obind(foo, {});
    la(check.fn(withBar));
  });

  it('combines old and new args', function () {
    var withBar = obind(foo, { bar: 'bar' });
    var result = withBar({ baz: 'baz' });
    la(result === 'foo', 'correct result', result);
  });

  it('can combine empty object', function () {
    var withEmpty = obind(foo, {});
    var result = withEmpty({ bar: 'bar', baz: 'baz' });
    la(result === 'foo', 'correct result', result);
  });

  it('can combine multiple times', function () {
    var withEmpty = obind(foo, {});
    var withBar = obind(withEmpty, { bar: 'bar' });
    var withBarBaz = obind(withBar, { baz: 'baz' });
    var result = withBarBaz();
    la(result === 'foo', 'correct result', result);
  });
});
