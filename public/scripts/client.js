/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
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
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet in tweets) {

      $('#tweets-container').append(createTweetElement(tweets[tweet]));
    }
  }

  const createTweetElement = function (tweet) {

    let $tweet = $(`<article class="individual-tweet"></article>`);
    let $tweetHeader = $(`<h3 class="individual-tweet-header"></h3>`);

    let $profilePicture = $(`<img class="profile-picture" src=${tweet.user.avatars}></img>`);
    let $firstName = $(`<div class= "first-name" > ${tweet.user.name}</div>`);
    let $personHandle = $(`<div class= "person-handle" >${tweet.user.handle}</div> `);

    $tweetHeader.append($profilePicture);
    $tweetHeader.append($firstName);
    $tweetHeader.append($personHandle);
    $tweet.append($tweetHeader);

    let $textArea = $(`<textarea class="tweet-thoughts">${tweet.content.text}</textarea>`)
    $tweet.append($textArea);

    let $footer = $(`<footer class="individual-tweet-footer"></footer>`)

    let $date = $(`<div class="date">10 Days ago</div>`);
    let $tweetIcons = $(`<div class="tweet-icons">`)

    let $flagIcon = $(`<i class="fas fa-flag"></i>`);
    let $retweetIcon = $(`<i class="fas fa-retweet"></i>`);
    let $heartIcon = $(`<i class="fas fa-heart"></i>`);

    $tweetIcons.append($flagIcon);
    $tweetIcons.append($retweetIcon);
    $tweetIcons.append($heartIcon);

    $footer.append($date);
    $footer.append($tweetIcons);

    $tweet.append($footer);

    return $tweet;
  }

  const loadTweets = function () {

    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    }).then((data) => {

      renderTweets(data);

    })
  }

  loadTweets();

  $("form").on("submit", function (event) {

    event.preventDefault();

    let url = "http://localhost:8080/tweets/"
    let queryString = $("form").serialize();

    $.ajax({
      url: url,
      method: "POST",
      data: queryString
    })
  });
});