/*
 * type.js
 * Copyright 2012 Brandon Bickford
 * Licensed under the Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 *
 * Easy/simple type system with inheritance.
 *
 * Usage:
 * New types:
 *
 *   var A = type.subtype(null, {
 *     SOME_CONST: 36,
 *     x: function() {
 *        return this.v;
 *      },
 *      init: function(v) {
 *        this.q = q;
 *      }
 *   });
 *
 * Instances:
 *
 *   var a = A(25);
 *   assert(a.x() == 25)
 *
 * Subtypes:
 *
 *   var B = type.Object.subtype({
 *     x: function() {
 *        return 2 + B.super.x.call(this);
 *     }
 *   });
 *
 *   var b = B(25);
 *   assert(b.x() == 27);
 *
 * Selectors:
 * (alternative to functions like bind(expr, expr.func, ...))
 *
 *   var B = type.subtype(type.Object, {
 *     init: function(v) {
 *        this.v = v;
 *     }
 *     x: function() {
 *      console.log("callback!", this.v);
 *     }
 *   });
 *   var b = B();
 *   window.timeout(1000, b.selector("x"))  ;
 *
 * Identity:
 *
 * Each object has an .id property which can be used to compare for identity.
 *
 *
 */
define("type", [], function() {
  var type = {};
  function subtype_(def) {
    return type.subtype(this, def);
  }
  type.objectCount = 0;
  type.subtype = function(parent, def) {
    function C() {
      var t = arguments.callee.type;
      var o = new t;
      if (typeof o.init != "undefined")
        o.init.apply(o, arguments);
      o.id = type.objectCount++;
      o.type = C;
      return o;
    }

    var base0 = parent && parent.type ? parent.type : Function;
    function base1() {};
    base1.prototype = new base0;
    function base2() {
    }
    base2.prototype = new base1;
    for (var key in def) {
      base2.prototype[key] = def[key];
    }
    C.type = base2;
    C.id = type.objectCount++;
    C.parent = parent;
    C.super = base1.prototype;
    C.subtype = subtype_;
    return C;
  }

  type.Object = type.subtype(null, {
    init: function() {
    },
    isa: function(aType) {
      var h = this.type;
      while (h) {
        if (aType === h)
          return true;
        h = h.parent;
      }
      return false;
    },
    selector: function(name) {
      var o = this;
      return function() {
        return o[name].apply(o, arguments);
      }
    }
  });
  return type;
});
