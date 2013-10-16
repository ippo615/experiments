#!/usr/bin/python

import threading, time


def sleep1():
	"""Waits 1 second between prints"""
	for i in range(0,3):
		time.sleep(1)
		print 'A'
def sleep2():
	"""Waits 2 seconds between prints"""
	for i in range(0,2):
		time.sleep(2)
		print 'B'

# Setup 1 thread to run each function
threadA = threading.Thread(target=sleep1)
threadB = threading.Thread(target=sleep2)

# Start running A and B
threadA.start()
threadB.start()

print 'Done'

# The output should always be: (my comments after --)
# Done  -- does not wait for either thread to finish
# A     -- after 1 second
# AB    -- after 2 seconds (both a and b are run at the same time)
#       -- this is the newline form the other one
# A     -- after 3 seconds
# B     -- after 4 seconds

