$(document).ready(function () {
  console.log("The DOM is ready to be manipulated.");

  const $tweetText = $('.new-tweet textarea');
  const $charCounter = $('.new-tweet .counter');

  $tweetText.on('input', function () {
    const charsLeft = 140 - $(this).val().length;
    $charCounter.text(charsLeft);

    if (charsLeft < 0) {
      $charCounter.css('color', 'red');
    } else {
      $charCounter.css('color', '');
    }
  });
});