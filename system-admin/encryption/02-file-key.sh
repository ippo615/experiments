#!/bin/bash

keyFile=/root/key1.bin
vault=/root/test1.bin
mapPoint=vault1 #/dev/mapper/$mapPoint
mntPoint=vault1 #/mnt/$mntPoint

# Generate 
dd if=/dev/urandom of=$keyFile bs=1 count=1k

# Make a ~256MB file of 0's called /root/test.bin
dd if=/dev/zero of=$vault count=500k

# Find an unused loopback device and "connect" the file to it
# This will let us treat the file like a file-system
device=$( losetup -f )
losetup $device $vault

# Skipping partitioning, what could go wrong?
#fdisk $device

# Setup the crypt thing, it will ask you for a passphrase twice
cryptsetup --verbose luksFormat $device $keyFile

# Map the encrypted device so we can store stuff
# You can access the files at /dev/mapper/$mntPoint
cryptsetup luksOpen $device $mapPoint --key-file $keyFile

# Create a filesystem so we can write files to it (we'll use ext4)
mkfs.ext4 -j /dev/mapper/$mapPoint

# Mount the device
mkdir /mnt/$mntPoint
mount /dev/mapper/$mapPoint /mnt/$mntPoint

# Unmount the device
# umount /mnt/$mntPoint
# losetup -d $device
