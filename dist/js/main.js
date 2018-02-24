"use strict";(new function(){var e=this,t=$(".main"),i=$("body"),o=$(".work"),n=$(".close"),a=$(".side"),l=$(".helper"),c=$(".about"),s=$("#work-container"),r=$("#timeline"),f=$(".bg");function u(e,t){e=e?"hidden":"",t.length>1?$(t).each(function(t,i){i.css({overflow:e})}):$(t).css({overflow:e})}this.init=function(){page("/",function(){e.aboutClose(),e.close()}),page("/about",function(){e.close(),e.aboutOpen()}),page("/work",function(){e.aboutClose(),e.checkMobile()?e.close():e.hide(0),i.hasClass("open-work")||e.open()}),page("/work/:title",function(t){e.aboutClose();var o=r.find("li[data-timeline-title="+t.params.title+"]");i.hasClass("open-work")&&o.hasClass("active")||e.open(function(){var i=r.find("li[data-timeline-title="+t.params.title+"]"),o=s.find("li[data-work-title="+t.params.title+"]");e.next("next",o,i)})}),page({hashbang:!0}),$("#checkout").click(function(e){e.preventDefault(),page("/work")}),n.add(f).click(function(t){t.preventDefault(),e.checkMobile()&&o.hasClass("open")?page("/work"):page("/")}),$("#about-me").click(function(e){e.preventDefault(),page("/about")}),$(".about-close").click(function(e){e.preventDefault(),page("/")}),$(document).keydown(function(e){27==e.keyCode&&(i.hasClass("open-about")||i.hasClass("open-work"))&&page("/")}),tippy("[title]"),$(".backtotop").on("click",function(e){e.preventDefault();var t=$(this).parents(".work-piece.active");$(this).velocity("scroll",{container:t,duration:2e3,offset:-t[0].scrollHeight,easing:"easeInOutCubic"})})},this.open=function(a){e.checkMobile()||f.show(),i.hasClass("open-work")?"function"==typeof a&&a():(i.addClass("open-work"),t.velocity({left:this.checkMobile()?"-100%":"-30%"},"normal","ease",function(){n.velocity("fadeIn","fast"),e.checkMobile()||o.velocity("fadeIn","normal"),"function"==typeof a&&a()}))},this.close=function(){if(f.velocity("fadeOut",function(){$(this).removeAttr("style")}),this.checkMobile()&&o.hasClass("open"))return e.hide(0),void o.velocity("fadeOut").removeClass("open");i.hasClass("open-work")&&(i.removeClass("open-work"),o.velocity("fadeOut","normal",function(){t.velocity({left:""},"normal","ease",function(){s.find("li.active").removeClass("active").removeAttr("style").hide(),$(".active").removeClass("active"),l.removeAttr("style"),o.removeClass("open")})}),n.velocity("fadeOut","fast"))},this.aboutOpen=function(){u(!0,[i,c]),i.addClass("open-about"),this.checkMobile()?c.velocity({scale:1},0).velocity("fadeIn",function(){u(!1,$(this))}):(a.velocity({opacity:1},{display:"none",duration:0}),t.velocity({scale:.9},function(){c.show().velocity({opacity:1},"linear",function(){u(!1,c)})}))},this.aboutClose=function(){u(!0,[i,c]),i.hasClass("open-about")&&(i.removeClass("open-about"),this.checkMobile()?c.velocity("fadeOut",function(){i.removeAttr("style")}):c.velocity({opacity:0},{easing:"linear",display:"none",complete:function(){t.velocity({scale:1},"linear",function(){a.velocity({opacity:1},{display:"block"}),i.removeAttr("style")})}}))},this.checkMobile=function(){return!!Modernizr.mq("only screen and (max-width: 600px)")},this.setHtml=function(){$.getJSON("./data/portfolio.json").done(function(t){e.json=t,Handlebars.registerHelper("hyphencase",function(e){return e.replace(/\W+/g,"-").toLowerCase()});var i=$("#work-template").html(),o=Handlebars.compile(i);s.html(o(t));var n=$("#list-template").html(),a=Handlebars.compile(n);r.html(a(t))}).done(function(){e.timelineArray=r.find("li"),e.workArray=s.find("li"),e.setLogic(),$(".work-piece").each(function(e){$(this).find("img.lazy:first").lazyload({event:"first"+e})})}).done(function(){e.init()})},this.setLogic=function(){this.timelineArray.length,this.timelineArray.each(function(t,i){var o=$(e.workArray[t]);o.find("img.lazy").lazyload({effect:"fadeIn",container:o}),$(i).click(function(){$(".velocity-animating").length||e.next("next",o,$(this),!0)})}),$(".next").click(function(t){t.preventDefault(),e.nextLogic($(this),"next")}),$(".prev").click(function(t){t.preventDefault(),e.nextLogic($(this),"prev")})},this.nextLogic=function(t,i){var o=(t=t.closest(".work-piece")).data("work"),n=e.timelineArray.length-1,a="next"===i?t.next():t.prev(),l=o<e.workArray.length-1?o+1:0,c=0!==o?o-1:e.workArray.length-1,f="next"===i?l:c,u=$(r.find("li")[f]);"next"===i&&o===e.workArray.length-1&&(a=s.find('li[data-work="0"]')),"prev"===i&&0===o&&(a=s.find('li[data-work="'+n+'"]')),e.next(i,a,u,!0)},this.hide=function(e,t){s.find(".active").velocity({left:e,opacity:1},"normal","ease",function(){$(".active").removeAttr("style").removeClass("active"),$(this).hide(),"function"==typeof t&&t()})},this.next=function(t,i,n,a){if(!i.hasClass("active"))if(this.checkMobile()&&(o.velocity("fadeIn",{duration:0}),l.hide()),i.find("img.lazy:first-child").trigger("first"+i.data("work")),$(".active").length){var c="next"===t?"-200%":"100%";e.hide(c,s)}else s();function s(){i.addClass("active"),n.addClass("active"),o.addClass("open"),"prev"===t&&i.velocity({left:"-200%"},0),i.show().velocity({left:0},"normal","ease",function(){a&&page("/work/"+i.data("work-title"))})}}}).setHtml();