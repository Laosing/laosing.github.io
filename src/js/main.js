(function() {

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
    page('/', function() {
      self.aboutClose();
      self.close();
    });
    page('/about', function() {
      self.close();
      self.aboutOpen();
    });
    page('/work', function() {
      self.aboutClose();
      self.hide(0);
      self.open();
    });
    page('/work/:title', function(ctx, next) {
      self.aboutClose();
      var $active = $('#timeline').find(`li[data-timeline-title=${ctx.params.title}]`);
      if (_body.hasClass('open-work') && $active.hasClass('active')) return;
      self.open(function() {
        let $timelinepiece = $('#timeline').find(`li[data-timeline-title=${ctx.params.title}]`);
        let $workpiece = $('#work-container').find(`li[data-work-title=${ctx.params.title}]`);
        let index = $workpiece.data('work');
        self.mainLogic($workpiece, $timelinepiece);
      });
    });
    page({
      hashbang:true,
    });

    _checkout.click(function(event) {
      event.preventDefault();
      page('/work');
    });

    _close.add('.bg').click(function(event) {
      event.preventDefault();
      page('/');
    });

    $('#about-me').click(function(event) {
      event.preventDefault();
      page('/about');
    });

    $('.about-close').click(function(event) {
      event.preventDefault();
      page('/');
    });

    $(document).keydown(function(e) {
      if(e.keyCode == 27) {
        if(_body.hasClass('open-about') || _body.hasClass('open-work'))
          page('/');
      }
    });
  }

  this.open = function(cb) {
    $('.bg').show();

    _body.addClass('open-work');

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

      if(typeof cb === 'function') cb();
    });
  }

  this.close = function() {
    $('.bg').hide();

    if(this.checkMobile() && _work.hasClass('open')) {
      this.hide(0);

      _work
        .velocity('fadeOut')
        .removeClass('open');

      return;
    }

    if(!_body.hasClass('open-work')) return;
    _body.removeClass('open-work');

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
    _body.addClass('open-about');

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

        // Change input to hyphen-case
        Handlebars.registerHelper('hyphencase', function(title) {
          return title.replace(/\W+/g, '-').toLowerCase();
        });

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

        // Set a custom event (immediately load) on the first image of each work piece
        // I trigger this event when the user clicks on the sidebar link
        $('.work-piece').each(function(index) {
          $(this).find('img.lazy:first').lazyload({
            event: 'first' + index,
          });
        });
      })
      .done(function() {
        // After setting the html, initialize the events
        self.init();
      });
  }

  this.setLogic = function() {
    var lastIndex = this.timelineArray.length - 1;

    this.timelineArray.each(function(index, value) {
      var el = $(self.workArray[index]);

      el.find("img.lazy").lazyload({
        effect: 'fadeIn',
        container: el,
      });

      $(value).click(function() {
        let linkData = $(this).data('timeline-title');
        self.mainLogic(el, $(this), linkData);
      });
    });

    $('.next').click(function(event) {
      event.preventDefault();
      self.nextLogic($(this));

      var index = $(this).closest('.work-piece').data('work');
      index = index <= self.workArray.length - 1 ? index + 1 : 0;
    });

    $('.prev').click(function(event) {
      event.preventDefault();
      self.prevLogic($(this));

      var index = $(this).closest('.work-piece').data('work');
      index = index === 0 ? self.workArray.length - 1 : index - 1;
    });
  }

  this.prevLogic = function(el) {
    var el = el.closest('.work-piece'),
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
    var el = el.closest('.work-piece'),
        index = el.data('work'),
        next = el.next(),
        timelineElIndex = index < self.workArray.length - 1 ? index + 1 : 0,
        timelineEl = $($('#timeline li')[timelineElIndex]);

    if(index === self.workArray.length - 1)
      next = $('#work-container li[data-work="0"]');

    self.next(next, timelineEl);
  }

  this.mainLogic = function(el, timelineEl, linkData) {
    if(el.hasClass('active')) {
      return;
    } else if($('.active').length) {
      this.next(el, timelineEl, linkData);
    } else {
      _helper.velocity('fadeOut', 'fast', function() {
        self.show(el, timelineEl, linkData);
      });
    }

    if(this.checkMobile()) {
      _work.velocity('fadeIn');
    }
  }

  // Show first work animation.
  this.show = function(el, timelineEl, linkData) {
    el.find('img.lazy:first-child').trigger(`first${el.data('work')}`);

    el.addClass('active');
    timelineEl.addClass('active');
    _work.addClass('open');

    el
      .show()
      .velocity({
        left: '0',
        display: 'block'
      }, 'normal', 'ease', function() {
        if (linkData) page(`/work/${linkData}`);
      });
  }

  // Hide animation logic
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

  // Hide current work and then animate the next work animation.
  this.next = function(el, timelineEl, linkData) {
    el.find('img.lazy:first-child').trigger(`first${el.data('work')}`);

    self.hide('-200%', function() {
      el.addClass('active');
      timelineEl.addClass('active');
      _work.addClass('open');

    el
      .show()
      .velocity({
        left: '0'
      }, 'normal', 'ease', function() {
        if (linkData) page(`/work/${linkData}`);
      });
    });
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
      });
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
portfolio.setHtml();

})();
