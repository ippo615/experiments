import time

import serial

# Establish the connection on a specific port
print 'Openning serial port /dev/ttyACM0 at 9600 baud'
connection = serial.Serial('/dev/ttyACM0', 9600)
connection.readline()
print 'Openned serial port'

# Send each of these characters to the arduino one at a time
characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
while True:

	for c in characters:

		# Send data
		connection.write(c)
		print 'Sent: %s' % c

		# Recieve data
		recieved = connection.read()
		print 'Recieved: %s' % recieved

		# Check the recieved data
		if recieved == c:
			print 'Good\n'
		else:
			print 'Oops, that does not agree\n'

		# ~10 Characters per second
		time.sleep(0.10)

