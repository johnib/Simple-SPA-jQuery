(function ($, md5) {
  if (!$ || !md5) {
    console.log("error loading deps");
  }

  function authenticate(credentials) {
    console.log(credentials);
    $.ajax('/login', {
      method: 'POST',
      data: JSON.stringify(credentials),
      dataType: 'json',
      contentType: "application/json; charset=utf-8"
    }).done(function (res) {
      console.log(res);
    })
  }

  $('#loginForm').submit(function () {
    var formControls = $("#loginForm").find(".form-control"),
      credentials = {
        username: md5(formControls[0].value),
        password: md5(formControls[1].value)
      };

    authenticate(credentials);
  });
})(window.jQuery, md5);