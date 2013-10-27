#!/usr/bin/python

# It can be useful to modify local variables in your decorated function if
# you want to count the number of times a function is called or memoize return
# values, etc...
# This example shows how to create and modify variables in the decorated
# function.

def countCalls(f):

	def newFunc(*args, **kwargs):
		# We need to use our local variable as a property of newFunc
		newFunc.count += 1
		print f.__name__, 'was called', newFunc.count, 'time(s)'
		return f(*args, **kwargs)

	# Make sure you create it outside of newFunc (otherwise it will be reset
	# everytime you called the decorated function)
	newFunc.count = 0

	return newFunc

# Make some decorated functions, notice how the 2 decorated functions accept
# different arguments but can be decorated with 1 decorator.
@countCalls
def doA():
	pass

@countCalls
def doB(b):
	return b

doA()
doB(1)
doA()
doB(5)
doB(9)

# Expected output:
# doA was called 1 time(s)
# doB was called 1 time(s)
# doA was called 2 time(s)
# doB was called 2 time(s)
# doB was called 3 time(s)

