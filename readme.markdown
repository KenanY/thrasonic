# Thrasonic is the new-and-improved tweetback library.

> ### thrasonical  
> _adj._ [Boastful](https://github.com/holman/boastful).
> 
> _American Heritage® Dictionary of the English Language, Fourth Edition_

Lovingly crafted by [Zach Holman](http://zachholman.com). Now continued unofficially under a new name and management: [Kenan Yildirim](http://kenany.me).

## So what's a tweetback?

Once upon a time there were [trackbacks](https://en.wikipedia.org/wiki/Trackback). If you wrote a blog post, and I thought it was interesting so I blogged about your blog post, trackbacks were the way for my blog to let your blog know I'm talking about it. Usually, your blog software would then link to mine as a way of telling your own readers "hey, here's some more people talking about this topic".

A few services have started to do the same for Twitter—a "tweetback", if you will. Write your blog post, and then these services would search Twitter for whoever would link or discuss it.

Here's the main problems with that approach:

- **The content usually sucks**. I've seen a lot of systems—Disqus, for one—simply print out the tweet verbatim and try to integrate it into your regular blog comments. This assumes that each and every tweet offers some compelling unique viewpoint. It doesn't. Usually you end up with a bunch of tweetbacks coming in saying: 

> "RT @someone RT @someoneelse RT @originaldude Hey a blog post http://example.com".

- **Most only search Twitter**. Twitter search is cool, quick, and painless, but it doesn't offer full archival access, so older tweets might not show up. It's nice to have a full list.
- **URL shorteners are confusing**. You shouldn't just search for your main blog post URL; very few on Twitter actually do the whole thing, since characters are money, people. You'd have to search for every short URL that translates to your main post URL.

Luckily, this tiny jQuery plugin tries to solve all those:

- **Avatars only**. James Cameron's dream: only avatars. The full content is available through a tooltip, but really you shouldn't expect the tweet content to contribute much anyway.
- **Uses Topsy**. [Topsy](http://topsy.com) handles both the archival problem and the URL shortener problem. They crawl Twitter for who's linking to who, translating short URLs to full URLs as they go.

You end up with little heads on the footer of your blog, which acts as nifty encouragement to get others to tweet and promote your content. People love seeing their face.

## Example

Here's an old snapshot of what the footer from [Zach Holman's blog](http://zachholman.com) used to look like. Tweetbacks still look similar to this example.

![old boastful screenshot](http://files.droplr.com/files/11322372/oO5q.jquery.boastful.png)

## Installing

Feel free to browse `example.html` for a basic example. Otherwise, the general steps:

1\. Load jQuery:

``` html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
```

2\. Then `thrasonic.js`:

``` html
<script src="thrasonic.js"></script>
```

3\. Execut within `$(document).ready()`:

``` js
$(document).ready(function() {
    $('#thrasonic').thrasonic();
});
```

4\. Tell it where to go:

``` html
<div id="thrasonic"></div>
```

5\. Style accordingly. For a starting point, check out `thrasonic.css`.

## Optional options

In your `.thrasonic()` call, you can pass in some options. Here's a list:

- **location**: the URL to search Twitter for (default: location.href, the current page)
- **empty_message**: message to display if no tweets found, HTML allowed. Default: 

``` html
No one's mentioned this page on Twitter yet. <a href="http://twitter.com?status=page_url_here>You could be the first</a>.
```

- **limit**: maximum to show per page (default: 50, which is also the maximum)

## Found an issue?

If you've come across a problem with the code, submit it to the [Issue Tracker](https://github.com/KenanY/thrasonic/issues). Use the GitHub issue search to see if the issue has already been reported, and make sure you're using the latest version of thrasonic.

Contribution enquiries should take place before any significant pull request, otherwise you risk spending a lot of time working on something that I might not want to add to thrasonic.