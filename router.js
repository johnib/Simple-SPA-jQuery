(function ($) {
  "use strict";

  if (!$) {
    console.error("jQuery is not loaded");
    return;
  }

  // set event handler for hash change
  $(window).on('hashchange', function () {
    //TODO: implement
    console.log(window.location.hash);
  });

  $(window).on('load', function () {
    this.location.hash = $(".nav .active a")[0].getAttribute("href");
  });
})(window.jQuery);
