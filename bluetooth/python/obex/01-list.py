#!/usr/bin/python

# This required PyOBEX, to get:
# wget https://pypi.python.org/packages/source/P/PyOBEX/PyOBEX-0.10.zip
# unzip PyOBEX-0.10.zip 
# cp -pr PyOBEX-0.10/PyOBEX/ .
# rm -r PyOBEX-0.10/ PyOBEX-0.10.zip

import bluetooth
from PyOBEX.client import BrowserClient

def find_device_address_by_name(name):
	devices = bluetooth.discover_devices()

	for devAddr in devices:
		if name == bluetooth.lookup_name( devAddr ):
			return devAddr

	raise ValueError( 'Could not file device named: %s' % name )

def get_service_info( deviceName, serviceName ):

	address = find_device_address_by_name(deviceName)
	services = bluetooth.find_service(address=address)

	for svc in services:
		if svc['host'] == address and svc['name'] == serviceName:
			return (address,svc['port'])
	
	raise ValueError('Could not find "%s" service on %s' % (
		serviceName,
		deviceName
	))

(address,port) = get_service_info( 'YP-G1', 'OBEX File Transfer' )
#(address,port) = get_service_info( 'YP-G1', 'Object Push' )

client = BrowserClient(address, port)
print client.connect()
#print client.capability().data
print client.listdir().data
print client.disconnect()
