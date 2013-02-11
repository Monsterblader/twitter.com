$(document).ready(setupClickListener);

function setupClickListener() {
  var l = $("#loadTweets")
  l.click(displayTweets)
}

var displayTweets = function(){
  var allTweets = window.streams.home;
  var upToFiveTweets = Math.min(allTweets.length, 5);
  parseTweets(upToFiveTweets, "all", allTweets);
}

var displayUserTweets = function() {
  var allList = window.streams.home;
  var selectedUser = $(this).text();
  parseTweets(tweetList.length, selectedUser, allList);
}

var parseTweets = function(startOffset, userorAll, tweetList) {
  var listLength = tweetList.length;
  startPoint = listLength - startOffset;
  for(var i = startPoint; i < listLength; i++ ){
    var tweet = tweetList[i]
    var tweetAsHTML = createTweet(tweet);
    if ((userorAll === "all") || (userorAll === tweet.user)) {
      // set up the click handler for this tweet
      tweetAsHTML.find('.userName a').click(displayUserTweets);
      tweetAsHTML.prependTo($("#container"));      
    }
  }
}

var createTweet =function(tweet){ 
  var newTweetHolder = $('<div class ="newTweet"><div class="tweetHeader"><div class="userName"></div><div class="tweetTime"></div></div><div class = "tweetBody"></div></div>');

  // fill in template with tweet data
  newTweetHolder.find('.userName').html('<a href="#">'+tweet.user+'</a>');
  newTweetHolder.find('.tweetTime').text(tweet.created_at);
  newTweetHolder.find('.tweetBody').text(tweet.message);
  return newTweetHolder;
}