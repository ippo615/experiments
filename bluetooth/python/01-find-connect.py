#!/usr/bin/python

import bluetooth

# MAKE SURE YOUR DEVICE IS DISCOVERABLE; otherwise, you will not be
# able to discover it
def find_device_address_by_name(name):

	devices = bluetooth.discover_devices()

	for devAddr in devices:
		if deviceName == bluetooth.lookup_name( devAddr ):
			return devAddr

	if deviceAddress is None:
		raise ValueError( 'Could not file device named: %s' % name )

deviceName = 'YP-G1'
addr = find_device_address_by_name( deviceName )
print 'Found %s at %s' % (deviceName,addr)
