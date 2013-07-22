require([
  'foo',
  'bar/bar'
], function (foo, bar) {
  'use strict';
  foo.init('foo', 'bar');
  bar.launch(3, 5);
});
