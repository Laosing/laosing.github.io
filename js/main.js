$(function() {
"use strict";

var $btn = $('#btn-about');

var browserAnimation = new TimelineMax({ repeat: -1, paused: true});
browserAnimation
  .from('.top', .5, {y: '20px', autoAlpha: 0})
  .from('.middle', .5, {y: '20px', autoAlpha: 0}, '-=.2')
  .from('.middle .box-container', .5, {y: '20px', autoAlpha: 0}, '-=.2')
  .to('.middle-overflow', 2, {y: '-60%', ease: Back.easeOut.config(1.4), delay: .5})
  .to('.middle-overflow', 2, {y: '0%', ease: Back.easeOut.config(1.4)})
  .to('.browser', 2, {width: '300px', ease: Elastic.easeOut.config(1, 0.75), delay: .5}, 'mobile')
  .to('.box-right, .close, .back', .3, {autoAlpha: 0, display: 'none'}, 'mobile+=.5')
  .to('.searchbar', .5, {left: 0}, 'mobile+=.5')
  .to('.middle', .5, {width: '100%'}, 'mobile+=.5')
  .to('.box-container .box', .5, {width: '100%', margin: '0 0 2%'}, 'mobile+=.5')
  .to('.box-logo', .5, {margin: '0 0 10%'}, '-=2')
  .from('.mobile-menu, .mobile-more', .3, {opacity: 0}, '-=1.5')
  .from('.sidebar', .1, {autoAlpha: 0})
  .to('.middle', .4, {x: '-70%', ease: Power2.easeOut})
  .to('.middle', .4, {x: '0%', ease: Power2.easeInOut, delay: 1})
  .to('.middle-overflow', 3, {y: '-80%', ease: Back.easeOut.config(1.4), delay: .5})
  .to('.middle-overflow', 2, {y: '0%', ease: Back.easeOut.config(1.4)})
  .to('.box-container', .3, {autoAlpha: 0, y: '20px', ease: Power2.easeIn})
  .to('.middle-overflow', .3, {autoAlpha: 0, y: '20px', ease: Power2.easeIn}, '-=.1')
  .to('.top', .3, {autoAlpha: 0, y: '20px', ease: Power2.easeIn}, 'end-=.1')
  .to('.browser', 2, {maxWidth: 'initial', width: '800px', ease: Elastic.easeOut.config(1, 1)}, '-=.1');

$('.browser').css('opacity', '0');

var introAnimation = new TimelineMax({
  onComplete: function() {
    TweenLite.fromTo('.browser', .5, {opacity: 0, y: '-20px'}, {y: 0, opacity: 1, onComplete: function() {
      browserAnimation.play();
    }})
  }
});
introAnimation
  .from('.intro h2', .7, {autoAlpha: 0})
  .from('.intro h2', .5, {y: '20px'}, '-=.1')
  .from('.intro p', .5, {autoAlpha: 0, y: '-20px'}, '-=.4')
  .staggerFrom('.intro .btn', .3, {autoAlpha: 0, y: '-20px', ease: Power4.easeOut}, '.1', '-=.3');

function checkHash() {
  var hash = location.hash.replace('#','');

  switch(hash) {
    case 'about':
      setAbout();
      break;

    default:
      clearHash();
  }
}

checkHash();

function setAbout() {
  location.hash = 'about';
  // $('.about, .modal-bg').show();
  // $(this).x
  $('.about').css('display', 'block');

  var aboutAnimation = new TimelineLite();
  aboutAnimation
    .fromTo('.modal-bg', 1, {opacity: 0}, {display: 'block', autoAlpha: .9}, 'start')
    .from('.about', .3, {overflow: 'hidden', display: 'none', width: $btn.css('width'), height: $btn.css('height'), x: 0, y: 0, ease: Power4.easeInOut}, 'start')
    .from('.about-container', .5, {autoAlpha: 0, y: '20px'}, 'start+=.3')
    // .to('.about', .1, {clearProps: 'margin, width, height'})
}

function clearHash() {
  location.hash = '';
}

$('#btn-about').click(function(event) {
  event.preventDefault();
  setAbout();
});

$('.modal-bg').click(function() {
  clearHash();
  var aboutAnimationClose = new TimelineLite();
  aboutAnimationClose
    .to('.modal-bg', 1, {display: 'none', autoAlpha: 0}, 'start')
    .to('.about-container', .3, {autoAlpha: 0}, 'start')
    .fromTo('.about', .3, {overflow: 'hidden'}, {display: 'block', width: $btn.css('width'), height: $btn.css('height'), ease: Power3.easeInOut}, 'start+=.3')
    .to('.about, .about-container', .3, {opacity: 0, display: 'none', autoAlpha: 0, clearProps: 'all'}, '-=.3')
})


return;

var quotes = [
  "Did you smile today yet? My dog certainly did.",
  "Believe in yourself.<br> I don't want to be the only one who does.",
  "Looking for your full potential?<br> I'm good at hide and seek",
  "Careful. Your peers and pets are watching.",
  "Become a genius. I don't mind if your evil",
  "Challenge yourself.. And others.<br> It's good for everyone",
  "Life's short. Be a troll... Sometimes",
  "Emotions are valuable. Don't throw them.",
  "Stop being negative.<br> You're literally bringing the world down",
  "You are entering my territory. Are you ready?",
];

$('.quote').html(quotes[Math.floor(Math.random() * quotes.length)]);
TweenLite.fromTo($('.quote'), .7, {alpha: 0, y: '-20px'}, {alpha: 1, y: '0', ease: Power2.easeOut});

var aboutAnimation = new TimelineLite();
aboutAnimation.pause()
  .to($('.load'), .5, {autoAlpha: 0, y: '-40%', display: 'none', delay: 2})
  .from('.aboutAni', 1, {autoAlpha: 0, y: '20px', width: '100px', height: '20px', ease: Elastic.easeOut.config(1, 0.5)})
  .from('.text-design', .3, {autoAlpha: 0, y: '-20px', ease: Power3.easeOut})
  .from('.head', .5, {autoAlpha: 0, y:'-20px', ease: Power3.easeOut})
  .staggerFrom('.box', .5, {autoAlpha: 0, y: '-20px', ease: Power3.easeOut}, '.15', '-=.3')
  .to('.text-design', .3, {display: 'none', autoAlpha: 0, y: '20px', ease: Power3.easeIn, delay: .5})
  .to('.design', .5, {autoAlpha: 0, y: '20px', ease: Power3.easeIn, display: 'none'})
  .to('.aboutAni', 1, {scale: '.3', ease: Elastic.easeInOut.config(1, 0.75)}, '-=.5')
  .to('.aboutAni', 1, {rotation: '360deg', ease: Elastic.easeOut.config(1, 0.75)}, '-=.5')
  .to('.aboutAni', 1, {scale: '1', ease: Elastic.easeInOut.config(1, 0.75)}, '-=.75')
  .from('.text-develop', .3, {display: 'none', autoAlpha: 0, y: '-20px', ease: Power3.easeOut}, '-=.5')
  .from('.develop', .5, {autoAlpha: 0, ease: Power3.easeOut}, '-=1')
  .from('.sidebar', .5, {autoAlpha: 0, ease: Power3.easeOut, x: '-20px'}, '-=.3')
  .staggerFrom('.line', .3, {autoAlpha: 0, y: '-20px', ease: Power4.easeOut}, '.15', '-=.3')
  .to('.text-develop', .3, {display: 'none', autoAlpha: 0, y: '20px', ease: Power3.easeIn, delay: .7})
  .to('.develop', .5, {autoAlpha: 0, y: '20px', ease: Power3.easeIn}, '-=.3')
  .to('.aboutAni', 1, {borderRadius: '50%', width: '50px', height: '50px', top: '50%', y: '-50%', ease: Elastic.easeInOut.config(1, 0.75)})
  .to('.aboutAni', .3, {autoAlpha: 0}, '-=.3')


  .fromTo('.browser', 1, {autoAlpha: 0, scale: .5}, {autoAlpha: 1, scale: 1, y: '-50%', borderRadius: '50%', ease: Elastic.easeOut.config(1, 0.75)}, '-=1')
  .to('.browser', 1, {width: '100%', height: '210px', borderRadius: '5px', delay: 1, ease: Elastic.easeOut.config(1, 0.75)}, '-=.5')
  .fromTo('.text-screen', .3, {autoAlpha: 0, y: '-10px'}, {autoAlpha: 1, y: '0'}, '-=.5')
  .to('.icon', .3, {autoAlpha: 0, display: 'none', ease: Power3.easeIn})
  .fromTo('.header', .3, {autoAlpha: 0, y: '-10px'}, {autoAlpha: 1, y: '0'})
  .to('.header, .body', .3, {autoAlpha: 0, y: '10px', display: 'none', delay: 1.2})
  .to('.browser', 1, {width: '200px', ease: Elastic.easeOut.config(1, 0.75)})
  .fromTo('.tablet', .3, {autoAlpha: 0, y: '-10px'}, {autoAlpha: 1, y: '0'}, '-=.3')
  .to('.tablet', .3, {autoAlpha: 0, y: '10px', display: 'none' , delay: .7})
  .to('.browser', 1, {width: '90px', height: '160px', ease: Elastic.easeOut.config(1, 0.75)})
  .fromTo('.phone', .3, {autoAlpha: 0, y: '-10px'}, {autoAlpha: 1,   y: '0'}, '-=.5')
  .to('.text-screen', .3, {autoAlpha: 0, y: '10px', display: 'none', delay: .7})
  .fromTo('.text-web', .3, {autoAlpha: 0, y: '-10px'}, {autoAlpha: 1, y: '0'})
  .to('.phone', .3, {autoAlpha: 0, y: '10px', display: 'none'})
  .to('.body', 0, {autoAlpha: 1, y: '0', display: '', height: '100%', padding: 0})
  .to('.browser', 1, {width: '10px', height: '10px', ease: Elastic.easeInOut.config(1, 0.75)})
  .to('.browser', 1, {width: '200px', height: '200px', borderRadius: '5px', ease: Elastic.easeOut.config(1, 0.75)}, '-=.3')
  .fromTo('.heart span', .5, {autoAlpha: 0}, {autoAlpha: 1, fontSize: '100px', ease: Elastic.easeOut.config(1, 0.75)}, '-=1')
  .to('.heart', .3, {autoAlpha: 0, y: '10px', display: 'none', delay: .7})
  .to('.text-web', .3, {autoAlpha: 0, y: '10px', display: 'none'})
  .to('.browser', 1, {width: '200px', height: '60px', borderRadius: '5px', ease: Elastic.easeOut.config(1, 0.75)}, '-=.5')
  .fromTo('.more', .3, {alpha: 0, y: '-80%', display: ''}, {autoAlpha: 1, y: '-50%'})
  .to('.more', .3, {alpha: 0, y: '10px', display: 'none', delay: 1})

  .to('.browser', 0, {maxWidth: 'initial', maxHeight: 'initial'})
  .to('.browser', 1, {width: '100%', height: '100%', borderRadius: '0%', ease: Power4.easeOut})
  .to('.browser-wrap', .5, {autoAlpha: 0, display: 'none'})

  .fromTo('.about', .5, {autoAlpha: 0, y: '20px', display: 'none'}, {autoAlpha: 1, y: '0', display: ''})

aboutAnimation.seek('set');
// aboutAnimation.progress(1);

$('.skip').click(function(event) {
  event.preventDefault();
  TweenLite.to('.about', 0, {autoAlpha: 1, y: '0', display: ''});
  TweenLite.fromTo('.browser-wrap, .load', .5, {position: 'absolute'}, {scale: .9, autoAlpha: 0, display: 'none', ease: Power4.easeOut, onComplete: function() {
    aboutAnimation.progress(1);
  }});
});

$('.replay').click(function(event) {
  event.preventDefault();
  aboutAnimation.progress(0);
});

hoverClass('.about-picture', 'jello');
hoverClass('.message', 'tada');

function hoverClass(el, className) {
  $(el).hover(function() {
    $(this).addClass(className);
  }, function() {
    $(this).removeClass(className);
  });
}

$(window).resize(function() {
  $('.browser-height').height($(this).height());
})
$(window).resize();

});