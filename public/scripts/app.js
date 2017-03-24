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
  }

  // Render all tweets
  loadTweets();

  // Ajax call for POST-ing new tweet
  $("form[action='/tweets']").on('submit', function(event) {
    event.preventDefault();
    var $tweetText = $(".new-tweet").find("textarea[name='text']");

    // Check if the tweet is empty or over 140 chars
    if( checkValidation($tweetText.val()) ){
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).done(function(){
        loadTweets();
        $tweetText.val('').trigger('input');
      });
    }
  });

  // Like tweet
  $("#tweets-container").on('click', "div.icons > i.fa.fa-heart", function(e){
    var $counter = $(this).parent().find("i:last-child");
    var likes = Number($counter.text()) + 1;
    $counter.text(likes);
  });

  // Use slideToggle to hide the new tweet form
  $(".nav-bar-button").on('click', function(){
    $("section.new-tweet").slideToggle(function(){
      $("textarea[name='text']").focus();
    });
  });
});

function showError(message){
  var $errorMessage = $("<strong>").addClass("over-limit new-tweet");
  $errorMessage.text(message).insertBefore($(".new-tweet"));
}

function hideError(){
  $("strong.over-limit").remove();
}

function checkValidation(tweetText){
  hideError();
  if(!tweetText){
    showError("Empty tweet");
    return false;
  } else if (tweetText.length > 140){
    showError("Text is longer than 140 characters");
    return false;
  } else {
    return true;
  }
}

function createTweetElement(tweetData) {
  theDate = moment(tweetData.created_at).fromNow();
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
  $("<div>").addClass("date-posted").text(theDate).appendTo($footer);

  // Footer icons
  var $icons_div = $("<div>").addClass("icons").appendTo($footer);
  ["flag", "retweet", "heart"].forEach(function(item) {
    $("<i>").addClass("fa fa-" + item).attr("aria-hidden", "true").appendTo($icons_div);
  });

  $("<i>").text(tweetData.likes).appendTo($icons_div);

  return $tweet;
}

function renderTweets(tweets) {
  //Clear all tweets first
  $("#tweets-container").empty();

  // loops through tweets
  for(let tweet of tweets) {
    // calls createTweetElement for each tweet
    var $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").prepend($tweet);
  }
}
