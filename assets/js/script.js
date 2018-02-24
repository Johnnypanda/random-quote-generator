$(function() {
  var author = $("#author");
  var text = $("#quote");
  getQuote(author, text);

  $("#getQuote").click(function(event) {
    event.preventDefault();
    getQuote(author, text);
    $("#tweetOut").removeClass("disabled");
    $("#tweetOut").html("Tweet This");
  });
});

var tweetThis = "";
$("#tweetOut").click(function() {
  if (tweetThis.length > 280) {
    tweetThis = "";
    $(this).addClass("disabled");
    $(this).html("Sorry! 280 chars exceeded!");
  } else {
    $(this).attr("href", "https://twitter.com/intent/tweet?text=" + tweetThis);
  }
});

function getQuote(author, text) {
  var forismaticURL =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

  $.getJSON(forismaticURL, function(data) {
    text.html(data.quoteText);
    if (data.quoteAuthor) {
      author.html(data.quoteAuthor);
      author.attr("href", data.quoteLink);
    } else {
      author.removeAttr("href");
      author.html("<strong>Anonymous</strong>");
    }
    tweetThis = data.quoteText + " By - " + data.quoteAuthor;
  });
}
