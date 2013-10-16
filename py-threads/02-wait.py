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

# Start running A - and wait for it to finish
threadA.start()
threadA.join()

# Run B and wait for it to finish
threadB.start()
threadB.join()

print 'Done'

# The output should always be: A A A B B Done (but each on a newline)
