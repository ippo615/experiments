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

	nearby_devices = bluetooth.discover_devices(
		duration=8,
		lookup_names=True,
		flush_cache=True,
		#lookup_class=False
	)

	print("found %d devices" % len(nearby_devices))

	for addr, name in nearby_devices:
		try:
			print("  %s - %s" % (addr, name))
		except UnicodeEncodeError:
			print("  %s - %s" % (addr, name.encode('utf-8', 'replace')))
