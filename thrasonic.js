/*!
 * thrasonic 1.1.0
 *
 * https://github.com/KenanY/thrasonic
 *
 * by Kenan Yildirim, with original work by Zach Holman
 */
(function() {
  var $, Thrasonic;

  $ = jQuery;

  $.thrasonic = function() {
    return Thrasonic.getInstance();
  };

  $.fn.thrasonic = function(options) {
    var thrasonic;
    thrasonic = new Thrasonic(options);
    thrasonic.boast(this);
    return thrasonic;
  };

  Thrasonic = (function() {
    var params;

    params = {
      instantiated: null,
      started: null
    };

    function Thrasonic(options) {
      this.setInitialOptions();
      this.setOptions(options);
    }

    Thrasonic.prototype.setInitialOptions = function(options) {
      var defaults;
      defaults = {
        location: location.href,
        limit: 50,
        emptyMessage: "No one's mentioned this page on Twitter yet.      <a href=\"https://twitter.com?status=" + location.href + "\">      You could be the first</a>.",
        intent: 'direct'
      };
      return this.options = this.options || $.extend({}, defaults, options);
    };

    Thrasonic.prototype.setOptions = function(options) {
      this.options = this.options || this.setInitialOptions(options);
      return this.options = $.extend(this.options, options);
    };

    Thrasonic.prototype.formatTweetback = function(tweetback) {
      var first, second, third;
      first = "<div class=\"thrasonic\">";
      switch (this.options.intent) {
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

    Thrasonic.prototype.parseRequest = function(data) {
      var authorUrls, output;
      output = $(this);
      authorUrls = [];
      if (data.response.list.length > 0) {
        $.each(data.response.list, function(i, tweetback) {
          if ($.inArray(tweetback.author.url, authorUrls) > -1) {
            return true;
          }
          authorUrls.push(tweetback.author.url);
          return output.append(this.formatTweetback(tweetback));
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
        return output.append(this.options.emptyMessage);
      }
    };

    Thrasonic.prototype.boast = function() {
      if (!params.started) {
        $.ajax({
          url: 'http://otter.topsy.com/trackbacks.js',
          data: {
            url: this.options.location,
            perpage: this.options.limit
          },
          success: this.parseRequest,
          dataType: 'jsonp'
        });
      }
      return params.started = true;
    };

    /*
      getInstance: ->
        unless params.instantiated
          params.instantiated = new Thrasonic()
          params.instantiated.setInitialOptions()
        params.instantiated

      free: ->
        params = {}
        null
    */


    return Thrasonic;

  })();

}).call(this);
