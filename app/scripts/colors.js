(function() {
  'use strict';

  var skyIndex = null;

  function setBg() {
    skyIndex = parseInt(Math.random() * 6, 10);
    $('.bg-layer-1').css('background-image', 'url(/images/sky' + skyIndex + '.jpg)');
    $('body').addClass('body-color-' + skyIndex);
  }

  window.colors = {
    nextBg: function() {
      if (skyIndex !== null) {
        $('body').removeClass('body-color-' + skyIndex);
        skyIndex = null;
      }

      setBg();
    }
  };

  setBg();

  // var skyz = ['27', '3v', '55', '57', '59', '7v'];

  // var bgLayer1 = document.querySelector('.bg-layer-1');


  // function getColorComponent(min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }


  // var colors = ['#FF5E5E', '#FF5EEB', '#5E8BFF', '#5EFFA9', '#FFEB5E'];
  // var colors = ['#5EFFA9', '#FF5E5E'];
  // var currColorIdx = 0;

  // function getColor() {
  //   var clr = colors[currColorIdx];
  //   currColorIdx = currColorIdx = colors.length - 1 ? 0 : currColorIdx + 1;
  //   return clr;
  //   // return '#' + getColorComponent(0, 9) + getColorComponent(0, 9) + getColorComponent(0, 9);
  // }

  // var currColor = getColor();
  // var nextColor = getColor();


  // function sweepOnce() {
  //   window.sweep(document.body, 'backgroundColor', currColor, nextColor, {
  //     direction: -1,
  //     duration: 10000
  //   });
  //   currColor = nextColor;
  //   nextColor = getColor();
  // }

  // window.setInterval(sweepOnce, 12000);
  // sweepOnce();



  // var BG_SIZE = 1320; //1383;
  // var STEP = 50;


  // var body = document.body;
  // var step = -(STEP);
  // var bgx = 0;
  // var i = 0;

  // var animate = function() {
  //   i++;

  //   bgx += step;

  //   body.style.backgroundPositionX = bgx + 'px';

  //   if (bgx <= -(BG_SIZE - window.innerWidth) || bgx >= 0) {
  //     // console.log('swap');
  //     step = -(step);
  //   }
  // };
  // window.setInterval(animate, 2000);
  // animate();



  // var animate2 = function() {
  //   bgLayer1.style.backgroundImage = 'url(/images/sky' + skyz[parseInt(Math.random() * skyz.length, 10)] + '.jpg)';
  // };



  // function getRandomSky() {
  //   return 'url(/images/sky' + skyz[parseInt(Math.random() * skyz.length, 10)] + '.jpg)';
  // }
  // var bgLayer2 = document.querySelector('.bg-layer-2');
  // var bgLayer1 = document.querySelector('.bg-layer-1');
  // var opacity = 1;
  // var switchBg = function() {
  //   bgLayer2.style.opacity = (opacity = (opacity === 1 ? 0 : 1));
  //   if (opacity === 0) {
  //     bgLayer2.style.backgroundImage = getRandomSky();
  //   } else {
  //     bgLayer1.style.backgroundImage = getRandomSky();
  //   }
  // };
  // bgLayer2.addEventListener('transitionend', function() {
  //   switchBg();
  // });
  // switchBg();



  // var opacityMin= 0.8;
  // var opacityMax = 1;
  // var opacityStep = 0.1;
  // var opacity = 1;
  // var updateOpacity = function() {
  //   body.style.opacity = (opacity = (opacity === 0.8 ? 1 : 0.8));
  // };
  // body.addEventListener('transitionend', function() {
  //   console.log('transitionend', arguments);
  //   updateOpacity();
  // });

  // window.setInterval(animate2, 2000);



  // var $crazyText = $('.crazy-text');
  // function getColorComponent(min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }
  // function setRandomColor() {
  //   var color = '#' + getColorComponent(5, 12) + getColorComponent(5, 12) + getColorComponent(5, 12);
  //   $body.css('background-color', color);
  //   $crazyText.css('color', color);
  // }
  // window.setInterval(setRandomColor, 2000);
  // setRandomColor();
})();
