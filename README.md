type.js
=======

Javascript type/structs-with-methods system

Requirements
===========

This module is intended for use with RequireJS or equivalent Javascript module loading system.

Usage
-----

```Javascript
define("mymodule", ["type"], function(type) {
  var Button = type.Object.subtype({
    init: function(title) {
      Button.super.init.call(this);
      this.title = title;
    },
    press: function()  {
      console.log("button", this.title, "pressed");
    }
  })

  var button = Button();
  button.press();

  // subclassing

  var Checkbox = Button.subtype({
    checked: false,
    press: function() {
      this.checked != this.checked;
      Checkbox.super.press.call(this);
    }
  });
  var cb = Checkbox("foo");
  cb.checked == false;
  cb.press();
  cb.checked == true;

  // Call cb.press() after 1000 ms
  window.timeout(1000, cb.selector("press"))
})

```

Legal
-----
Copyright 2012 Brandon Bickford.
Licensed Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)


