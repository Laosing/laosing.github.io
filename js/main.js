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
  // Scroll events
  $(document).scroll(function(e) {
    $('section').each(function() {
      // Set hash on scroll
      var distance = window.pageYOffset - $(this).offset().top;
      var hash = $(this).attr('href');
      if(distance < 30 && distance > -30 && window.location.hash != hash) {
        history.pushState(null, null, '#' + $(this).attr('id'));
      }

      // Set active class on nav
      if(window.location.hash === '#' + $(this).attr('id')) {
        $nav.removeClass('active');
        $nav.filter($('[href=#' + $(this).attr('id') + ']')).addClass('active');
      }
    });
  });

  // Click events
  $("#home a.btn, .nav a").on('click', function(event) {
    event.preventDefault();
    var hash = $(this).get(0).hash.slice(1);
    scrollTo(hash);
  });

});