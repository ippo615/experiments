# USB GPIO

This uses Adafruit's FT232H. Their guide is a great place to start:
https://learn.adafruit.com/adafruit-ft232h-breakout/overview
I'll do something similar here

## Serial Connection

You do not need to install anything for the serial connection to work.
Just connect it to the USB port of your computer. You can list the
tty devices before and after connecting the board to find the added
device:

	ls /dev/tty*

Or make sure your device is not connected and follow:

	oldTTY=$(ls /dev/tty*)
	# connect your device now
	newTTY=$(ls /dev/tty*)
	diff <(echo "$oldTTY") <(echo "$newTTY") | grep '>' | sed -e 's/>.//g'

For me it was `/dev/ttyUSB0`. I could connect to the serial connection
with:

	screen /dev/ttyUSB0 9600

## 

