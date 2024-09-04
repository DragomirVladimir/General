$(document).ready(function () {
  $("#range_term").ionRangeSlider({
    min: 1,
    max: 12,
    grid: true,
    grid_num: 4,
    step: 1,
    prettify: function (num) {
      return num + " month";
    },
    onStart: updateProfit, // Initialize profit on start
    onChange: updateProfit,
  });

  $("#range_deposit").ionRangeSlider({
    min: 300,
    max: 15000,
    postfix: " €",
    grid: true,
    grid_num: 5,
    step: 10,
    onStart: updateProfit, // Initialize profit on start
    onChange: updateProfit,
  });

  function updateProfit() {
    const termSlider = $("#range_term").data("ionRangeSlider");
    const depositSlider = $("#range_deposit").data("ionRangeSlider");

    // Ensure the sliders have been initialized
    if (termSlider && depositSlider) {
      const term = termSlider.result.from;
      const deposit = depositSlider.result.from;

      // Define profit calculation formula
      const profit = calculateProfit(term, deposit);
      $("#counter-value").text(Math.round(profit));
    }
  }

  function calculateProfit(term, deposit) {
    // Example profit calculation: (deposit * term * 0.01) - deposit
    // Modify this formula according to your requirements
    const rate = 0.3; // Example annual interest rate
    return deposit * (Math.pow(1 + rate, term) - 1);
  }

  setTimeout(updateProfit, 100);
});
