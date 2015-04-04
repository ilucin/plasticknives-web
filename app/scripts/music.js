(function() {
  'use strict';

  var $openedAlbum = null;
  var locked = false;
  var animationEnabled = true;

  var $albums = $('.albums');
  var $playbackControls = $('.playback-controls');
  var $content = $('.content');
  // var $album1 = $('.album-1');
  // var $album2 = $('.album-2');

  var flipAlbum = function(ev) {
    if (locked || !animationEnabled) {
      return;
    } else {
      ev.preventDefault();
      ev.stopPropagation();
    }

    var lockTime = 1000;
    var $album = $(this).parents('.album');
    if (!$openedAlbum) {
      $albums.addClass('opened opened-' + $album.data('album-no'));
      $openedAlbum = $album;

      setTimeout(function() {
        $content.addClass('stretched');
        $playbackControls.addClass('shown');
      }, 1000);
    } else if ($album[0] !== $openedAlbum[0]) {
      $albums.removeClass('opened opened-1 opened-2');
      $openedAlbum = null;
      lockTime = 2000;

      setTimeout(function() {
        $openedAlbum = $album;
        $albums.addClass('opened opened-' + $album.data('album-no'));
      }, 1000);

    } else {
      $albums.removeClass('opened opened-1 opened-2');
      $openedAlbum = null;

      setTimeout(function() {
        $playbackControls.removeClass('shown');
        $content.removeClass('stretched');
      }, 1000);
    }

    locked = true;
    setTimeout(function() {
      locked = false;
    }, lockTime);
  };

  $albums.on('click', '.album .__front, .album .__back .close-button', flipAlbum);
})();
