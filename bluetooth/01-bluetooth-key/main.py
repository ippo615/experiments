#!/usr/bin/python

import bluetooth

def isDeviceNear( devName ):
	# Lists the names of all the discovered devices
	# MAKE SURE YOUR DEVICE IS DISCOVERABLE; otherwise, you will not be
	# able to discover it
	devices = bluetooth.discover_devices()
	for devAddr in devices:
		if devName == bluetooth.lookup_name( devAddr ):
			print bluetooth.lookup_name( devAddr )
			return True
	return False


if __name__ == '__main__':

	deviceName = ''
	
	print 'Looking for %s' % deviceName

	for i in range( 10 ):
		if isDeviceNear( deviceName ):
			print '%s is near!' % deviceName
		else:
			print '%s is farr!' % deviceName

	print ''
