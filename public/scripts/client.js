/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  const data = [];

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweetData of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweetData);
      // takes return value and appends it to the tweets container
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
        <p>${content.text}</p>
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

  renderTweets(data);


  // add event listener for form submission
  $("#form-tweet").submit(function (event) {
    console.log('hello');
    // prevent the default behaviour of the submit event
    event.preventDefault();

    const tweetContent = $("#tweet-text").val();

    // check if the tweet content is empty or exceeds 140 characters
    if (!tweetContent || tweetContent.length > 140) {
      // display an error message using browser alert
      if (!tweetContent) {
        alert("Error: tweet content is empty");
      } else {
        alert("Error: tweet content exceeds 140 characters");
      }
      return;
    }

    // create AJAX POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(), //turns a set of form data into a query string
      success: function (tweetData) {
        // clear the tweet text area
        $("#tweet-text").val("");
        // create a new tweet element and prepend it to the tweets container
        const $tweet = createTweetElement(tweetData);
        $('#tweets-container').prepend($tweet);
      }
    });


    const loadTweets = function () {

      $.ajax('/tweets', { method: 'GET' })
        .then(function (tweets) {
          renderTweets(tweets);
        });
    };

    loadTweets();

  });
});