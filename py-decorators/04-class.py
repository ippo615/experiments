#!/usr/bin/python

# You can also use a class as a decorator. It must have a __call__
# attribute (ie it must be callable). 

# Create the decorator
class handleArray():

	def __init__(self,f):
		self.f = f

	def __call__(self,x,y):
		# If array - apply f to each element
		if not isinstance(x, (basestring,int,float)) and not isinstance(y, (basestring,int,float)):
			result = []
			for i in range(len(x)):
				result.append( self.f(x[i],y[i]) )
			return result
		# If not array just apply to the arguemnts
		return self.f(x,y)


@handleArray
def add(x,y):
	return x+y

@handleArray
def sub(x,y):
	return x-y

print add(5,10)
print add([0,1],[1,2])

print sub(5,10)
print sub([0,1],[1,2])

# Expected output:
# 15
# [1, 3]
# -5
# [-1, -1]

