#!/bin/bash

# Start by installing debootstrap
sudo apt-get install debootstrap

# Download the appropriate ubuntu version
# Note: I broke it into 2 steps - the first downloads the packages and
# stores them in tar archive; the second unpacks/installs the packages
# from the archive (instead of from the internet).
sudo debootstrap --variant=minbase --make-tarball=/tmp/trusty.tar trusty /fakeroot http://us.archive.ubuntu.com/ubuntu/
sudo debootstrap --unpack-tarball=/tmp/trusty.tar trusty /fakeroot http://us.archive.ubuntu.com/ubuntu/

# Then you can chroot into it:
# sudo chroot /fakeroot
# Then you can do whatever you want (like apt-get install)
