#!/usr/bin/python

import threading, time

def countTo(x,delay):
	for i in range(x):
		print i
		time.sleep(delay)

# 4hz thread is the same as running `countTo(4,0.25)`
thread4hz = threading.Thread(target=countTo,args=(4,0.25))
# 10hz thread is the same as running `countTo(4,0.1)`
thread10hz = threading.Thread(target=countTo,args=(4,0.1))

thread4hz.start()
thread10hz.start()


