#!/usr/bin/python

import time

# This example shows how to pass arbitrary arguments through a decorator.

# This decorator will print the function time and the time that elapses
# between the start and end of the function call.
def showTime(f):
	# You need to use *args and **kwargs as shown below to pass any argument
	def newFunc(*args, **kwargs):
		start = time.time()
		# This is how you call the original function with the arguments
		result = f(*args,**kwargs)
		end = time.time()
		print f.__name__, 'ran in:', end-start
		return result
	return newFunc

# Make some decorated functions, notice how the 2 decorated functions accept
# different arguments but can be decorated with 1 decorator.
@showTime
def waitASecond():
	time.sleep(1)

@showTime
def waitAWhile(seconds):
	time.sleep(seconds)

waitASecond()
waitAWhile(1)
waitAWhile(0.5)
waitAWhile(2.3)

# Example output: (your exact numbers numbers may be different
# waitASecond ran in: 1.00108408928
# waitAWhile ran in: 1.00106978416
# waitAWhile ran in: 0.500577926636
# waitAWhile ran in: 2.30238699913



