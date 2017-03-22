/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  var $tweet = createTweetElement(tweetData);
  $("#tweets-container").append($tweet);
});

function createTweetElement(tweetData) {
  var $tweet = $("<article>").addClass("tweet");
  var $header = $("<header>").appendTo($tweet);
  $("<img>").attr("src", tweetData.user.avatars.small).appendTo($header);
  $("<h2>").addClass("author-name").text(tweetData.user.name).appendTo($header);
  $("<div>").addClass("author-handle").text(tweetData.user.handle).appendTo($header);
  $("<div>").addClass("tweet-body").text(tweetData.content.text).appendTo($tweet);
  var $footer = $("<footer>").appendTo($tweet);
  $("<div>").addClass("date-posted").text(tweetData.created_at).appendTo($footer);
  var $icons_div = $("<div>").addClass("icons").appendTo($footer);
  $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true").appendTo($icons_div);
  $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true").appendTo($icons_div);
  $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true").appendTo($icons_div);

  return $tweet;
}


// Test / driver code (temporary). Eventually will get this from the server.
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

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to
// the page so we can make sure it's got all the right elements, classes, etc.