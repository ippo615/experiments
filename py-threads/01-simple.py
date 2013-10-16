#!/usr/bin/python

import threading

# These 2 functions will be run in separate threads
def functionA():
	for i in range(0,3):
		print 'A'
def functionB():
	for i in range(0,2):
		print 'B'

# Setup 1 thread to run each function
threadA = threading.Thread(target=functionA)
threadB = threading.Thread(target=functionB)

# Start running the threads
threadA.start()
threadB.start()

# Note the output varies from run to run.
# You may have a ABBAA or AAABB or BBAAA or something else entirely.
# The only thing that is guarenteed is that there will be 3 A's and 4 B's.
