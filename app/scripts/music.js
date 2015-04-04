$(function() {
  'use strict';

  var $openedAlbum = null;
  var locked = false;
  var animationEnabled = true;

  var $content = $('.content');
  var $albums = $('.albums');
  var $playbackControls = $('.playback-controls');
  var player = window.player;
  var $audio = $('audio');

  function resetSongs() {
    $openedAlbum.find('.song').removeClass('playing');
    $openedAlbum.find('.__progress').css('width', 0);
    player.reset();
  }

  function setSongs() {
    var songs = [];
    $openedAlbum.find('.song').each(function() {
      songs.push({
        src: this.getAttribute('data-src'),
        duration: parseInt(this.getAttribute('data-duration'), 10)
      });
    });
    player.setSongs(songs);
  }

  function closeAlbum() {
    var $album = $openedAlbum;
    var is2 = $openedAlbum.hasClass('album-2');
    $openedAlbum.find('.__front').show();
    $albums.removeClass('opened opened-1 opened-2');
    resetSongs();
    $openedAlbum = null;

    setTimeout(function() {
      $album.siblings().removeClass('hidden-mobile');
      if (is2) {
        $content.scrollTop(1000);
      }
    }, 1000);
  }

  function openAlbum($album) {
    $albums.addClass('opened opened-' + $album.data('album-no'));
    $album.siblings().addClass('hidden-mobile');
    $openedAlbum = $album;
    setSongs();

    setTimeout(function() {
      $openedAlbum.find('.__front').hide();
    }, 1000);
  }

  function showPlayer() {
    $content.addClass('stretched');
    $playbackControls.addClass('shown');
  }

  function hidePlayer() {
    $playbackControls.removeClass('shown');
    $content.removeClass('stretched');
  }

  var onMainControlClick = function() {
    if ($(this).find('.__control').hasClass('play')) {
      player.play();
    } else {
      player.pause();
    }
  };

  $albums.on('click', '.song', function() {
    player.playSong($(this).index());
  });

  $playbackControls.on('click', '.__main-control', onMainControlClick);
  $playbackControls.on('click', '.__control.next', player.next);
  $playbackControls.on('click', '.__control.previous', player.previous);

  $audio.on('play', function() {
    $playbackControls.find('.__control.play-pause').addClass('pause').removeClass('play');
  });

  $audio.on('pause', function() {
    $playbackControls.find('.__control.play-pause').addClass('play').removeClass('pause');
  });

  $audio.on('song-play', function(ev, index) {
    var $currPlaying = $openedAlbum.find('.song.playing');
    if (index !== $currPlaying.index()) {
      $openedAlbum.find('.song').removeClass('playing');
      $openedAlbum.find('.song').eq(index).addClass('playing');
    }
  });

  $audio.on('song-progress', function(ev, progress) {
    if ($openedAlbum) {
      $openedAlbum.find('.__progress').css('width', (progress * 100).toFixed(2) + '%');
    }
  });

  $albums.on('click', '.album .__front, .album .__back .close-button', function(ev) {
    if (locked || !animationEnabled) {
      return;
    } else {
      ev.preventDefault();
      ev.stopPropagation();
    }

    var lockTime = 1000;
    var $album = $(this).parents('.album');
    if (!$openedAlbum) {
      openAlbum($album);

      setTimeout(showPlayer, 1000);
    } else if ($album[0] !== $openedAlbum[0]) {
      closeAlbum();
      lockTime = 2000;

      setTimeout(function() {
        openAlbum($album);
      }, 1000);
    } else {
      closeAlbum();

      setTimeout(hidePlayer, 1000);
    }

    locked = true;
    setTimeout(function() {
      locked = false;
    }, lockTime);
  });
});
