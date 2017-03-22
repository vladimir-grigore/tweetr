/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  renderTweets(data);
});

function createTweetElement(tweetData) {
  var theDate = new Date(tweetData.created_at);

  var $tweet = $("<article>").addClass("tweet");
  var $header = $("<header>").appendTo($tweet);

  // Tweet header
  $("<img>").attr("src", tweetData.user.avatars.small).attr("alt", "avatar").appendTo($header);
  $("<h2>").addClass("author-name").text(tweetData.user.name).appendTo($header);
  $("<div>").addClass("author-handle").text(tweetData.user.handle).appendTo($header);

  // Tweet body
  $("<div>").addClass("tweet-body").text(tweetData.content.text).appendTo($tweet);

  // Tweet footer
  var $footer = $("<footer>").appendTo($tweet);
  $("<div>").addClass("date-posted").attr("data-livestamp", theDate).appendTo($footer);

  // Footer icons
  var $icons_div = $("<div>").addClass("icons").appendTo($footer);
  $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true").appendTo($icons_div);
  $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true").appendTo($icons_div);
  $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true").appendTo($icons_div);

  return $tweet;
}

function renderTweets(tweets) {
  // loops through tweets
  for(let tweet of tweets) {
    // calls createTweetElement for each tweet
    var $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet);
  }
}

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
