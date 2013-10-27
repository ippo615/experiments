#!/usr/bin/python

# Define a decoration which prints comments around the output of a function
def myDecorator(f):
	def newFunction():
		print 'Starting...'
		f()
		print 'Stopping...'
	return newFunction

# Decorate funcA 
@myDecorator
def funcA():
	print 'This is function A'

@myDecorator
def funcB():
	print 'This is function B'


# Call functions A and B
funcA()
funcB()

# ----------------------- Expected output:
# Starting...
# This is function A
# Stopping...
# Starting...
# This is function B
# Stopping...
