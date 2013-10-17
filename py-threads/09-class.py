#!/usr/bin/python

import threading, time

class ClassWithLongProcess():

	def __init__(self):
		self.progress = 0
		self.isDone = 0

	def doWork(self):
		self.isDone = 0
		for i in range(10000):
			self.progress = i
			time.sleep(0.001)
		self.isDone = 1

	def getProgress(self):
		return self.progress

worker = ClassWithLongProcess()

# Start the work in a new thread
workThread = threading.Thread(target=worker.doWork)
workThread.start()

while not worker.isDone:
	time.sleep(1)
	print '%s of 10000' % worker.getProgress()

print 'Done'
