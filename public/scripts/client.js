/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    for (const tweetData of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweetData);
      // takes return value and prepend it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const user = tweet.user;
    const content = tweet.content;
    const created_at = tweet.created_at;
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="avatar">
          <img src="${user.avatars}" alt="User Avatar">
          <h3>${user.name}</h3>
        </div>
        <span class="handle">${user.handle}</span>
      </header>
      <div class="content">
        ${$("<p>").text(content.text).html()}
      </div>
      <footer>
        <div class="date">${timeago.format(created_at)}</div>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-thumbs-up"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  };

  // Load tweets on page load
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
        renderTweets(tweets);
      });
  };
  loadTweets();

  // Add event listener for form submission
  $("#form-tweet").submit(function (event) {
    // Prevent the default behaviour of the submit event
    event.preventDefault();

    const tweetContent = $("#tweet-text").val();
    // Slide up the error message if it's visible
    $('.error:visible').slideUp();

    // Check if the tweet content is empty or exceeds 140 characters
    if (!tweetContent) {
      $('.error')
        .text("⚠ Error: tweet content is empty ⚠")
        .slideDown();
    } else if (tweetContent.length > 140) {
      $('.error')
        .text("⚠ Error: tweet content exceeds 140 characters ⚠")
        .slideDown();
    } else {
      // Create AJAX POST request
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize(), //turns a set of form data into a query string
        success: function () {
          loadTweets();

          // Clear the tweet text area
          $("#tweet-text").val("");
          // reset count to 140
          $('.counter').text('140');

        }
      });
    }

  });
});