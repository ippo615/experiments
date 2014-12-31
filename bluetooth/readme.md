# Bluetooth

## Installation

The default Ubuntu 14.04 bluetooth installation worked but does not
come with useful developer tools. To install the bluez (the Linux
bluetooth protocol stack) and some utilities run:

	sudo apt-get install bluez bluez-utils

## Starting the Bluetooth Service

To start the bluetooth service run:

	sudo service bluetooth start

## Stopping the Bluetooth Service

To stop the bluetooth service run:

	sudo service bluetooth stop

## Is bluetooth running?

To see if the bluetooth service is running use:

	sudo service --status-all 2>/dev/null | grep bluetooth

You will see one of (the stuff in parenthesis is my explaination of the
output):

	 [ + ]  bluetooth (it is running)
	 [ - ]  bluetooth (it is not running)
	 [ ? ]  bluetooth (unknown)

## Listing Bluetooth Radios

Run:

	hcitool dev

It will produce output similar to:

	Devices:
		hci0	48:2D:AA:BB:CC:03

## Finding Bluetooth Devices

Run:

	hcitool scan

It will list the devices that are nearby and discoverable.

## TODO

Having knowledge of D-BUS seems like it would be helpful. I'm taking a
break from bluetooth specifically to look at D-BUS (not the car).

I failed the D-BUS mission; it seems too complicated and not worth the
effort.

## File Transfer

OBject EXchange (or OBEX) lets you transfer file to and from bluetooth
enabled devices. To use it on the command line you need to install
ussp-push:

	sudo apt-get install ussp-push

Then (assuming your device ID is 20:13:E0:C5:1A:62). `2` is the port
that is setup for file pushing:

	ussp-push 20:13:E0:C5:1A:62@2 ./readme.md readme.txt

## Method with Extra Useless Steps

Create a port:

	sudo rfcomm bind /dev/rfcomm0 20:13:E0:C5:1A:62

Restart the bluetooth service:

	sudo service bluetooth stop
	sudo service bluetooth start

Send a file:

	ussp-push --dev /dev/rfcomm0 20:13:E0:C5:1A:62@2 ./readme.md readme.txt

## More Reading Material

http://wiki.openmoko.org/wiki/Manually_using_Bluetooth
http://lightblue.sourceforge.net/
http://grefab.blogspot.com/2012/09/am-i-there-raspberry-pi-and-bluetooth.html

