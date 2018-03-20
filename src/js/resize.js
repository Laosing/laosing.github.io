let windowResize = (() => {
  "use strict";

  $(window).resize($.debounce(250, function(event) {
    let height = $(event.currentTarget).height();
    let windowHeight = height > 450 ? height : 450;

    $('#work-container, .main, .work, .side, .about, .bg').css('height', windowHeight);
  }));

  $(window).resize();

})();
