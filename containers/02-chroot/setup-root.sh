#!/bin/bash

# NOTE: You'll need to run this as root

rootdir="$1"

# Create the director for the fake root
mkdir "$rootdir"

# Copy all the executable files (anything that can be found in the
# user's PATH variable)
while IFS=':' read -ra path; do
	for i in "${path[@]}"; do
		cp -Pr "$i" "$rootdir"
	done
done <<< "$PATH"

# Copy all the library files
cp -Pr /lib "$rootdir"
cp -Pr /lib64 "$rootdir"

# Running the code above will give a minimal copy of your current setup.
# Lots of things (like apt) will be broken.

# These are some extras which help with certain programs like apt.
# NOTE: apt doesn't actually work, it just gets closer to working.

cp -Pr /usr/lib "$rootdir/usr/lib"
cp -Pr /etc "$rootdir"

# Run this script with:
# sudo ./setup-root.sh /path/to/fakeroot
#
# Then enter the chroot with
# sudo chroot /path/to/fakeroot
