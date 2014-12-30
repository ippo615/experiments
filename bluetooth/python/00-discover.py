#!/usr/bin/python

import bluetooth

# Lists the names of all the discovered devices
# MAKE SURE YOUR DEVICE IS DISCOVERABLE; otherwise, you will not be
# able to discover it
devices = bluetooth.discover_devices()
for devAddr in devices:
	print bluetooth.lookup_name( devAddr )
