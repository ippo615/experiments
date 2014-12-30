#!/usr/bin/python

import bluetooth

def find_device_address_by_name(name):
	devices = bluetooth.discover_devices()

	for devAddr in devices:
		if name == bluetooth.lookup_name( devAddr ):
			return devAddr

	raise ValueError( 'Could not file device named: %s' % name )

def service_connect( deviceName, serviceName ):

	target = find_device_address_by_name(deviceName)
	services = bluetooth.find_service(address=target)

	for svc in services:
		print 'Device Name: %s' % bluetooth.lookup_name(svc['host'])
		print 'Service Name: %s'    % svc['name']
		print '    Host:        %s' % svc['host']
		print '    Description: %s' % svc['description']
		print '    Provided By: %s' % svc['provider']
		print '    Protocol:    %s' % svc['protocol']
		print '    channel/PSM: %s' % svc['port']
		print '    svc classes: %s' % svc['service-classes']
		print '    profiles:    %s' % svc['profiles']
		print '    service id:  %s' % svc['service-id']
		print ''

		if svc['host'] == target and svc['name'] == serviceName:
			print 'Connecting to OBEX File Transfer thingy...'

			protocols = {
				'RFCOMM': bluetooth.RFCOMM,
				'L2CAP': bluetooth.L2CAP
			}

			sock=bluetooth.BluetoothSocket( protocols[svc['protocol']] )
			sock.connect((svc['host'], svc['port']))
			return sock
	
	raise ValueError('Could not find "%s" service on %s' % (
		serviceName,
		deviceName
	))

sock = service_connect( 'YP-G1', 'OBEX File Transfer' )
print dir(sock)
print sock.send("hello!!")
print sock.close()
