/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// var moment = require("moment");

$(document).ready(function(){
  var $tweet = createTweetElement(tweetData);
  $("#tweets-container").append($tweet);
});

function createTweetElement(tweetData) {
  // var datePosted = moment.unix(tweetData.created_at).calendar();
  var theDate = new Date(tweetData.created_at);

  var $tweet = $("<article>").addClass("tweet");
  var $header = $("<header>").appendTo($tweet);

  // Tweet header
  $("<img>").attr("src", tweetData.user.avatars.small).appendTo($header);
  $("<h2>").addClass("author-name").text(tweetData.user.name).appendTo($header);
  $("<div>").addClass("author-handle").text(tweetData.user.handle).appendTo($header);

  // Tweet body
  $("<div>").addClass("tweet-body").text(tweetData.content.text).appendTo($tweet);

  // Tweet footer
  var $footer = $("<footer>").appendTo($tweet);
  // $("<div>").addClass("date-posted").text(tweetData.created_at).appendTo($footer);
  $("<div>").addClass("date-posted").attr("data-livestamp", theDate).appendTo($footer);

  // Footer icons
  var $icons_div = $("<div>").addClass("icons").appendTo($footer);
  $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true").appendTo($icons_div);
  $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true").appendTo($icons_div);
  $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true").appendTo($icons_div);

  return $tweet;
}


var tweetData = {
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
}