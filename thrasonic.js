/*!
 * thrasonic 1.0.2
 *
 * https://github.com/KenanY/thrasonic
 *
 * by Kenan Yildirim, with original work by Zach Holman
 */
(function() {
  var $;

  $ = jQuery;

  $.fn.thrasonic = function(options) {
    var defaults, format_tweetback, output, parse_request;
    output = $(this);
    defaults = {
      location: location.href,
      empty_message: 'No one\'s mentioned this page on Twitter yet.\
                       <a href="https://twitter.com?status=' + location.href + '">\
                       You could be the first</a>.',
      limit: 50
    };
    options = $.extend({}, defaults, options);
    format_tweetback = function(tweetback) {
      var formatted;
      formatted = "<div class=\"thrasonic\">\n    <a href=\"" + tweetback.permalink_url + "\">\n        <img src=\"" + tweetback.author.photo_url + "\" />\n    </a>\n    <div class=\"thrasonic_pointer\"></div>\n    <div class=\"thrasonic_tweet\" style=\"display: none\">\n        <div class=\"thrasonic_handle\">@" + (tweetback.author.url.split('/').pop()) + "</div>\n        <div class=\"thrasonic_content\">" + tweetback.content + "</div>\n    </div>\n</div>";
      return formatted;
    };
    parse_request = function(data) {
      var author_urls;
      author_urls = [];
      if (data.response.list.length > 0) {
        $.each(data.response.list, function(i, tweetback) {
          if ($.inArray(tweetback.author.url, author_urls) > -1) {
            return true;
          }
          author_urls.push(tweetback.author.url);
          return output.append(format_tweetback(tweetback));
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
        return output.append(options.empty_message);
      }
    };
    $.ajax({
      url: 'http://otter.topsy.com/trackbacks.js',
      data: {
        url: options.location,
        perpage: options.limit
      },
      success: parse_request,
      dataType: 'jsonp'
    });
    return this;
  };

}).call(this);
