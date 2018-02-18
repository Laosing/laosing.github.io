let windowResize = (() => {
  "use strict";

  $(window).resize((event) => {
    let height = $(event.currentTarget).height();
    let windowHeight = height > 450 ? height : 450;

    $('#work-container, .main, .work, .side, .about, .bg').css('height', windowHeight);
  });

  $(window).resize();

})();
