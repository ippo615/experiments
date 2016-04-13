import time
import random
import threading
from Queue import Queue

class Pipeline():
	"""
	This is a generic pipeline class. You can pass data in and share
	it in 2 threads. The idea is to have a temporary storage for the
	computations for the next action. If an error occurs in the
	current action then it will go bad and recompute the data;
	otherwise, 
	"""

	def __init__(
		self,
		prepare,
		action,
		onEmpty = lambda x:x,
		maxsize = 0
	):
		self.queue = Queue( maxsize )
		self.waitingData = None
		self.prepped = None
		self.action = action
		self.prepare = prepare
		self.onEmpty = onEmpty

	def append(self,thing):
		self.queue.put( thing )

	def extend(self,things):
		for thing in things:
			self.append( thing )

	def complete( self ):
		# Stuff was good, load the next
		print 'prevoius finished with success'
		self.action( self.prepped, self )
		if self.queue.qsize() > 0:
			self.waitingData = self.queue.get()
			self.prepped = self.prepare( self.waitingData, self )
		else:
			self.onEmpty( self )

	def fail( self ):
		# Stuff was bad, reprocess before sending
		print 'prevoius finished with failure, recomputing'
		self.action( self.prepare( self.waitingData, self ), self )
		self.waitingData = self.queue.get()
		self.prepped = self.prepare( self.waitingData, self )

	def start( self ):
		self.prepped = self.prepare( self.queue.get(), self )
		self.complete()

	def hasData( self ):
		return self.queue.qsize() != 0

if __name__ == '__main__':

	def action_print( data, pipeline ):
		print data

	def prepare_to_string( data, pipeline ):
		print 'Preparing: %s' % data
		return '%s blah' % data

	def onEmpty( pipeline ):
		print 'Pipeline empty'

	pipeline = Pipeline( prepare_to_string, action_print, onEmpty )
	shouldRun = True

	def producer():
		for i in range( 0, 10 ):
			print 'Appending %s' % i
			pipeline.append(i)
			time.sleep(1)

	def consumer():
		while shouldRun:
			while pipeline.hasData():
				print 'Still consuming'
				random.choice([ pipeline.complete, pipeline.fail ])()
				time.sleep( 2+random.random()*5 )
			print 'No data'
			time.sleep( 1 )

	threadPro = threading.Thread( target=producer )
	threadCon = threading.Thread( target=consumer )

	threadPro.start()
	pipeline.start()
	threadCon.start()
	
	threadPro.join()
	shouldRun = False
	threadCon.join()

	#pipeline.extend( [1,2,3,4,5] )
	#pipeline.start()
	#pipeline.fail()
	#pipeline.complete()
	#pipeline.complete()
	#pipeline.complete()
