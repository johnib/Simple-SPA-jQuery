"use strict";
(function ($) {
  if (!$) {
    console.error("jQuery is not loaded");
    return;
  }

  var viewsRoot = "views/";
  var cache = {};
  var viewElement = $("#view")[0];
  var defaultHash = $.find(".nav .active a")[0].getAttribute("href");
  var authHashes = ['#calculator'];
  window.authenticated = false;

  function authRequired(hash) {
    return $.inArray(hash, authHashes) > -1;
  }

  /**
   * Updates the view with the html snippet downloaded using Ajax request.
   * Caches the view contents for later use.
   *
   * @param hash the view's hash
   */
  function updateView(hash) {
    if (cache[hash]) {
      viewElement.innerHTML = cache[hash];
      require();
      return;
    }
    var fileName = viewsRoot.concat(hash.substr(1), ".html");

    if (!authRequired(hash) || window.authenticated) {
      $.ajax(fileName)
        .done(function (data) {
          viewElement.innerHTML = data;
          cache[hash] = data;
          require();
        });
    } else {
      window.lastView = window.location.hash;
      window.location.hash = "login";
    }

    console.log(fileName);
  }

  /**
   * Require dependencies scripts for the given HTML snippet.
   * HTML snippet.
   */
  function require() {
    $("#view").find("script").each(function (index, dep) {
      var src = dep.getAttribute("src");
      if (src) {
        $.getScript(src);
      }
    });
  }

  // event handler for nav bar view change
  $(".nav a").on("click", function () {
    $("nav .active").removeClass("active");
    $(this).parent().addClass("active");
  });

  // set event handler for hash change
  $(window).on('hashchange', function () {
    if (!window.location.hash) {
      window.location.hash = defaultHash;
      return;
    }

    updateView(window.location.hash);
  });

  $(window).on('load', function () {
    // user requested specific view
    if (this.location.hash) {
      var el = $.find(".nav a[href='".concat(this.location.hash, "']"))[0];
      el.click();
      $(this).trigger('hashchange');

    } else {
      this.location.hash = defaultHash;
    }
  });
})(window.jQuery);