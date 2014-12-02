#!/bin/bash

# NOTE: You'll need to run this as root
# NOTE: If you have a 64 bit OS be sure to copy the lib64 folder too!

# Create the fake root directory and fill it with the important directories.
mkdir /usr/fakeroot
cd /usr/fakeroot
mkdir bin etc lib lib64 var home

# We need to put executables in /bin and their libraries in /lib
# normally you want to be selective but I'm being lazy and just copying
# everything
cp -r /bin /usr/fakeroot/
cp -r /etc /usr/fakeroot/
cp -r /lib /usr/fakeroot/
cp -r /lib64 /usr/fakeroot/
cp -r /var /usr/fakeroot/
cp -r /home /usr/fakeroot/

# A minimal Ubuntu system has the following directory sizes:
# du -h /bin -> 9.6M
# du -h /etc -> 4.4M
# du -h /lib -> 284M
# du -h /var -> 269M
# du -h /home -> 172K

# After you've setup the chroot you can start it by running
# chroot /usr/fakeroot

# You'll be missing a lot of functionality but you'll have access to
# a shell and some other utilities (not very many).

