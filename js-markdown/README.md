js-markdown
===========
This is my own markdown implementation. I just started so it is very messy
and doesn't include many features. Expect that to change soon.

## New Thoughts

Maybe I should just 'grab' everything up to '\n\n' or .split('\n\n').
Then just parse each of those as a group, checking the first character(s)
of each line for info as to what the line actually is.

Or maybe I should try it with Jison.