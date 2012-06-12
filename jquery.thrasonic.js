(function ($) {
  $.fn.thrasonic = function(options){
    var output = $(this)
    var defaults = {
                      location: location.href,
                      empty_message: 'No one\'s mentioned this page on Twitter yet. '+
                                       '<a href="http://twitter.com?status='+ location.href +'">'
                                       +'You could be the first</a>.',
                      limit: 50
                   }
    options = $.extend({}, defaults, options)

    function format_tweetback(tweetback) {
      formatted  = ''
      formatted += '<div class="thrasonic">'
      formatted +=   '<a href="'+tweetback.permalink_url+'">'
      formatted +=     '<img src="'+tweetback.author.photo_url+'" />'
      formatted +=   '</a>'
      formatted +=   '<div class="thrasonic_pointer"></div>'
      formatted +=   '<div class="thrasonic_tweet" style="display: none">'
      formatted +=     '<div class="thrasonic_handle">@'+tweetback.author.url.split('/').pop()+'</div>'
      formatted +=     '<div class="thrasonic_content">'+tweetback.content+'</div>'
      formatted +=   '</div>'
      formatted += '</div>'
      return formatted
    }

    var parse_request = function(data){
      var author_urls = []
      if(data.response.list.length > 0) {
        $.each(data.response.list, function(i,tweetback){
          if($.inArray(tweetback.author.url,author_urls) > -1) {
            return true
          }
          author_urls.push(tweetback.author.url)
          output.append(format_tweetback(tweetback))
        })
        $('.thrasonic').mouseover(function(){ $(this).children('.thrasonic_tweet, .thrasonic_pointer').show() })
        $('.thrasonic').mousemove(function(kmouse){
          $(this).children('.thrasonic_tweet').css({
            left:$(this).position().left-105,
            top:$(this).position().top+25
          })
          $(this).children('.thrasonic_pointer').css({
            left:$(this).position().left+18,
            top:$(this).position().top+15
          })
        })
        $('.thrasonic').mouseout(function(){ $(this).children('.thrasonic_tweet, .thrasonic_pointer').hide() })
      } else {
        output.append(options.empty_message)
      }
    }

    $.ajax({
      url:'http://otter.topsy.com/trackbacks.js',
      data:
        {
          url: options.location,
          perpage: options.limit
        },
      success:parse_request,
      dataType:'jsonp'}
    )

    return this
  }
})(jQuery)