## obind examples

### simple

    function add(options) {
      return options.a + options.b;
    }
    var add2 = obind(add, {
      a: 2
    });
    var result = add2({
      b: 3
    });
    result; // 5

---

### multiple steps

    function add(options) {
      return options.a + options.b;
    }
    var add2 = obind(add, {
      a: 2
    });
    var add2to5 = obind(add2, {
      b: 5
    });
    var result = add2to5();
    result; // 7

---

### needs empty object to start with

    function add(options) {
      return options.a + options.b;
    }
    var addNothing = obind(add, {});
    var result = addNothing({
      a: 2,
      b: 10
    });
    result; // 12

---

### no changes to bound values

    function add(options) {
      return options.a + options.b;
    }
    var options = {
      a: 10,
      b: 20
    };
    var add10to20 = obind(add, options);
    options.a = 1;
    var result = add10to20({});
    // changing options.a has no effect
    result; // 30

---

For more examples, see [unit tests](test/spec.js)