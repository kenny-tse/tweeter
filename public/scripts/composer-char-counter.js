$(document).ready(function () {
  // --- our code goes here ---
  const maxOfCharacters = 140;

  $(".text-area").on("input", function (e) {

    let letterCounterClass = $(this).closest(".new-tweet").find(".counter");

    numberOfCharacters = maxOfCharacters - $(this).val().length;

    if (numberOfCharacters < 0) {
      letterCounterClass.addClass("warning");
    }

    if (numberOfCharacters >= 0) {
      letterCounterClass.removeClass("warning");
    }

    // can use -> let $numberToShow = $(".counter"); but bad practice?
    let $numberToShow = $(letterCounterClass);
    $numberToShow.val(numberOfCharacters);

  });
});