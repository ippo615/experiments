#!/usr/bin/python

import threading, time

# This is a global variable to hold our current progress
progress = 0

# This is a long running function that updates it's progress
def longProcess():
	global progress
	for i in range(10000):
		time.sleep(0.0001)
		progress = i

# This function monitor's the other's progress
def getProgress():
	global progress
	while progress < 9999:
		print progress
		time.sleep(0.3)

# Create a separate thread for the worker and the monitor
threadProgress = threading.Thread(target=getProgress)
threadWork = threading.Thread(target=longProcess)

# Start the worker and monitor
threadWork.start()
threadProgress.start()

# Wait for the work to finish
threadWork.join()
print 'Done'

# You should see a list of numbers printing followed by 'Done'
