#!/usr/bin/python

# This is an example showing how to 'manually' created 'decorated'
# functions instead of using the @ notation

# Define a decoration which prints comments around the output of a function
def myDecorator(f):
	def newFunction():
		print 'Starting...'
		f()
		print 'Stopping...'
	return newFunction

# Make 2 undercorated functions
def plainA():
	print 'This is function A'

def plainB():
	print 'This is function B'

# Create the decorated versions
decoratedA = myDecorator(plainA)
decoratedB = myDecorator(plainB)

# Call functions A and B
decoratedA()
decoratedB()

# ----------------------- Expected output:
# Starting...
# This is function A
# Stopping...
# Starting...
# This is function B
# Stopping...
