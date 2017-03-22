/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  // Ajax call for GET-ing all tweets
  function loadTweets(){
    $.ajax({
      url: '/tweets',
      method: "GET"
    }).done(renderTweets);
  };

  // Render all tweets
  loadTweets();

  // Ajax call for POST-ing new tweet
  $("form[action='/tweets']").on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).done(function(){
      loadTweets();
      $(".new-tweet").find("textarea[name='text']").val('');
    });
  })
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
