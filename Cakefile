{log}  = console
{exec} = require "child_process"
fs     = require "fs"

VERSION = "1.0.0"

HEADER  = """
/*
 * thrasonic v#{ VERSION }
 *
 * Started out as a wonderful tweetback library called "boastful", by Zach Holman.
 *
 * Now it"s being continued unofficially as "thrasonic", by Kenan Yidlirim.
 */
 
"""

CAKEFILE  = "Cakefile"
INFILE    = "thrasonic.coffee"
OUTFILE   = "thrasonic.js"
MINFILE   = "thrasonic.min.js"

task "build", ->
  exec "coffee --print #{ INFILE }", (err, stdout, stderr) ->
    throw err if err
    fs.writeFile OUTFILE, HEADER + stdout, (err) ->
      throw err if err
    exec "uglifyjs #{ OUTFILE } > #{ MINFILE }"