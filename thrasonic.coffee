$ = jQuery

$.fn.thrasonic = (options) ->
  output = $(@)
  defaults = 
      location: location.href,

      # CoffeeScript doesn't provice string interpolation via #{} tags 
      # for single quote strings
      empty_message: 'No one\'s mentioned this page on Twitter yet.
                       <a href="https://twitter.com?status=' + location.href + '">
                       You could be the first</a>.',
      limit: 50

  # Extend the settings with those the user has provided
  if options isnt null and typeof options is 'object'
    options = $.extend({}, defaults, options) 

  format_tweetback = (tweetback) ->
      formatted = """
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
      return formatted

  parse_request = (data) ->
    author_urls = []
    if data.response.list.length > 0
      $.each data.response.list, (i,tweetback) ->
        if $.inArray(tweetback.author.url, author_urls) > -1
          return true

        author_urls.push(tweetback.author.url)
        output.append(format_tweetback(tweetback))

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
      output.append(options.empty_message)

  $.ajax {
    url: 'http://otter.topsy.com/trackbacks.js',
    data: {
      url: options.location,
      perpage: options.limit
    },
    success: parse_request,
    dataType:'jsonp'
  }

  return @