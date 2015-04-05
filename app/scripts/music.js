$(function() {
  'use strict';

  var player = window.player;
  var colors = window.colors;

  var $openedAlbum = null;
  var $progressIndicator = null;
  var locked = false;
  var animationEnabled = true;

  var $content = $('.content');
  var $albums = $('.albums');
  var $playbackControls = $('.playback-controls');
  var $audio = $('audio');

  function animateScrollingToBottom($el, time) {
    var startTime = Date.now();

    function scroll() {
      var newTime = Date.now();
      $el.scrollTop(1000);
      if (startTime + time > newTime) {
        window.requestAnimationFrame(scroll);
      }
    }

    scroll();
  }

  function resetSongs() {
    $openedAlbum.find('.song').removeClass('playing');
    $progressIndicator.css('width', 0);
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
    $album.siblings().removeClass('hidden-mobile');
    $openedAlbum = null;
    $progressIndicator = null;

    if (is2) {
      animateScrollingToBottom($content, 1500);
    }
  }

  function openAlbum($album) {
    $albums.addClass('opened opened-' + $album.data('album-no'));
    $album.siblings().addClass('hidden-mobile');
    $openedAlbum = $album;
    $progressIndicator = $openedAlbum.find('.__progress-indicator');
    setSongs();

    setTimeout(function() {
      $openedAlbum.find('.__front').hide();
    }, 300);
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
      colors.nextBg();
    }
  });

  $audio.on('song-progress', function(ev, progress) {
    if ($progressIndicator) {
      $progressIndicator.css('width', (progress * 100).toFixed(2) + '%');
    }
  });

  $albums.on('click', '.__progress', function(ev) {
    player.setTime((ev.pageX - $openedAlbum[0].getBoundingClientRect().left) / $(this).width());
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
