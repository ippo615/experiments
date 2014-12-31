#!/bin/bash

# I did not find minicom useful but if you want to use to use minicom
# to communicate with a bluetooth device this will set it up.

device=00:11:22:33:44:FF

# Create the configuration for the serial port
cat << EOF > /etc/bluetooth/rfcomm.conf
rfcomm0 {
	bind no;
	device $device;
	channel	1;
	comment "Example Bluetooth device";
}
EOF

# Restart the bluetooth service
service bluetooth restart

# Create the serial device
rfcomm bind /dev/rfcomm0

# connect using minicom
minicom --device=/dev/rfcomm0
