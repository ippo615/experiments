#!/usr/bin/python

import sys

# Get the name of the function
def functionName():
	return sys._getframe().f_code.co_name

print functionName()

# How does it work when decorated?
def decorate( f ):
	def newFunc():
		return f()
	return newFunc

@decorate
def decoratedFunctionA():
	return sys._getframe().f_code.co_name

@decorate
def decoratedFunctionB():
	return sys._getframe().f_code.co_name

print decoratedFunctionA()
print decoratedFunctionB()

def lock(f):
	def locked():
		print f.__name__
		return f()
	return locked

@lock
def xyz():
	return 1

@lock
def abc():
	return 1

xyz()
abc()

