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

  // takes a tweet object and inserts the key values into appropriate tags and returns the result
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
    // this will cause XSS -> let $textArea = $(`<p class="tweet-thoughts">${tweet.content.text}</p>`)
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

  //makes a GET request to the server to get tweet data
  const loadTweets = function () {

    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    }).then((data) => {

      renderTweets(data);

    })
  }

  // load already existing tweets onto page
  loadTweets();

  //when TWEET button is pressed, goes through validation and sends a post request to the server and update the tweets to display
  $("form").on("submit", function (event) {

    event.preventDefault();

    let $textAreaToShow = $(".text-area");

    let stringToValidate = $textAreaToShow.val();

    let $errorMessage = $(".error-message");

    if (stringToValidate === null) {
      $errorMessage.text("⚠  Your tweet cannot be null!  ⚠").slideDown(500);
      return;
    }

    if (stringToValidate.trim() === "") {
      $errorMessage.text("⚠  Your tweet has cannot be empty!  ⚠").slideDown(500);
      return;
    }
    if (stringToValidate.length > 140) {
      $errorMessage.text("⚠  Your tweet has exceeded 140 characters!  ⚠").slideDown(500);
      return;
    }

    let url = "http://localhost:8080/tweets/"
    let queryString = $("form").serialize();

    $.ajax({
      url: url,
      method: "POST",
      data: queryString,
      //waiting for data because ajax is asynchronous
      success: function (data) {
        loadTweets();
      },
      error: function (error) {
        console.log(error)
      }
    })

    $textAreaToShow.val("");
    $numberToShow = $(".counter")
    $numberToShow.val(140);

    $errorMessage.slideUp(200)
  });
});