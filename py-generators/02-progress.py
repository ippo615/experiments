#!/bin/python

# Measuring the progress of loops (or iterators) is very useful. Having the 
# ability to cancel within the loop is also useful. The naive way is very
# messy:
isCancelled = False
progress = 0
for i in range(0,10):
	if isCancelled:
		break
	progress = float(i) / 10.0

# We can put this logic in a class and the class can use a generator to
# create the iteration process. The class is shown below. It supports
# cancelling via the `.cancel` method. It also keeps track of the percent
# completed in the `.percent` variable and can track if it has finished or
# not with the `isFinished` flag. The `.count(min,max,step=1)` can be used
# like python's built-in `range()` iterator.
class Progress():
	def __init__(self, min=0, max=1, step=1):
		self.nSteps = (max-min)/step
		self.stepIndex = 0
		self.index = min
		self.min = min
		self.max = max
		self.step = step
		self.delta = float(max-min)/float(step)
		self.percent = 0.0
		self.isCancelled = False
		self.isFinished = False

	def count(self,min,max,step=1):
		self.__init__(min,max,step)
		for i in range(self.min,self.max,self.step):
			if self.isCancelled:
				break
			self.stepIndex += 1
			self.percent += self.delta
			yield i
		self.isFinished = True

	def cancel(self):
		self.isCancelled = True

# Here's a simple example. You only have to add 1 line and replace `range`
# with `progress.count`:
progress = Progress()
for x in progress.count(0,10):
	print '%s -- %.2f%%' % (x, progress.percent)
print 'Is Finished: %s' % progress.isFinished

# Here's an exmaple of cancelling. Note cancelling would probably happen in
# a different thread so you would really have 2 fewer lines of code:
progress = Progress()
for x in progress.count(0,10):
	if x == 5:            # This cancelling should happen
		progress.cancel() # in another thread
	print '%s -- %.2f%%' % (x, progress.percent)
print 'Is Finished: %s' % progress.isFinished

