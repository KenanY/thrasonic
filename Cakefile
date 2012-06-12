###
thrasonic's Cakefile

Very much of this is based off 4chan-x's Cakefile: http://git.io/stmoRA
###

{log}  = console
{exec} = require "child_process"
fs     = require "fs"

VERSION = "1.0.0"

HEADER  = """
/*!
 * thrasonic
 * v#{ VERSION }
 *
 * https://github.com/KenanY/thrasonic
 * by Kenan Yildirim, with original work by Zach Holman
 * 
 */

"""

CAKEFILE  = "Cakefile"
INFILE    = "thrasonic.coffee"
OUTFILE   = "thrasonic.js"
MINFILE   = "thrasonic.min.js"

option '-v', '--version [version]', 'Upgrade version.'

task 'upgrade', (options) ->
  {version} = options
  unless version
    console.warn 'Version argument not specified. Aborting.'
    return
  invoke 'build'
  regexp = RegExp VERSION, 'g'
  for file in [CAKEFILE, INFILE, OUTFILE, MINFILE]
    data = fs.readFileSync file, 'utf8'
    fs.writeFileSync file, data.replace regexp, version

task "build", ->
  exec "coffee --print #{ INFILE }", (err, stdout, stderr) ->
    throw err if err
    fs.writeFile OUTFILE, HEADER + stdout, (err) ->
      throw err if err
    exec "uglifyjs #{ OUTFILE } > #{ MINFILE }"