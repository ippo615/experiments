#!/usr/bin/python

# This shows how to decorate a class method. The gist: include `self` as the
# first argument of your returned decorated function.

# This decorator can be used on class methods
def showArgument(f):
	def method(self,x):
		print x
		return f(self,x)
	return method

# A class with a decorated method
class Accumulator():
	def __init__(self):
		self.value = 0

	@showArgument
	def add(self,x):
		self.value += x

# Create a sample to show the decorator in action
x = Accumulator()
x.add(5)
x.add(3)

# Expected output:
# 5
# 3

