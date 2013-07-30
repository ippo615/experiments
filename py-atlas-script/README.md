py-atlas-script
==============================================================================

A simple python script that can merge images into a sprite sheet and generate
a json file describing the output. The script is intentionally left simple so
you can modify it and output whatever data you need.

Dependencies
------------------------------------------------------------------------------
This script requires [Python][python] and [ImageMagick][imagemagick]. In
linux you may be able to install them via:

	sudo apt-get install python
	sudo apt-get install imagemagick

Or instead of `apt-get` try `yum`. On Windows you'll need to download the
installation files from their repestive websites.

[python]: http://www.python.org/
[imagemagick]: http://www.imagemagick.org/script/index.php

Installing
------------------------------------------------------------------------------
You can clone the github repo:

	git clone https://github.com/ippo615/py-atlas-script.git 

Then make sure the script is executable:

	chmod +x make-atlas.py

Running
------------------------------------------------------------------------------
The script accepts data from standard input. I use the ImageMagick command
`identify` to pipe data to it. For example, to list all of the jpg files in
a directory:

	identify -ping -format "%f %w %h\n" *jpg

It will list them like:

	a.jpg 320 240
	b.jpg 32 32
	c.jpg 64 64

That needs to be piped to `make-atlas.py` which will create a file based on
the name you supply and will output the corresponding json to standard out.

Sample Usage
------------------------------------------------------------------------------
Make a atlas named 'atlas.gif' of all of the gifs in the current directory
and write the json data to 'atlas.json'.

	identify -ping -format "%f %w %h\n" *gif | ./make-atlas.py atlas.gif > atlas.json

Somtimes `indentify` runs into problems which print error messages. Those
error messages will mess up the input to the script. You can surpress them
with something like:

	identify -ping -format "%f %w %h\n" *gif 2>/dev/null | ./make-atlas.py atlas.gif > atlas.json

Writing multiple directories to one json file:

	identify -ping -format "%f %w %h\n" flower/* 2>/dev/null | ./make-atlas.py flowers.gif >  atlas.json
	identify -ping -format "%f %w %h\n" tiles/*  2>/dev/null | ./make-atlas.py tiles.gif   >> atlas.json
	identify -ping -format "%f %w %h\n" player/* 2>/dev/null | ./make-atlas.py player.gif  >> atlas.json

The json data can be used in js, check the json output for a better example:

	atlas["flowers.gif"]["flower/flower1.gif"]
	atlas["flowers.gif"]["flower/flower2.gif"]
	atlas["flowers.gif"]["flower/flower3.gif"]
	atlas["flowers.gif"]["flower/flower4.gif"]


