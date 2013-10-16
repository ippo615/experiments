#!/usr/bin/python

import threading

def functionA():
	for i in range(0,3):
		print 'A'
def functionB():
	for i in range(0,2):
		print 'B'

# Setup A to run after 1 second and B to run after 2
# NOTICE: the Timer does not use keywords arguments (target=...)
threadA = threading.Timer(1.0,functionA)
threadB = threading.Timer(2.0,functionB)

# Start running A and B
threadA.start()
threadB.start()

print 'Done'

# The output should always be: (my comments after --)
# Done  -- does not wait for either thread to finish
# A     -- after 1 second
# A     -- 
# A     -- 
# B     -- after 2 seconds
# B     -- 

