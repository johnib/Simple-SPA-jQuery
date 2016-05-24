(function ($) {
  console.log("calculator initialized");

  if (!$) {
    console.error("this module depends on jQuery");
    return;
  }

  // ignore non-digits keystrokes
  $("#calculator").on("keypress", function (e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  });

  $("#operators").click(function (e) {
    var operand = e.target.textContent,
        values = getValues();

    switch (operand) {
      case '+':
        updateResultWith(sum(values.numerator, values.denominator));
        break;
      case '-':
        updateResultWith(subtract(values.numerator, values.denominator));
        break;
      case '/':
        updateResultWith(divide(values.numerator, values.denominator));
        break;
      case '*':
        updateResultWith(multiply(values.numerator, values.denominator));
    }
  });

  function getValues() {
    var numerator = Number($("#numerator")[0].value) || 0;
    var denominator = Number($("#denominator")[0].value) || 0;

    return {numerator: numerator, denominator: denominator};
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
