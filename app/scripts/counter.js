$(function() {
  'use strict';

  var timer;
  var spinnerDigits = '';
  for (var i = 0; i < 10; i++) {
    spinnerDigits += '<div class="digit-' + i + '"></div>';
  }

  $('.digit-spinner').html(spinnerDigits);

  var LAUNCH_ISO_DATE = '2015-03-28T23:00:00.000Z';
  var launchDate = new Date(LAUNCH_ISO_DATE);

  var $hoursDigit1 = $('.hours .first-digit');
  var $hoursDigit2 = $('.hours .second-digit');
  var $minutesDigit1 = $('.minutes .first-digit');
  var $minutesDigit2 = $('.minutes .second-digit');
  var $secondsDigit1 = $('.seconds .first-digit');
  var $secondsDigit2 = $('.seconds .second-digit');

  function setDigitsValue(val, $dig1, $dig2, $dig3) {
    var dig1 = parseInt(val % 10, 10);
    var dig2 = parseInt((val % 100) / 10, 10);
    var dig3 = parseInt(val / 100, 10);

    $dig1.css('transform', 'translate3d(0,' + (-dig1 * 100) + '%,0)');
    $dig2.css('transform', 'translate3d(0,' + (-dig2 * 100) + '%,0)');
    if ($dig3) {
      $dig3.css('transform', 'translate3d(0,' + (-dig3 * 100) + '%,0)');
    }
  }

  function switchToMusic() {
    window.clearInterval(timer);
    $('.index-container').addClass('hidden');
    $('.music-container').removeClass('hidden');
  }

  function counterTick() {
    var d = Date.now();
    var ld = +launchDate;

    if (d > ld) {
      switchToMusic();
    }

    var hours = parseInt((ld - d) / (3600000), 10);
    var minutes = parseInt((ld - d) / (60000), 10) - (hours * 60);
    var seconds = parseInt((ld - d) / (1000), 10) - (hours * 3600) - (minutes * 60);

    setDigitsValue(hours, $hoursDigit1, $hoursDigit2);
    setDigitsValue(minutes, $minutesDigit1, $minutesDigit2);
    setDigitsValue(seconds, $secondsDigit1, $secondsDigit2);
  }

  timer = window.setInterval(counterTick);
  counterTick();
});
