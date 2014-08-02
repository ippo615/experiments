#!/usr/bin/python

# We create a decorator which stops the function from running when the keyword
# argument `isCancelled` is `True`.
def cancellable(f):
	def newFunc(*args, **kwargs):
		if kwargs['isCancelled']:
			return
		result = f(*args,**kwargs)
		return result
	return newFunc

# Decorate some functions. Notice that we have to explicity use `**kwargs`
# in the function delcaration; otherwise, python will raise an "unexpected
# keyword argument" error
@cancellable
def step1(x,y,**kwargs):
	print '1'
	return x+y

@cancellable
def step2(**kwargs):
	print '2'
	return 2

# You can cancel either function by passing it `isCancelled=True` 
for i in range(10):
	isCancelled = (5<=i)
	print 'Step: %s' % i
	step1(i,i+1,isCancelled=isCancelled)
	step2(isCancelled=isCancelled)

# Adding `isCancelled=...` to every function call can be tedious
# instead you can create a global cancel state and create a function
# which wraps that state and the call to the decorated functions. Then
# you will not need to pass `isCancelled=...` to every call.
isCancelledGlobal = False
def globalCancel(f):
	def newFunc(*args,**kwargs):
		kwargs['isCancelled']=isCancelledGlobal
		return f(*args,**kwargs)
	return newFunc

# Create the cleaner functions
gStep1 = globalCancel( step1 )
gStep2 = globalCancel( step2 )

print "\nThe cleaner version"
# Run something that we may want to cancel
for i in range(10):
	isCancelledGlobal = (5<=i)
	print 'Step: %s' % i
	gStep1(i,i+1)
	gStep2()
