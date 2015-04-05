(function() {
  'use strict';
  var audioEl = window.audioEl = document.querySelector('audio');
  var $audioEl = $(audioEl);
  var songs = [];
  var currSongIndex = -1;
  var playbackTimer;
  var currSongDuration;
  var isPlaying = false;

  function startPlaybackTimer() {
    currSongDuration = songs[currSongIndex].duration || audioEl.duration;

    $audioEl.trigger('song-progress', audioEl.currentTime / currSongDuration);
    playbackTimer = window.setInterval(function() {
      var progress = audioEl.currentTime / currSongDuration;
      $audioEl.trigger('song-progress', progress);
      if (Math.round(audioEl.currentTime) >= currSongDuration) {
        next();
      }
    }, 500);
  }

  function stopPlaybackTimer() {
    currSongDuration = 0;
    window.clearInterval(playbackTimer);
  }

  function setSongs(newSongs) {
    stop();
    songs = newSongs;
  }

  function play() {
    if (currSongIndex === -1 && songs.length > 0) {
      currSongIndex = 0;
      audioEl.src = songs[currSongIndex].src;
    }

    audioEl.play();
    isPlaying = true;
    startPlaybackTimer();
    $audioEl.trigger('song-play', currSongIndex);
  }

  function pause() {
    audioEl.pause();
    isPlaying = false;
    stopPlaybackTimer();
    $audioEl.trigger('song-pause', currSongIndex);
  }

  function stop() {
    $audioEl.trigger('song-progress', 0);
    pause();
  }

  function playCurrentSong() {
    pause();
    audioEl.src = songs[currSongIndex].src;
    play();
  }

  function playSong(index) {
    if (songs[index] && !(index === currSongIndex && isPlaying)) {
      if (currSongIndex !== index) {
        currSongIndex = index;
        audioEl.src = songs[currSongIndex].src;
      }
      play();
    }
  }

  function next() {
    if (currSongIndex < songs.length - 1) {
      stop();
      currSongIndex++;
      playCurrentSong();
    }
  }

  function previous() {
    if (currSongIndex > 0) {
      stop();
      currSongIndex--;
      playCurrentSong();
    }
  }

  function reset() {
    stop();
    audioEl.src = '';
    currSongIndex = -1;
    songs = [];
    $audioEl.trigger('pause');
  }

  function setTime(timePercentage) {
    audioEl.currentTime = timePercentage * currSongDuration;
  }

  window.player = {
    setSongs: setSongs,
    play: play,
    playSong: playSong,
    pause: pause,
    next: next,
    previous: previous,
    setTime: setTime,
    reset: reset
  };
})();
