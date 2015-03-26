(function() {
  'use strict';

  var $openedAlbum = null;
  var locked = false;
  var animationEnabled = false;

  var $albums = $('.albums');
  // var $album1 = $('.album-1');
  // var $album2 = $('.album-2');

  $albums.on('click', '.album', function() {
    if (locked || !animationEnabled) {
      return;
    }

    var lockTime = 1000;
    var $this = $(this);
    if (!$openedAlbum) {
      $albums.addClass('opened opened-' + $this.data('album-no'));
      $openedAlbum = $this;
    } else if (this !== $openedAlbum[0]) {
      $albums.removeClass('opened opened-1 opened-2');
      $openedAlbum = null;
      lockTime = 2000;

      setTimeout(function() {
        $openedAlbum = $this;
        $albums.addClass('opened opened-' + $this.data('album-no'));
      }, 1000);
    } else {
      $albums.removeClass('opened opened-1 opened-2');
      $openedAlbum = null;
    }

    locked = true;
    setTimeout(function() {
      locked = false;
    }, lockTime);
  });
})();
