(function($) {

"use strict";

var Portfolio = function() {
  var self = this,
      _checkout = $('#checkout'),
      _main = $('.main'),
      _body = $('body'),
      _work = $('.work'),
      _close = $('.close'),
      _side = $('.side'),
      _loader = $('.load'),
      _helper = $('.helper'),
      _about = $('.about'),
      _mediaMobile = '600px';

  this.timelineArray = null;
  this.workArray = null;
  this.json = null;

  this.init = function() {
    this.setHtml();

    _checkout.click(function(event) {
      event.preventDefault();
      self.open();
      _body.addClass('open-work');
    });

    _close.add('.bg').click(function(event) {
      event.preventDefault();
      self.close();
    });

    $('.about-me').click(function(event) {
      event.preventDefault();
      self.aboutOpen();
      _body.addClass('open-about');
    });

    $('.about-close').click(function(event) {
      event.preventDefault();
      self.aboutClose();
    });

    $(document).keydown(function(e) {
      if(e.keyCode == 27) {
        if(_body.hasClass('open-about')) {
          self.aboutClose();
        } else if (_body.hasClass('open-work')) {
          self.close();
        }
      }
    });
  }

  this.open = function() {
    $('.bg').show();

    var x = this.checkMobile() ? '-100%' : '-30%';

    _main.velocity({
      left: x
    }, 'normal', 'ease', function() {
      _close.velocity('fadeIn', 'fast');

      if(self.checkMobile()) {
        return;
      } else {
        _work.velocity('fadeIn', 'normal');
      }
    });
  }

  this.close = function() {
    $('.bg').hide();

    if(!_body.hasClass('open-work')) return;
    _body.removeClass('open-work');

    if(this.checkMobile() && _work.hasClass('open')) {
      this.hide(0);

      _work
        .velocity('fadeOut')
        .removeClass('open');

      return;
    }

    _work.velocity('fadeOut', 'normal', function() {
      _main.velocity({
        left: ''
      }, 'normal', 'ease', function() {
        $('#work-container li.active')
          .removeClass('active')
          .removeAttr('style')
          .hide();

        $('.active').removeClass('active');
        _helper.removeAttr('style');

        _work.removeClass('open');
      });
    });

    _close.velocity('fadeOut', 'fast');
  }

  this.aboutOpen = function() {
    setOverflow(true, [_body, _about]);

    if(this.checkMobile()) {
      _about
        .velocity({ 'scale': 1 }, 0)
        .velocity('fadeIn', function() {
          setOverflow(false, $(this));
        });
      return;
    }

    _side.velocity({ opacity: 1 }, { display: 'none', duration: 0 });

    _main.velocity({ scale: .9 }, function() {
      _about.show().velocity({
        opacity: 1,
      }, 'linear', function() {
        setOverflow(false, _about);
      });
    });
  }

  this.aboutClose = function() {
    setOverflow(true, [_body, _about]);

    if(!_body.hasClass('open-about')) return;
    _body.removeClass('open-about');

    if(this.checkMobile()) {
      _about.velocity('fadeOut', function() {
        _body.removeAttr('style');
      });
      return;
    }

    _about.velocity({
      opacity: 0,
    }, {
      easing: 'linear',
      display: 'none',
      complete: function() {
        _main.velocity({ scale: 1 }, 'linear', function() {
          _side.velocity({ opacity: 1 }, { display: 'block' });
          _body.removeAttr('style');
        });
      }
    });
  }

  this.checkMobile = function(cb) {
    if(Modernizr.mq('only screen and (max-width: ' + _mediaMobile + ')')) {
      if(typeof cb === 'function')
        cb();

      return true;
    }
    return false;
  }

  this.setHtml = function() {
    $.getJSON('./data/portfolio.json')
      .done(function(data) {
        self.json = data;

        var workSource = $('#work-template').html(),
            workTemplate = Handlebars.compile(workSource);

        $('#work-container').html(workTemplate(data));

        var listSource = $('#list-template').html(),
            listTemplate = Handlebars.compile(listSource);

        $('#timeline').html(listTemplate(data));
      })
      .done(function() {
        self.timelineArray = $('#timeline li');
        self.workArray = $('#work-container li');

        self.setLogic();
      });
  }

  this.setLogic = function() {
    var lastIndex = this.timelineArray.length - 1;

    this.timelineArray.each(function(index, value) {
      $(value).click(function() {
        var el = $(self.workArray[index]);

        self.mainLogic(el, $(this));
      });
    });

    $('.next').click(function(event) {
      event.preventDefault();
      self.nextLogic($(this));
    });

    $('.prev').click(function(event) {
      event.preventDefault();
      self.prevLogic($(this));
    });
  }

  this.prevLogic = function(el) {
    var el = el.parent(),
        index = el.data('work'),
        prev = el.prev(),
        last = self.timelineArray.length - 1,
        timelineElIndex = index !== 0 ? index - 1 : self.workArray.length - 1,
        timelineEl = $($('#timeline li')[timelineElIndex]);

    if(index === 0)
      prev = $('#work-container li[data-work="' + last + '"]');

    self.prev(prev, timelineEl);
  }

  this.nextLogic = function(el) {
    var el = el.parent(),
        index = el.data('work'),
        next = el.next(),
        timelineElIndex = index < self.workArray.length - 1 ? index + 1 : 0,
        timelineEl = $($('#timeline li')[timelineElIndex]);

    if(index === self.workArray.length - 1)
      next = $('#work-container li[data-work="0"]');

    self.next(next, timelineEl);
  }

  this.mainLogic = function(el, timelineEl) {
    if(el.hasClass('active') || $('.velocity-animating').length) {
      return;
    } else if($('.active').length) {
      this.next(el, timelineEl);
    } else {
      _helper.velocity('fadeOut', 'fast', function() {
        self.show(el, timelineEl);
      });
    }

   if(this.checkMobile()) {
      _work.velocity('fadeIn');
    }
  }

  this.show = function(el, timelineEl) {
    el.addClass('active');
    timelineEl.addClass('active');
    _work.addClass('open');

    el
      .show()
      .velocity({
        left: '0',
        display: 'block'
      }, 'normal', 'ease');

    showImages(el);
  }

  this.hide = function(value, cb) {
    $('#work-container .active').velocity({
      left: value,
      opacity: 0
    }, 'normal', 'ease', function() {
      $('.active')
        .removeAttr('style')
        .removeClass('active');

      $(this).hide();

      if(typeof cb === 'function')
        cb();
    });
  }

  this.next = function(el, timelineEl) {
      self.hide('-200%', function() {
        el.addClass('active');
        timelineEl.addClass('active');
        _work.addClass('open');

      el
        .show()
        .velocity({
          left: '0'
        }, 'normal', 'ease');
      });

      showImages(el);
  }

  this.prev = function(el, timelineEl) {
      self.hide('100%', function() {
        el.addClass('active');
        timelineEl.addClass('active');

      el
        .velocity({
          left: '-200%',
        }, 0)
        .show()
        .velocity({
          left: '0',
        }, 'normal', 'ease');

        showImages(el);
      });
  }

  function showImages(el) {
    el.find('img.lazy').lazyload({
      effect : "fadeIn",
      container: '.work-container',
      threshold : 100
    })
  }

  function setOverflow(prop, el) {
    var prop = prop ? 'hidden' : '';

    if(el.length > 1) {
      $(el).each(function(i, val) {
        val.css({ overflow: prop });
      });
    } else {
      $(el).css({ overflow: prop });
    }
  }

};

var portfolio = new Portfolio();
portfolio.init();

var backDrop = (function() {
  var $backDrop = $('.backdrop'),
      $demoReel = $('.demo-reel'),
      $body = $('body');

  var bodyClass = 'open-demoreel';

  $demoReel.html('<iframe src="//player.vimeo.com/video/154393424" width="810" height="540" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

  var play = $('<button/>', {
    'class': 'ion-2 ion-play demo-button animate',
  }).appendTo('.main');

  play.on('click', function(event) {
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

$(window).resize(function() {
  var windowHeight = $(this).height() > 450 ? $(this).height() : 450;

  $('#work-container, .main, .work, .side, .about, .bg').css('height', windowHeight);
});

$(window).resize();

})(jQuery);