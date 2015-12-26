$(function() {
  'use strict';

  var skyIndex = parseInt(Math.random() * 5, 10) + 1;

  function setBg() {
    skyIndex++;
    skyIndex = skyIndex > 5 ? 1 : skyIndex;
    $('body').addClass('body-color-' + skyIndex);
  }

  window.colors = {
    nextBg: function() {
      $('body').removeClass('body-color-' + skyIndex);
      setBg();
    }
  };

  setBg();
});
