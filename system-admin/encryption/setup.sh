#!/bin/bash

# Script based on:
# http://www.linux.org/threads/encrypted-containers-without-truecrypt.4478/

# SUDO SUDO SUDO SUDO SUDO SUDO SUDO SUDO
# You need to be run to run this stuff
# SUDO SUDO SUDO SUDO SUDO SUDO SUDO SUDO

# Install dependencies
# apt-get install cryptsetup

# Make a ~256MB file of 0's called /root/test.bin
vault=/root/test.bin
dd if=/dev/zero of=$vault count=500k

# Find an unused loopback device and "connect" the file to it
# This will let us treat the file like a file-system
device=$( losetup -f )
losetup $device $vault

# Skipping partitioning, what could go wrong?
#fdisk $device

# Setup the crypt thing, it will ask you for a passphrase twice
cryptsetup --verbose --verify-passphrase luksFormat $device

# Map the encrypted device so we can store stuff
# You can access the files at /dev/mapper/$mntPoint
mapPoint=vault
cryptsetup luksOpen $device $mapPoint

# Create a filesystem so we can write files to it (we'll use ext4)
mkfs.ext4 -j /dev/mapper/$mapPoint

# Mount the device
mntPoint=vault
mkdir /mnt/$mntPoint
mount /dev/mapper/$mapPoint /mnt/$mntPoint

# Unmount the device
umount /mnt/$mntPoint
