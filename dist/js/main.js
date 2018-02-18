"use strict";!function(e){var t=function(){function t(t,i){var t=t?"hidden":"";i.length>1?e(i).each(function(e,i){i.css({overflow:t})}):e(i).css({overflow:t})}var i=this,o=e("#checkout"),n=e(".main"),a=e("body"),l=e(".work"),c=e(".close"),s=e(".side"),r=(e(".load"),e(".helper")),f=e(".about"),h="600px";this.timelineArray=null,this.workArray=null,this.json=null,this.init=function(){this.setHtml(),o.click(function(e){e.preventDefault(),i.open()}),c.add(".bg").click(function(e){e.preventDefault(),i.close()}),e("#about-me").click(function(e){e.preventDefault(),i.aboutOpen()}),e(".about-close").click(function(e){e.preventDefault(),i.aboutClose()}),e(document).keydown(function(e){27==e.keyCode&&(a.hasClass("open-about")?i.aboutClose():a.hasClass("open-work")&&i.close())})},this.open=function(){e(".bg").show(),a.addClass("open-work");var t=this.checkMobile()?"-100%":"-30%";n.velocity({left:t},"normal","ease",function(){c.velocity("fadeIn","fast"),i.checkMobile()||l.velocity("fadeIn","normal")})},this.close=function(){return e(".bg").hide(),this.checkMobile()&&l.hasClass("open")?(this.hide(0),void l.velocity("fadeOut").removeClass("open")):void(a.hasClass("open-work")&&(a.removeClass("open-work"),l.velocity("fadeOut","normal",function(){n.velocity({left:""},"normal","ease",function(){e("#work-container li.active").removeClass("active").removeAttr("style").hide(),e(".active").removeClass("active"),r.removeAttr("style"),l.removeClass("open")})}),c.velocity("fadeOut","fast")))},this.aboutOpen=function(){return t(!0,[a,f]),a.addClass("open-about"),this.checkMobile()?void f.velocity({scale:1},0).velocity("fadeIn",function(){t(!1,e(this))}):(s.velocity({opacity:1},{display:"none",duration:0}),void n.velocity({scale:.9},function(){f.show().velocity({opacity:1},"linear",function(){t(!1,f)})}))},this.aboutClose=function(){if(t(!0,[a,f]),a.hasClass("open-about"))return a.removeClass("open-about"),this.checkMobile()?void f.velocity("fadeOut",function(){a.removeAttr("style")}):void f.velocity({opacity:0},{easing:"linear",display:"none",complete:function(){n.velocity({scale:1},"linear",function(){s.velocity({opacity:1},{display:"block"}),a.removeAttr("style")})}})},this.checkMobile=function(e){return!!Modernizr.mq("only screen and (max-width: "+h+")")&&("function"==typeof e&&e(),!0)},this.setHtml=function(){e.getJSON("./data/portfolio.json").done(function(t){i.json=t;var o=e("#work-template").html(),n=Handlebars.compile(o);e("#work-container").html(n(t));var a=e("#list-template").html(),l=Handlebars.compile(a);e("#timeline").html(l(t))}).done(function(){i.timelineArray=e("#timeline li"),i.workArray=e("#work-container li"),i.setLogic(),e(".work-piece").each(function(t){e(this).find("img.lazy:first").lazyload({event:"first"+t})})})},this.setLogic=function(){function t(e){e.find("img.lazy").lazyload({effect:"fadeIn",container:e})}function o(t){e("img.lazy").trigger("first"+t)}this.timelineArray.length-1;this.timelineArray.each(function(n,a){var l=e(i.workArray[n]);e(a).click(function(){i.mainLogic(l,e(this)),o(n)}),t(l)}),e(".next").click(function(t){t.preventDefault(),i.nextLogic(e(this));var n=e(this).closest(".work-piece").data("work");n=n<=i.workArray.length-1?n+1:0,o(n)}),e(".prev").click(function(t){t.preventDefault(),i.prevLogic(e(this));var n=e(this).closest(".work-piece").data("work");n=0===n?i.workArray.length-1:n-1,o(n)})},this.prevLogic=function(t){var t=t.closest(".work-piece"),o=t.data("work"),n=t.prev(),a=i.timelineArray.length-1,l=0!==o?o-1:i.workArray.length-1,c=e(e("#timeline li")[l]);0===o&&(n=e('#work-container li[data-work="'+a+'"]')),i.prev(n,c)},this.nextLogic=function(t){var t=t.closest(".work-piece"),o=t.data("work"),n=t.next(),a=o<i.workArray.length-1?o+1:0,l=e(e("#timeline li")[a]);o===i.workArray.length-1&&(n=e('#work-container li[data-work="0"]')),i.next(n,l)},this.mainLogic=function(t,o){t.hasClass("active")||e(".velocity-animating").length||(e(".active").length?this.next(t,o):r.velocity("fadeOut","fast",function(){i.show(t,o)}),this.checkMobile()&&l.velocity("fadeIn"))},this.show=function(e,t){e.addClass("active"),t.addClass("active"),l.addClass("open"),e.show().velocity({left:"0",display:"block"},"normal","ease")},this.hide=function(t,i){e("#work-container .active").velocity({left:t,opacity:0},"normal","ease",function(){e(".active").removeAttr("style").removeClass("active"),e(this).hide(),"function"==typeof i&&i()})},this.next=function(e,t){i.hide("-200%",function(){e.addClass("active"),t.addClass("active"),l.addClass("open"),e.show().velocity({left:"0"},"normal","ease")})},this.prev=function(e,t){i.hide("100%",function(){e.addClass("active"),t.addClass("active"),e.velocity({left:"-200%"},0).show().velocity({left:"0"},"normal","ease")})}},i=new t;i.init()}(jQuery);