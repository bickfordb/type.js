= Type.js =

Simple Javascript type system

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

  // Bind this for callbacks:
  window.timeout(1000, cb.selector("press"))
})

```

