(function() {
  'use strict';

  var FONT_KEY = 'sourcesanspro-1';

  function addFont(fontContent) {
    var style = document.createElement('style');
    style.rel = 'stylesheet';
    document.head.appendChild(style);
    style.textContent = fontContent;
  }

  var storedFont = window.localStorage ? window.localStorage.getItem(FONT_KEY) : null;
  if (storedFont) {
    addFont(storedFont);
  } else {
    var request = new XMLHttpRequest();
    request.open('GET', 'styles/sourcesanspro.woff.css', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        if (window.localStorage) {
          window.localStorage.setItem(FONT_KEY, request.responseText);
        }
        addFont(request.responseText);
      }
    };

    request.send();
  }
}());
