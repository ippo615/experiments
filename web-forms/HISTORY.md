### April 28, 2013
Added 'toasts' - short messages that display some information to the user and
fade away without any requiring any interaction. A possible bug is that
`position: fixed` (on anything) breaks Android's nice form handling. For
example: an input with `type=number` will have a regular keyboard, `select`
areas will not work. There will not be `next`, `previous`, `done` buttons for
sequential input elements. Fixed bug in toast placements.

I "cleaned" the css, it's not that much neater. I also converted it to sass
for future edits. I added the `test-css.html` page to see how badly all the
elements that I ignored look.

### April 27, 2013
Initial Commit. I based my preliminary design off of the Android style guide.
I tested it in several browsers. Works great on android, chrome. Funtcional 
in IE 7 and up (minor visual issues). Good in newest firefox, problems with
multi-line labels in FF-2 (yes that is *REALLY* old). Great in Safari 3.1 on
windows. Good in Opera (newest and oldest version).
