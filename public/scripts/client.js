/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    $(".tweet-container").empty();

    for (const tweet in tweets) {

      $('#tweets-container').prepend(createTweetElement(tweets[tweet]));
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

    // prevent XSS with escaping 
    // let $textArea = $(`<p class="tweet-thoughts">${tweet.content.text}</p>`)
    let $textArea = $(`<p class="tweet-thoughts">`).text(tweet.content.text);
    $tweet.append($textArea);

    let $footer = $(`<footer class="individual-tweet-footer"></footer>`)

    let $date = $(`<div class="date">${timeago.format(tweet.created_at)}</div>`);
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

    let $textAreaToShow = $(".text-area");
    let stringToValidate = $textAreaToShow.val();

    if (stringToValidate === null) {
      // alert("Tweet cannot be null!");

      return;
    }

    if (stringToValidate === "") {
      // alert("Tweet cannot be empty!");
      return;
    }

    if (stringToValidate.length > 140) {
      // alert("Tweet is too long!");
      return;
    }

    let url = "http://localhost:8080/tweets/"
    let queryString = $("form").serialize();

    $.ajax({
      url: url,
      method: "POST",
      data: queryString
    })

    $textAreaToShow.val("");

    loadTweets();

  });

});