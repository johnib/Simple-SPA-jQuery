(function ($) {
  if (!$) {
    console.error("this module depends on jQuery");
    return;
  }

  if (window.authenticated.status) {
    $.ajax('/calc/value')
      .done(function (res) {
        debugger;
        if (res) {
          var value = JSON.parse(res).last;
          updateResultWith(value);
        }
      })
  }

  // ignore non-digits keystrokes
  $("#calculator").on("keypress", function (e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  });

  $("#operators").click(function (e) {
    var operand = e.target.textContent,
      values = getValues(),
      calcValue;

    switch (operand) {
      case '+':
        calcValue = sum(values.numerator, values.denominator);
        break;
      case '-':
        calcValue = subtract(values.numerator, values.denominator);
        break;
      case '/':
        calcValue = divide(values.numerator, values.denominator);
        break;
      case '*':
        calcValue = multiply(values.numerator, values.denominator);
    }

    updateResultWith(calcValue);
    updateServerWithResult(calcValue);
  });

  function getValues() {
    var numerator = Number($("#numerator")[0].value) || 0;
    var denominator = Number($("#denominator")[0].value) || 0;

    return {numerator: numerator, denominator: denominator};
  }

  function updateServerWithResult(result) {
    $.ajax({
      url: '/calc/value/' + result,
      method: 'POST'
    }).fail(function (err) {
      console.log(err);
    });
  }

  function updateResultWith(result) {
    $("#calculator-result")[0].value = result;
  }

  function sum(numerator, denominator) {
    return numerator + denominator;
  }

  function subtract(numerator, denominator) {
    return numerator - denominator;
  }

  function divide(numerator, denominator) {
    return numerator / denominator;
  }

  function multiply(numerator, denominator) {
    return numerator * denominator;
  }

})(window.jQuery);
