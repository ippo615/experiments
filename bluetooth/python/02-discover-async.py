#!/usr/bin/python

# From:
# https://code.google.com/p/pybluez/source/browse/examples/simple/asynchronous-inquiry.py

# This should list devices asycronously; however, it only lists one
# result and exits (or crashes). 

import bluetooth
import select

class MyDiscoverer(bluetooth.DeviceDiscoverer):

	def pre_inquiry(self):
		self.done = False

	def device_discovered(self, address, device_class, name):
		print '%s - %s' % (address, name)

	def inquiry_complete(self):
		pass
		#self.done = True

d = MyDiscoverer()
d.find_devices(lookup_names = True)

readfiles = [ d, ]

while True:
	#rfds = select.select( readfiles, [], [] )[0]

	#if d in rfds:
		d.process_event()

	d.process_event()

	if d.done: break
