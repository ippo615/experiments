#!/usr/bin/python

# The `Cancelled` exception will be used to stop the execution. We can
# easily determine if an error raises is a cancellation or a problem.
class Cancelled(Exception):
	def __init__(self,message=""):
		Exception.__init__(self,"User cancelled action - %s"%message)

# The progress class is used for monitoring the progress of loops.
# It contains a `.count(start,stop,step)` method for iterating. When its
# `cancel()` method is called it raises a `Cancelled` exception.
class Progress():
	""" Monitors the progress of functions and allows full cancellation """
	def __init__(self, message=""):
		# Setup
		self.nSteps = 1
		self.stepIndex = 0
		self.index = 0
		self.start = 0
		self.stop = 0
		self.step = 1
		self.delta = 1
		# Progress status
		self.percent = 0.0
		self.isStarted = False
		self.isCancelled = False
		self.isFinished = False
		self.message = message
		self.cancelMessage = ""
		# For controlling/being part of a larger process
		self.parent = None
		self.subs = []

	def _start(self,start,stop,step):
		self.nSteps = (stop-start)/step
		self.stepIndex = 0
		self.index = start
		self.start = start
		self.stop = stop
		self.step = step
		self.delta = 100*float(step)/float(stop-start)
		self.isStarted = True

	def sub(self,message=""):
		child = Progress(message=message)
		child.parent = self
		self.subs.append( child )
		return child
	
	def getStatus(self,indent=0):
		statusMarker = ' '
		if self.isFinished and not self.isCancelled:
			statusMarker = 'X'
		elif self.isCancelled:
			statusMarker = '!'
		elif self.isStarted:
			statusMarker = '-'

		status = '%s[%s] %s -- %.2f%%\n' % (' '*indent,statusMarker,self.message,self.percent)
		for child in self.subs:
			status += '%s' % child.getStatus(indent+2)
		return status

	def count(self,start,stop,step=1):
		self._start(start,stop,step)
		for i in range(self.start,self.stop,self.step):
			if self.isCancelled:
				raise Cancelled(self.cancelMessage)
			self.stepIndex += 1
			self.percent += self.delta
			yield i
		self.isFinished = True

	def cancel(self,message=""):
		self.isCancelled = True
		self.cancelMessage = message
		for child in self.subs:
			child.cancel(message)

	def raiseCancel(self):
		raise Cancelled(self.cancelMessage)

	def finish(self):
		self.isFinished = True

# We create a decorator which stops the function from running when the keyword
# argument `isCancelled` is `True`.
def cancellable(f):
	def newFunc(*args, **kwargs):
		if kwargs['progress'] and kwargs['progress'].isCancelled:
			kwargs['progress'].raiseCancel()
		result = f(*args,**kwargs)
		return result
	return newFunc

@cancellable
def add(x,y,**kwargs):
	return x+y
@cancellable
def sub(x,y,**kwargs):
	return x-y

# We clean it for local stuff
def doMath(x,y):
	progress = Progress("Doing some math")
	def cleanCancel(f):
		def newFunc(*args,**kwargs):
			kwargs['progress']=progress
			return f(*args,**kwargs)
		return newFunc

	add = cleanCancel(globals()['add'])
	sub = cleanCancel(globals()['sub'])

	print add(x,y)
	print sub(x,y)
	progress.cancel()
	print add(x,y)

try:
	doMath(1,2)
except Cancelled:
	print "The math was cancelled"

# We clean it for local stuff
import functools
def doMath2(x,y):
	progress = Progress()
	add = functools.partial(globals()['add'],progress=progress)
	sub = functools.partial(globals()['sub'],progress=progress)

	print add(x,y)
	print sub(x,y)
	progress.cancel()
	print add(x,y)

try:
	doMath2(1,2)
except Cancelled:
	print "The math was cancelled"

task = Progress("Doing some work")
try:
	for i in task.count(0,10):
		if i == 7:
			task.cancel()
except Cancelled:
	print "The task was cancelled"

def controller(cancelMessage=''):
	def decorator(f):
		def newFunc(*args,**kwargs):
			try:
				result = f(*args,**kwargs)
			except Cancelled:
				if cancelMessage:
					print cancelMessage
				else:
					print "The function was cancelled"
			except:
				print "There was an error"
				raise
			else:
				return result
		return newFunc
	return decorator

def onException(exceptionClass,message=''):
	def decorator(f):
		def newFunc(*args,**kwargs):
			try:
				result = f(*args,**kwargs)
			except exceptionClass:
				if message:
					print message
			except:
				raise
			else:
				return result
		return newFunc
	return decorator

def onGeneralException(message=''):
	def decorator(f):
		def newFunc(*args,**kwargs):
			try:
				result = f(*args,**kwargs)
			except:
				print message
			else:
				return result
		return newFunc
	return decorator

# When applying multiple exception handling decorators the "lower" one takes
# precidence. Put the most general at the top and then get more specific.
@onGeneralException("An error occured")
@onException(Cancelled,"The math was cancelled")
def math():
	doMath2(1,2)

math()

def returnsStr(f):
	def newFunc(*args,**kwargs):
		result = f(*args,**kwargs)
		return 'Result: %s' % result
	return newFunc

def doMathComplete(x,y):
	progress = Progress()
	add = functools.partial(globals()['add'],progress=progress)
	sub = functools.partial(globals()['sub'],progress=progress)

	add(x,y)
	sub(x,y)
	return add(x,y)

@onGeneralException("An error occured")
@onException(Cancelled,"The math was cancelled")
@returnsStr
def mathA():
	return doMathComplete(5,5)

print mathA()