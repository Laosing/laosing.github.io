$(function() {
"use strict";

var $btn = $('#btn-about');

$('.browser').css('opacity', '0');

var introAnimation = new TimelineMax({
  onComplete: function() {
    TweenLite.fromTo('.browser', .5, {opacity: 0, y: '-20px'}, {y: 0, opacity: 1, onComplete: function() {}
    })
  }
});
introAnimation
  .from('.intro h2', .7, {autoAlpha: 0})
  .from('.intro h2', .5, {y: '20px'}, '-=.1')
  .from('.intro p', .5, {autoAlpha: 0, y: '-20px'}, '-=.4')
  .staggerFrom('.intro .btn', .3, {autoAlpha: 0, y: '-20px', ease: Power4.easeOut}, '.1', '-=.3');

function setHash(hash) {
  var hash = hash || location.hash.replace('#','');
  location.hash = hash;
  if(hash) {
    $('html, body').stop().animate({
      scrollTop: $("." + hash).position().top
    }, 1000);
  }
}
setHash();

$("#btn-about").on('click', function(event) {
  event.preventDefault();

  setHash('about');
});

$("#btn-work").on('click', function(event) {
  event.preventDefault();

  setHash('work');
});

});