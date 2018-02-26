(function() {
"use strict";

var Portfolio = function() {
  var self = this,
      _main = $('.main'),
      _body = $('body'),
      _work = $('.work'),
      _close = $('.close'),
      _side = $('.side'),
      _helper = $('.helper'),
      _about = $('.about'),
      _workContainer = $('#work-container'),
      _timeline = $('#timeline'),
      _bg = $('.bg'),
      _mediaMobile = '600px';

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
      if(self.checkMobile()) {
        self.close();
      } else {
        self.hide(0);
      }
      if (!_body.hasClass('open-work')) {
        self.open();
      }
    });
    page('/work/:title', function(ctx) {
      self.aboutClose();
      let $active = _timeline.find(`li[data-timeline-title=${ctx.params.title}]`);
      if (_body.hasClass('open-work') && $active.hasClass('active')) return;
      self.open(function() {
        let $timelinepiece = _timeline.find(`li[data-timeline-title=${ctx.params.title}]`);
        let $workpiece = _workContainer.find(`li[data-work-title=${ctx.params.title}]`);
        self.next('next', $workpiece, $timelinepiece);
      });
    });
    page({
      hashbang:true,
    });

    $('#checkout').click(function(event) {
      event.preventDefault();
      page('/work');
    });

    _close.add(_bg).click(function(event) {
      event.preventDefault();
      if(self.checkMobile() && _work.hasClass('open')) {
        page('/work');
      } else {
        page('/');
      }
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

    // Tippy.js tooltips
    tippy('[title]');

    // Scroll to top button
    $('.backtotop').on('click', function(event) {
      event.preventDefault();
      let $container = $(this).parents('.work-piece.active');
      $(this).velocity('scroll', {
        container: $container,
        duration: 2000,
        offset: -$container[0].scrollHeight,
        easing: 'easeInOutCubic'
      });
    });
  }

  this.open = function(cb) {
    if(!self.checkMobile()) _bg.show();

    if (_body.hasClass('open-work')) {
      if(typeof cb === 'function') cb();
      return;
    }

    _body.addClass('open-work');
    _main.velocity({
      left: this.checkMobile() ? '-100%' : '-30%'
    }, 'normal', 'ease', function() {
      _close.velocity('fadeIn', 'fast');

      if(!self.checkMobile()) {
        _work.velocity('fadeIn', 'normal');
      }

      if(typeof cb === 'function') cb();
    });
  }

  this.close = function() {
    _bg.velocity('fadeOut', function() {
      $(this).removeAttr('style');
    });

    if(this.checkMobile() && _work.hasClass('open')) {
      self.hide(0);

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
        _workContainer.find('li.active')
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

  this.checkMobile = function() {
    if(Modernizr.mq('only screen and (max-width: ' + _mediaMobile + ')')) {
      return true;
    }
    return false;
  }

  this.setHtml = function() {
    $.getJSON('./data/portfolio.json')
      .fail(function() { alert("Sorry, this site is currently down. Please blame the developer and try again later. :("); })
      .done(function(data) {
        self.json = data;

        // Change input to hyphen-case
        Handlebars.registerHelper('hyphencase', function(title) {
          return title.replace(/\W+/g, '-').toLowerCase();
        });

        var workSource = $('#work-template').html(),
            workTemplate = Handlebars.compile(workSource);

        _workContainer.html(workTemplate(data));

        var listSource = $('#list-template').html(),
            listTemplate = Handlebars.compile(listSource);

        _timeline.html(listTemplate(data));
      })
      .done(function() {
        self.timelineArray = _timeline.find('li');
        self.workArray = _workContainer.find('li');

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
        // Don't do anything if something is currently animating.
        // Fixes bug when you click on multiple items at the same time.
        if (!$('.velocity-animating').length) self.next('next', el, $(this), true);
      });
    });

    $('.next').click(function(event) {
      event.preventDefault();
      self.nextLogic($(this), 'next');
    });

    $('.prev').click(function(event) {
      event.preventDefault();
      self.nextLogic($(this), 'prev');
    });
  }

  this.nextLogic = function(el, direction) {
    el = el.closest('.work-piece');
    let index = el.data('work');
    let last = self.timelineArray.length - 1;
    let nextElement = direction === 'next' ? el.next() : el.prev();
    let nextTimelineElIndex = index < self.workArray.length - 1 ? index + 1 : 0;
    let prevTimelineElIndex = index !== 0 ? index - 1 : self.workArray.length - 1;
    let timelineElIndex = direction === 'next' ? nextTimelineElIndex : prevTimelineElIndex;
    let timelineEl = $(_timeline.find('li')[timelineElIndex]);

    // Going next on the last workpiece, go to the first workpiece
    if(direction === 'next' && index === self.workArray.length - 1)
      nextElement = _workContainer.find('li[data-work="0"]');

    // Going previous on the first workpiece, go to the last workpiece
    if(direction === 'prev' && index === 0)
      nextElement = _workContainer.find('li[data-work="' + last + '"]');

    self.next(direction, nextElement, timelineEl, true);
  }

  // Hide animation for whatever is currently active
  this.hide = function(value, cb) {
    _workContainer.find('.active').velocity({
      left: value,
      opacity: 1
    }, 'normal', 'ease', function() {
      $('.active')
        .removeAttr('style')
        .removeClass('active');

      $(this).hide();

      if(typeof cb === 'function')
        cb();
    });
  }

  // Animate the next active workpiece in
  this.next = function(direction, el, timelineEl, setURL) {
    if (el.hasClass('active')) return;

    if (this.checkMobile()) {
      _work.velocity('fadeIn', { duration: 0 });
      _helper.hide();
    }

    el.find('img.lazy:first-child').trigger(`first${el.data('work')}`);

    if ($('.active').length) {
      let directionLeft = direction === 'next' ? '-200%' : '100%';
      self.hide(directionLeft, animateIn);
    } else {
      animateIn();
    }

    function animateIn() {
      el.addClass('active');
      timelineEl.addClass('active');
      _work.addClass('open');

      if (direction === 'prev') {
        el.velocity({
          left: '-200%',
        }, 0);
      }

      el
        .show()
        .velocity({
          left: 0
        }, 'normal', 'ease', function() {
          if (setURL) page(`/work/${el.data('work-title')}`);
        });
    }
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
