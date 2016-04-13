#!/usr/bin/python

import bluetooth
import subprocess


def listBluetoothDeviceAddresses():
	(out,err) = subprocess.Popen(
		['bluez-test-discovery | grep "^\[" | uniq'],
		stdout = subprocess.PIPE,
		shell = True
	).communicate()
	results = out.split('\n')
	return [ r.strip('[ ]') for r in results ]

def isDeviceNear( macAddress ):
	stuff = listBluetoothDeviceAddresses()
	print stuff
	return macAddress in stuff

def lockScreen():
	# To install slock
	#	git clone http://git.suckless.org/slock
	# cd slock
	#	sudo make clean install
	#subprocess.Popen(['slock'])
	pass

if __name__ == '__main__':

	state = 'locked'
	shouldRun = True
	while shouldRun:
		try:		
			if state == 'locked':
				if isDeviceNear( '24:4B:81:7E:0F:05' ):
					state = 'unlocked'
					print state
			elif state == 'unlocked':
				if not isDeviceNear( '24:4B:81:7E:0F:05' ):
					state = 'locked'
					print state
		except KeyboardInterrupt:
			shouldRun = False
