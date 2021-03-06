# obind

> Partial application for functions taking a single argument object.

[![NPM][obind-icon] ][obind-url]

[![Build status][obind-ci-image] ][obind-ci-url]
[![dependencies][obind-dependencies-image] ][obind-dependencies-url]
[![devdependencies][obind-devdependencies-image] ][obind-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)

Install and use under Node: `npm install obind --save`

Use: `obind(fn, partialOptions)`, returns new function.

## Example

```js
var obind = require('obind');
function foo(options) { ... }
var withBar = obind(foo, { bar: 'bar' });
withBar({ baz: 'baz' });
/*
equivalent to
foo({
    bar: 'bar',
    baz: 'baz'
})
*/
```

## Information

It is like [Function.prototype.bind][bind] but for function that expect single
options object. Note, `obind` only does [partial application, not context binding][partial vs binding].

See [Partial application for options object][1] blog post.

[1]: http://glebbahmutov.com/blog/partial-application-for-options-object/

For more examples, [see this page](examples.md).

In the browser include the script and then use `window.obind` function.

Additional arguments after the first object will be passed unchanged

```js
function foo(options, a, b) { ... }
var bound = obind(foo, someOptions)
bound(moreOptions, a, b)
// same as
foo(moreOptions + someOptions, a, b)
```

## Parameter destructuring

If you like ES6 [parameter destructuring](http://www.2ality.com/2015/01/es6-destructuring.html) 
(and you should), then `obind` helps you partially apply it.

```js
function mul({a, b}) { 
  console.log(a, b); 
  return a * b 
}
const double = obind(mul, {a: 2})
console.log(double({b: 3}))
// 2, 3
// 6
```

Read [related blog post](https://glebbahmutov.com/blog/parameter-destructuring/).

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/obind/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[obind-icon]: https://nodei.co/npm/obind.png?downloads=true
[obind-url]: https://npmjs.org/package/obind
[obind-ci-image]: https://travis-ci.org/bahmutov/obind.png?branch=master
[obind-ci-url]: https://travis-ci.org/bahmutov/obind
[obind-dependencies-image]: https://david-dm.org/bahmutov/obind.png
[obind-dependencies-url]: https://david-dm.org/bahmutov/obind
[obind-devdependencies-image]: https://david-dm.org/bahmutov/obind/dev-status.png
[obind-devdependencies-url]: https://david-dm.org/bahmutov/obind#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[bind]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[partial vs binding]: http://glebbahmutov.com/blog/binding-vs-partial-application/
