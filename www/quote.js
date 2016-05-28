(function ($) {
  if (!$) {
    console.error("jQuery is not loaded");
    return;
  }

  $.get('/quotes/random')
    .done(function (res) {
      $("#quote")[0].innerHTML = res;
    })
})(window.jQuery);