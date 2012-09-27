# Thrasonic

> ### thrasonical
> _adj._ [Boastful][boastful].
>
> _American Heritage® Dictionary of the English Language, Fourth Edition_

Thrasonic is an unofficial continuation of the [boastful][] tweetback library by [Zach Holman][holman]; under new management: [Kenan Yildirim][kenany].

Details and installation instructions can be found at the Thrasonic website: **http://kenany.github.com/thrasonic/**

![old boastful screenshot](http://files.droplr.com/files/11322372/oO5q.jquery.boastful.png)

## Found an issue?

If you've come across a problem with the code, submit it to the [Issue Tracker][issues].  When filing a new bug, please remember to include:

* The Thrasonic version you're using
* Your platform/OS version
* Steps to reproduce the issue, along with the results you get compared to the results you expect
* For most issues, it will help to include a [reduced test case][reduce] where you've isolated the issue. Use [jsFiddle][jsfiddle].

## Versioning

Thrasonic's version numbering is based off [Semantic Versioning][semver]. In a nutshell, version numbers are formatted like:

`<major>.<minor>.<patch>`

Here's the gist of the Semantic Versioning guidelines:

* If the changes aren't backward compatible (user needs to change something on their site in order to keep Thrasonic working), then I bump the major (and reset the minor and patch).
* New additions that don't break backward compatibility (user will not see a significant change in their tweetbacks) will bump the minor (and resets the patch).
* Bug fixes and misc changes will bump the patch number.
* Also, only changes to `thrasonic.coffee` (which affects `thrasonic.js` and `thrasonic.min.js`) or `thrasonic.css` deserve to update the version number.

## Contribute

You want to help? Awesome!

### Enquiries

Contribution enquiries should take place before any significant pull request, otherwise you risk spending a lot of time working on something that I might not want to add to Thrasonic.

### Building

* Install [node.js][nodejs].
* Install [CoffeeScript][coffee] and [UglifyJS][uglify] with `npm install -g coffee-script uglify-js`.
* Clone thrasonic: `git clone git://github.com/KenanY/thrasonic.git`.
* `cd` into it and build using `cake build`.

Basically, after installing node.js:

```
npm install -g coffee-script uglify-js
git clone git://github.com/KenanY/thrasonic.git
cd thrasonic
cake build
```

### Releasing

Upgrade the version number with `cake -v VERSION upgrade`. Note that this is only used to release new Thrasonic versions, and is generally not wanted in pull requests.


   [boastful]: https://github.com/holman/boastful
   [coffee]: http://coffeescript.org/
   [holman]: http://zachholman.com/
   [issues]: https://github.com/KenanY/thrasonic/issues
   [jsfiddle]: http://jsfiddle.net/
   [kenany]: http://kenany.me/
   [nodejs]: http://nodejs.org/
   [reduce]: http://css-tricks.com/reduced-test-cases/
   [semver]: http://semver.org/
   [uglify]: http://marijnhaverbeke.nl/uglifyjs
