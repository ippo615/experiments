#!/usr/bin/python

import threading, time

class DaemonProcess():

	def __init__(self):
		self.progress = 0
		self.thread = None
		self.shouldStop = False

	def doWork(self):
		while not self.shouldStop:
			print 'Progress %s' % self.progress
			time.sleep(1)
			self.progress += 1

	def getProgress(self):
		return self.progress

	def start(self):
		self.shouldStop = False
		self.thread = threading.Thread(target=self.doWork)
		self.thread.daemon = True
		self.thread.start()

	def stop(self):
		self.shouldStop = True
		

worker = DaemonProcess()
worker.start()

for i in range(0,10):
	time.sleep(1)

print 'Done'
