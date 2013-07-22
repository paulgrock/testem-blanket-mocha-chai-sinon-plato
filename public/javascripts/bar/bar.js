define(['jquery', 'lodash'], function ($, _) {
  'use strict';
  var app = {
    launch: function(num1, num2){
      console.log($.fn.jquery);
      console.log(_.VERSION);
      return num1 + num2;
    }
  };

  return app;
});
