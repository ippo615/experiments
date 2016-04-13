
from Queue import Queue

class Pipeline():

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
		print 'finished successfully'
		self.action( self.prepped, self )
		if self.queue.qsize() > 0:
			self.waitingData = self.queue.get()
			self.prepped = self.prepare( self.waitingData, self )
		else:
			self.onEmpty( self )

	def fail( self ):
		# Stuff was bad, reprocess before sending
		print 'finished with failure'
		self.action( self.prepare( self.waitingData, self ), self )
		self.waitingData = self.queue.get()
		self.prepped = self.prepare( self.waitingData, self )

	def start( self ):
		self.prepped = self.prepare( self.queue.get(), self )
		self.complete()


def action_print( data, pipeline ):
	print data

def prepare_to_string( data, pipeline ):
	print 'Preparing: %s' % data
	return '%s blah' % data

def onEmpty( pipeline ):
	print 'Pipeline empty'

pl = Pipeline( prepare_to_string, action_print, onEmpty )

pl.extend( [1,2,3,4,5] )
pl.start()
pl.fail()
pl.complete()
pl.complete()
pl.complete()


