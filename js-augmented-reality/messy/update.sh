#!/bin/bash

# Copy a new stl file if we made one
srcStlFilename=/home/andrew/Downloads/openjscad.stl
if [ -e $srcStlFilename ] ; then
	cp $srcStlFilename .
	rm $srcStlFilename
fi

python -m SimpleHTTPServer
