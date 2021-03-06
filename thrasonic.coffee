$ = jQuery

$.fn.thrasonic = (options) ->
  output = $(@)

  # Default options
  defaults =
      location: location.href
      limit: 50
      emptyMessage: "No one's mentioned this page on Twitter yet.
                       <a href=\"https://twitter.com?status=#{ location.href }\">
                       You could be the first</a>."
      intent: 'direct'

  # Extend the settings with those the user has provided
  options = $.extend {}, defaults, options

  # Format the tweetback into HTML
  #
  # @param {array} Properties of the tweetback
  # @return {string} The HTML-formatted tweetback
  formatTweetback = (tweetback) ->
    # The beginning of the formatted tweetback
    first = """
    <div class="thrasonic">
    """

    # This part of the formatted tweetback (the opening <a> tag) is different
    #  depending on the `intent` option.
    # As such, it's separated from the other two parts, which are consistent
    #  with every tweetback.
    switch options.intent
      when 'reply'
        second = """
            <a href="https://twitter.com/intent/tweet?in_reply_to=#{ tweetback.permalink_url.split('/').pop() }">
        """
      when 'retweet'
        second = """
            <a href="https://twitter.com/intent/retweet?tweet_id=#{ tweetback.permalink_url.split('/').pop() }">
        """
      when 'favorite'
        second = """
            <a href="https://twitter.com/intent/favorite?tweet_id=#{ tweetback.permalink_url.split('/').pop() }">
        """
      when 'author'
        second = """
            <a href="https://twitter.com/intent/user?screen_name=#{ tweetback.author.url.split('/').pop() }">
        """
      else
        second = """
              <a href="#{ tweetback.permalink_url }">
          """

    # The rest of the formatted tweetback
    third = """
            <img src="#{ tweetback.author.photo_url }" />
        </a>
        <div class="thrasonic_pointer"></div>
        <div class="thrasonic_tweet" style="display: none">
            <div class="thrasonic_handle">@#{ tweetback.author.url.split('/').pop() }</div>
            <div class="thrasonic_content">#{ tweetback.content }</div>
        </div>
    </div>
    """

    # Return the completed tweetback
    first + second + third

  # Parse the results of the Topsy AJAX call
  #
  # NOTE: See the $.each call? It's not the fastest iterative function around.
  #       I've tested its speed against that of Lodash's and Underscore's
  #       functions, and have found varying results. For now, I'm sticking with
  #       $.each because we already require jQuery (for now?).
  #       Try out the test: http://jsperf.com/jquery-each-vs-lodash-each-on-json
  #
  # @param {array} JSON result of the AJAX call to Topsy
  parseRequest = (data) ->
    authorUrls = []

    # Topsy actually found tweetbacks
    if data.response.list.length > 0
      $.each data.response.list, (i, tweetback) ->
        if $.inArray(tweetback.author.url, authorUrls) > -1
          return true

        authorUrls.push tweetback.author.url
        output.append formatTweetback(tweetback)

      # Show tweet when mouse hovers over avatar
      $('.thrasonic').mouseover(() -> $(@).children('.thrasonic_tweet, .thrasonic_pointer').show(); )
      $('.thrasonic').mousemove (kmouse) ->
        $(@).children('.thrasonic_tweet').css
          left: $(@).position().left - 105,
          top: $(@).position().top + 25
        $(@).children('.thrasonic_pointer').css
          left: $(@).position().left + 18,
          top: $(@).position().top + 15

      # Hide tweet when mouse leaves
      $('.thrasonic').mouseout(() -> $(@).children('.thrasonic_tweet, .thrasonic_pointer').hide() )
    else
      # Nothing was found; display empty message
      output.append options.emptyMessage

  # Request tweetbacks from Topsy
  $.ajax
    url: 'http://otter.topsy.com/trackbacks.js'
    data:
      url: options.location
      perpage: options.limit
    success: parseRequest
    dataType:'jsonp'

  # That's all, folks!
  return @
