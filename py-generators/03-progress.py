#!/usr/bin/python

class Progress():
	""" Monitors the progress of functions and allows full cancellation """
	def __init__(self, message=""):
		# Setup
		self.nSteps = 1
		self.stepIndex = 0
		self.index = 0
		self.min = 0
		self.max = 0
		self.step = 1
		self.delta = 1
		# Progress status
		self.percent = 0.0
		self.isStarted = False
		self.isCancelled = False
		self.isFinished = False
		self.message = message
		# For controlling/being part of a larger process
		self.parent = None
		self.subs = []

	def _start(self,min,max,step):
		self.nSteps = (max-min)/step
		self.stepIndex = 0
		self.index = min
		self.min = min
		self.max = max
		self.step = step
		self.delta = 100*float(step)/float(max-min)
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

	def count(self,min,max,step=1):
		self._start(min,max,step)
		for i in range(self.min,self.max,self.step):
			if self.isCancelled:
				break
			self.stepIndex += 1
			self.percent += self.delta
			yield i
		self.isFinished = True

	def cancel(self):
		self.isCancelled = True
		for child in self.subs:
			child.cancel()

	def finish(self):
		self.isFinished = True

task1 = Progress("Updating something")
for x in task1.count(0,100,1):
	print task1.getStatus()

task2 = Progress("Parent Task")
task2a = task2.sub("Sub A")
task2aa = task2a.sub("Nested Sub A")
task2ab = task2a.sub("Nested Sub B")
task2ac = task2a.sub("Nested Sub C")
task2b = task2.sub("Sub B")
task2c = task2.sub("Sub C")
for x in task2a.count(0,10):
	print task2.getStatus()
for x in task2aa.count(-1,-3,-1):
	print task2.getStatus()
for x in task2ab.count(-1,2,1):
	print task2.getStatus()
task2a.cancel()
for x in task2ac.count(-10,-9):
	print task2.getStatus()
for x in task2b.count(0,2):
	print task2.getStatus()
for x in task2c.count(5,10):
	print task2.getStatus()

task2.finish()
print task2.getStatus()