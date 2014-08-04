#!/bin/bash

# ------------------------------------------------------------ [ Renaming ] - 
# I had to clean a bunch of image filenames. I found that running the
# following 3 commands (several times) gave them better names. 
# The `-execdir` option is import for preventing race conditions (or so it
# seems) when running those commands. By removing it you will randomly get
# lots of "File not found" errors.

# Make all of the filenames lowercase
find . -depth -execdir rename 's/(.*)\/([^\/]*)/$1\/\L$2/' "{}" \;

# Remove any odd puncuaiton/spaces etc...
find . -depth -execdir rename 's/[- _!@#%^&*()\$\[\]<>,~`]+/-/g' "{}" \;

# Get rid of apostrophes
find . -depth -execdir rename "s/'/-/g" "{}" \;

# ------------------------------------------------------- [ Data Checking ] - 
# In addition I wanted to check that the JPEGs were valid and I wanted
# to compute checksums for everyfile (for data integrety checking later)

find . -print0 | xargs -0 jpeginfo -c | tee 'file_jpeg_info'
md5sum -b $(find .) | tee file_checksum
