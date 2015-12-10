$(function() {
  "use strict";

  var introAnimation = new TimelineMax({
    onComplete: function() {
      TweenLite.fromTo('.browser', .5, {opacity: 0, y: '-20px'}, {y: 0, opacity: 1, onComplete: function() {}
      })
    }
  });
  introAnimation
    .from('#home h2', .7, {autoAlpha: 0})
    .from('#home h2', .5, {y: '20px', clearProps:'all'}, '-=.1')
    .from('#home p', .5, {autoAlpha: 0, y: '-20px', clearProps:'all'}, '-=.4')
    .staggerFrom('#home .btn', .3, {autoAlpha: 0, y: '-20px', ease: Power4.easeOut, clearProps:'all'}, '.1', '-=.3')
    .staggerFrom('.nav a', .3, {autoAlpha: 0, y: '-20px', ease: Power4.easeOut, clearProps:'all'}, '.1', '-=.1');

  // Smooth Scroll
  function scrollTo(el) {
    TweenLite.to(window, 1, {scrollTo:{y: $("#" + el).offset().top}, ease:Power4.easeInOut});
  }

  var $nav = $('.nav a');
  var $bg = $('.bg2');
  var $body = $('body');
  // Scroll events
  $(document).scroll(function(e) {
    // Background animation trick
    $bg.css('opacity', window.pageYOffset / ($(this).height() - $(window).height()));

    $('section').each(function() {
      // Set active nav on scroll
      var distance = window.pageYOffset - $(this).offset().top;
      if(distance < 30 && distance > -30) {
        $nav
          .removeClass('active')
          .filter($('[href=#' + $(this).attr('id') + ']'))
          .addClass('active');
      }
    });
  });

  // Click events
  $("#home a.btn, .nav a").on('click', function(event) {
    event.preventDefault();
    history.pushState(null, null, $(this).attr('href'));

    var hash = $(this).attr('href').slice(1);
    scrollTo(hash);
  });

});