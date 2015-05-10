import time

import serial

# Establish the connection on a specific port
print 'Openning serial port /dev/ttyACM0 at 9600 baud'
connection = serial.Serial('/dev/ttyACM0', 9600)
connection.readline()
print 'Openned serial port'

while True:

	# Send each of the 5 durations (1-5) 10 times (ie 10 flashes)
	# I haven't had much luck with python byte indicators ie '\x5C'
	for t in '12345':
		for i in range(0,10):

			# Send the data and wait for a single character response
			connection.write(t)
			connection.read()
