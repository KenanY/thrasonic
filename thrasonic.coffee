$ = jQuery

$.fn.thrasonic = (options) ->
  output = $(@)

  # Default options
  defaults =
      location: location.href,
      empty_message: "No one's mentioned this page on Twitter yet.
                       <a href=\"https://twitter.com?status=#{ location.href }\">
                       You could be the first</a>.",
      limit: 50

  # Extend the settings with those the user has provided
  options = $.extend({}, defaults, options)

  format_tweetback = (tweetback) ->
    """
    <div class="thrasonic">
        <a href="#{ tweetback.permalink_url }">
            <img src="#{ tweetback.author.photo_url }" />
        </a>
        <div class="thrasonic_pointer"></div>
        <div class="thrasonic_tweet" style="display: none">
            <div class="thrasonic_handle">@#{ tweetback.author.url.split('/').pop() }</div>
            <div class="thrasonic_content">#{ tweetback.content }</div>
        </div>
    </div>
    """

  parse_request = (data) ->
    author_urls = []

    # Topsy actually found tweetbacks
    if data.response.list.length > 0
      $.each data.response.list, (i, tweetback) ->
        if $.inArray(tweetback.author.url, author_urls) > -1
          return true

        author_urls.push(tweetback.author.url)
        output.append(format_tweetback(tweetback))

      # Show tweet when avatar is mouseover'd
      $('.thrasonic').mouseover(() -> $(@).children('.thrasonic_tweet, .thrasonic_pointer').show(); )
      $('.thrasonic').mousemove (kmouse) ->
        $(@).children('.thrasonic_tweet').css
          left: $(@).position().left - 105,
          top: $(@).position().top + 25
        $(@).children('.thrasonic_pointer').css
          left: $(@).position().left + 18,
          top: $(@).position().top + 15

      # Hide it when mouse leaves
      $('.thrasonic').mouseout(() -> $(@).children('.thrasonic_tweet, .thrasonic_pointer').hide() )
    else
      # Nothing was found; display empty message
      output.append options.empty_message

  # Topsy, we can haz tweets, pl0x?
  $.ajax
    url: 'http://otter.topsy.com/trackbacks.js'
    data:
      url: options.location
      perpage: options.limit
    success: parse_request
    dataType:'jsonp'

  # That's all, folks!
  return @
