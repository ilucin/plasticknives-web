/* jshint devel:true */
$(function() {
  'use strict';

  var $body = $('body');

  function getColorComponent(max) {
    return Math.floor(Math.random() * max) * max;
  }

  window.setInterval(function() {
    $body.css('background-color', '#' + getColorComponent(3) + getColorComponent(2) + getColorComponent(3));
  }, 2000);
});
