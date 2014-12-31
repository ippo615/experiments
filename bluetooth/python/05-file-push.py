#!/usr/bin/python

import subprocess
import bluetooth

# This program cheats by relying on the `ussp-push` program
# You can install that with `sudo apt-get install ussp-push`

def find_device_address_by_name(name):
	devices = bluetooth.discover_devices()

	for devAddr in devices:
		if name == bluetooth.lookup_name( devAddr ):
			return devAddr

	raise ValueError( 'Could not file device named: %s' % name )

def get_service_info( deviceName, serviceName ):

	target = find_device_address_by_name(deviceName)
	services = bluetooth.find_service(address=target)

	for svc in services:
		if svc['host'] == target and svc['name'] == serviceName:
			return (svc['host'], svc['port'])
	
	raise ValueError('Could not find "%s" service on %s' % (
		serviceName,
		deviceName
	))

#host,port = get_service_info( 'YP-G1', 'Object Push' )
#host,port = get_service_info( 'YP-G1', 'OBEX File Transfer' )

# The device MUST be discoverable for this method to push a file
def push_file_to_device( deviceName, localFile, remoteFile='' ):
	if remoteFile == '':
		remoteFile = localFile

	host,port = get_service_info( deviceName, 'Object Push' )
	push_file( host, port, localFile, remoteFile=remoteFile )

# This method works without requiring a device be discovered but you
# need to know the host (mac address) and the port (port), you can find
# them by running the example: `./03-discover-services.py`
def push_file( host, port, localFile, remoteFile='' ):
	(out,err) = subprocess.Popen([
		'ussp-push',
		'%s@%s' % (host,port),
		localFile,
		remoteFile
	],stdout=subprocess.PIPE,stderr=subprocess.PIPE).communicate()

def test_device_name():
	import sys

	device = sys.argv[1]
	localFile = sys.argv[2]
	if len( sys.argv ) > 3:
		remoteFile = sys.argv[3]
	else:
		remoteFile = ''

	push_file_to_device( device, localFile, remoteFile )


if __name__ == '__main__':
	#test_device_name()
	push_file( '20:13:E0:C5:1A:62', 2, 'readme.md', 'readme.txt' )
