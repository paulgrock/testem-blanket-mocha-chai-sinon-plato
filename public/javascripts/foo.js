define(['jquery'], function($) {
  'use strict';
  var foo = {
    init: function(s1, s2){
      return s1 + s2;
    },
    fetch: function(){
      return $.ajax({
        'url': 'http://api.bopengx.com'
      });
    },
    render: function(data){
      return '<li>' + data.name + '</li>';
    },
    error: function(data){
      return data.error;
    }
  };
  return foo;
});
