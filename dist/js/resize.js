"use strict";var windowResize=($(window).resize($.debounce(250,function(e){var i=$(e.currentTarget).height();$("#work-container, .main, .work, .side, .about, .bg").css("height",i)})),void $(window).resize());