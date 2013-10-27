#!/usr/bin/python

# This example shows WHY you would want to use decorators.
# Consider a math library. You may want your functions to handle single
# arguments or arrays. A decorator makes it easy.

# Without a decorator
def noAdd(x,y):
	# If we don't have single values - add the corresponding values in x,y
	if not isinstance(x, (basestring,int,float)) and not isinstance(y, (basestring,int,float)):
		result = []
		for i in range(len(x)):
			result.append( x[i] + y[i] )
		return result
	# Others just add x and y
	return x+y

# noAdd(5,10) == 15
# noAdd([0,1],[1,2]) == [1, 3]

# Create the decorator
def handleArray(f):
	def newFunc(x,y):
		# If array - apply f to each element
		if not isinstance(x, (basestring,int,float)) and not isinstance(y, (basestring,int,float)):
			result = []
			for i in range(len(x)):
				result.append( f(x[i],y[i]) )
			return result
		# If not array just apply to the arguemnts
		return f(x,y)
	return newFunc

# Notice how much simpler and clearer our add function is
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

