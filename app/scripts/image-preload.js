/* jshint devel:true */
(function() {
  'use strict';
  var loadCount = 0;

  var preloadIcons = [
    'images/icons/pause.png',
    'images/sky0.jpg',
    'images/sky1.jpg',
    'images/sky2.jpg',
    'images/sky3.jpg',
    'images/sky4.jpg',
    'images/sky5.jpg'
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
