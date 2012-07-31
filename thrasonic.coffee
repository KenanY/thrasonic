$ = jQuery

$.thrasonic = ->
  Thrasonic.getInstance()

$.fn.thrasonic = (options) ->
  thrasonic = new Thrasonic(options)
  # thrasonic.setOptions options
  thrasonic.boast @
  thrasonic

class Thrasonic
  params =
    instantiated: null
    started: null

  constructor: (options) ->
    @setInitialOptions()
    @setOptions(options)

  setInitialOptions: (options) ->
    defaults =
      location: location.href
      limit: 50
      emptyMessage: "No one's mentioned this page on Twitter yet.
      <a href=\"https://twitter.com?status=#{ location.href }\">
      You could be the first</a>."
      intent: 'direct'
    @options = @options or $.extend {}, defaults, options

  # Set plugin options
  #
  # @param [Object] options
  #
  # @return void
  setOptions: (options) ->
    @options = @options or @setInitialOptions options
    @options = $.extend @options, options

  # Format the tweetback into HTML
  #
  # @param {array} Properties of the tweetback
  #
  # @return {string} The HTML-formatted tweetback
  formatTweetback: (tweetback) ->
    first = """
    <div class="thrasonic">
    """
    switch @options.intent
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
    first + second + third

  # Parse the results of the Topsy AJAX call
  #
  # @param {array} JSON result of the AJAX call to Topsy
  parseRequest: (data) ->
    output = $(@)
    authorUrls = []

    if data.response.list.length > 0
      $.each data.response.list, (i, tweetback) ->
        if $.inArray(tweetback.author.url, authorUrls) > -1
          return true

        authorUrls.push tweetback.author.url
        output.append @formatTweetback(tweetback)

      $('.thrasonic').mouseover(() -> $(@).children('.thrasonic_tweet, .thrasonic_pointer').show(); )
      $('.thrasonic').mousemove (kmouse) ->
        $(@).children('.thrasonic_tweet').css
          left: $(@).position().left - 105,
          top: $(@).position().top + 25
        $(@).children('.thrasonic_pointer').css
          left: $(@).position().left + 18,
          top: $(@).position().top + 15

      $('.thrasonic').mouseout(() -> $(@).children('.thrasonic_tweet, .thrasonic_pointer').hide() )
    else
      output.append @options.emptyMessage

  boast: ->
    unless params.started
      $.ajax
        url: 'http://otter.topsy.com/trackbacks.js'
        data:
          url: @options.location
          perpage: @options.limit
        success: @parseRequest
        dataType:'jsonp'
    params.started = true

  ###
  getInstance: ->
    unless params.instantiated
      params.instantiated = new Thrasonic()
      params.instantiated.setInitialOptions()
    params.instantiated

  free: ->
    params = {}
    null
  ###