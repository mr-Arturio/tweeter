/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweetData of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweetData);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
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
        <div class="date">${created_at}</div>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-thumbs-up"></i>
        </div>
        </footer>

      </article>
    `)
    return $tweet;
  }

  renderTweets(data);


 // add event listener for form submission
$("#form-tweet").submit(function (event) {
  console.log('hello');
  // prevent the default behaviour of the submit event
  event.preventDefault();

  // create AJAX POST request
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: $(this).serialize(), //turns a set of form data into a query string
  
    });
  });
});