/* jshint devel:true */
(function() {
  'use strict';

  var routes = {
    ', /, /index, /home': 'index',
    'music, /music': 'music'
  };

  for (var k in routes) {
    var split = k.split(', ');
    for (var i = 0; i < split.length; i++) {
      routes[split[i]] = routes[k];
    }
  }

  var currentRoute = routes[window.location.hash.replace('#', '')];

  var $page = $('.container[data-route=' + currentRoute + ']');
  // $page.removeClass('hidden');

  var $header = $page.find('.header');
  var $counterContainer = $page.find('.counter-container');
  var $counter = $page.find('.counter');

  function updateLayout() {
    if (currentRoute === 'index') {
      $counterContainer.css('height', $header.height());
      $counter.children().css('height', $counter.height());
    } else {
      $page.find('.header-middle').css('height', $header.height());
    }
  }

  $(window).on('resize', updateLayout);
  updateLayout();
})();
