/* jshint devel:true */
(function() {
  'use strict';
  var loadCount = 0;

  var preloadIcons = [
    'images/icons/pause.png',
    'images/headers/1.svg',
    'images/headers/2.svg',
    'images/headers/3.svg',
    'images/headers/4.svg',
    'images/headers/5.svg'
  ];

  function onImgLoad() {
    loadCount++;
    if (loadCount === preloadIcons.length) {
      console.log('Preloaded all images');
    }
  }

  function preloadIcon(src) {
    var img = new Image();
    img.src = src;
    img.onload = onImgLoad;
  }

  for (var i = 0; i < preloadIcons.length; i++) {
    preloadIcon(preloadIcons[i]);
  }
})();
