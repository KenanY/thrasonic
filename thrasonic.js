/*!
 * thrasonic 1.0.4
 *
 * https://github.com/KenanY/thrasonic
 *
 * by Kenan Yildirim, with original work by Zach Holman
 */
(function() {
  var $;

  $ = jQuery;

  $.fn.thrasonic = function(options) {
    var defaults, formatTweetback, output, parseRequest;
    output = $(this);
    defaults = {
      location: location.href,
      limit: 50,
      emptyMessage: "No one's mentioned this page on Twitter yet.                       <a href=\"https://twitter.com?status=" + location.href + "\">                       You could be the first</a>.",
      intent: 'direct'
    };
    options = $.extend({}, defaults, options);
    formatTweetback = function(tweetback) {
      var first, second, third;
      first = "<div class=\"thrasonic\">";
      switch (options.intent) {
        case 'reply':
          second = "<a href=\"https://twitter.com/intent/tweet?in_reply_to=" + (tweetback.permalink_url.split('/').pop()) + "\">";
          break;
        case 'retweet':
          second = "<a href=\"https://twitter.com/intent/retweet?tweet_id=" + (tweetback.permalink_url.split('/').pop()) + "\">";
          break;
        case 'favorite':
          second = "<a href=\"https://twitter.com/intent/favorite?tweet_id=" + (tweetback.permalink_url.split('/').pop()) + "\">";
          break;
        case 'author':
          second = "<a href=\"https://twitter.com/intent/user?screen_name=" + (tweetback.author.url.split('/').pop()) + "\">";
          break;
        default:
          second = "<a href=\"" + tweetback.permalink_url + "\">";
      }
      third = "        <img src=\"" + tweetback.author.photo_url + "\" />\n    </a>\n    <div class=\"thrasonic_pointer\"></div>\n    <div class=\"thrasonic_tweet\" style=\"display: none\">\n        <div class=\"thrasonic_handle\">@" + (tweetback.author.url.split('/').pop()) + "</div>\n        <div class=\"thrasonic_content\">" + tweetback.content + "</div>\n    </div>\n</div>";
      return first + second + third;
    };
    parseRequest = function(data) {
      var authorUrls;
      authorUrls = [];
      if (data.response.list.length > 0) {
        $.each(data.response.list, function(i, tweetback) {
          if ($.inArray(tweetback.author.url, authorUrls) > -1) {
            return true;
          }
          authorUrls.push(tweetback.author.url);
          return output.append(formatTweetback(tweetback));
        });
        $('.thrasonic').mouseover(function() {
          return $(this).children('.thrasonic_tweet, .thrasonic_pointer').show();
        });
        $('.thrasonic').mousemove(function(kmouse) {
          $(this).children('.thrasonic_tweet').css({
            left: $(this).position().left - 105,
            top: $(this).position().top + 25
          });
          return $(this).children('.thrasonic_pointer').css({
            left: $(this).position().left + 18,
            top: $(this).position().top + 15
          });
        });
        return $('.thrasonic').mouseout(function() {
          return $(this).children('.thrasonic_tweet, .thrasonic_pointer').hide();
        });
      } else {
        return output.append(options.emptyMessage);
      }
    };
    $.ajax({
      url: 'http://otter.topsy.com/trackbacks.js',
      data: {
        url: options.location,
        perpage: options.limit
      },
      success: parseRequest,
      dataType: 'jsonp'
    });
    return this;
  };

}).call(this);
