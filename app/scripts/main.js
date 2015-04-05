/* jshint devel:true */
(function() {
  'use strict';
  var i, k;

  var routes = {
    ', /, /index, /home': 'index',
    'music, /music': 'music'
  };

  for (k in routes) {
    var split = k.split(', ');
    for (i = 0; i < split.length; i++) {
      routes[split[i]] = routes[k];
    }
  }

  function preloadIcon(src) {
    var img = new Image();
    img.src = src;
  }

  var preloadIcons = [
    'images/icons/pause.png',
    'images/sky0.jpg',
    'images/sky1.jpg',
    'images/sky2.jpg',
    'images/sky3.jpg',
    'images/sky4.jpg',
    'images/sky5.jpg'
  ];
  for (i = 0; i < preloadIcons.length; i++) {
    preloadIcon(preloadIcons[i]);
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
