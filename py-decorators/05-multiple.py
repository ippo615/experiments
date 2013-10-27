#!/usr/bin/python

# I intended to figure out how to apply multiple decorators to a function
# but realized I was approaching the wrong problem. This still is some nifty
# code.

# Create the decorator
def handleArrayOrDict(f):
	def newFunc(x,y):

		# If array - apply f to each element
		if not isinstance(x, (basestring,int,float,dict)) and not isinstance(y, (basestring,int,float,dict)):
			result = []
			for i in range(len(x)):
				result.append( f(x[i],y[i]) )
			return result

		# If dict - apply to matching keys
		elif isinstance(x, dict) and isinstance(y, dict):
			result = dict()
			for key in x:
				if key in y:
					result[key] = f(x[key],y[key])
			return result

		# If not array just apply to the arguemnts
		else:
			return f(x,y)

	return newFunc

# Notice how much simpler and clearer our add function is
@handleArrayOrDict
def add(x,y):
	return x+y

@handleArrayOrDict
def sub(x,y):
	return x-y

print add(5,10)
print add(dict(a=1,b=2),dict(a=3,b=4))
print add([0,1],[1,2])

print sub(5,10)
print sub(dict(a=1,b=2),dict(a=3,b=4))
print sub([0,1],[1,2])

# Expected output:
# 15
# {'a': 4, 'b': 6}
# [1, 3]
# -5
# {'a': -2, 'b': -2}
# [-1, -1]

