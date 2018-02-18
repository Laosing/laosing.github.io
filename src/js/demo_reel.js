let backDrop = (() => {

  "use strict";

  let $backDrop = $('.backdrop');
  let $demoReel = $('.demo-reel');
  let $body = $('body');

  let bodyClass = 'open-demoreel';
  let play = $('#demo-reel');

  $demoReel.html('<iframe src="//player.vimeo.com/video/154393424" width="810" height="540" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

  play.on('click', function(event) {
    event.preventDefault();
    $demoReel.find('iframe').attr('src', '//player.vimeo.com/video/154393424');
    $backDrop.velocity('fadeIn');
    $body.addClass(bodyClass);
  });

  $backDrop.on('click', closeDrop);

  function closeDrop() {
    $backDrop.velocity('fadeOut');
    $body.removeClass(bodyClass);
    $demoReel.find('iframe').attr('src', '');
  }

  $(document).keydown(function(e) {
    if(e.keyCode == 27) {
      if($body.hasClass(bodyClass)) {
        closeDrop();
      }
    }
  });

})();
