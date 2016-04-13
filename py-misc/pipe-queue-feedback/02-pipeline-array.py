
class Pipeline():
	
	def __init__(
		self,
		prepare,
		action,
		onEmpty = lambda x:x
	):
		self.things = []
		self.prepped = None
		self.action = action
		self.prepare = prepare
		self.onEmpty = onEmpty

	def append(self,thing):
		self.things.append( thing )
	def extend(self,things):
		self.things.extend( things )

	def complete( self ):
		# Stuff was good, load the next
		self.things.pop(0)
		self.action( self.prepped, self )
		if len( self.things ) > 0:
			self.prepped = self.prepare( self.things[0], self )
		else:
			self.onEmpty( self )

	def fail( self ):
		# Stuff was bad, reprocess before sending
		self.action( self.prepare( self.things.pop(0), self ), self )
		self.prepped = self.prepare( self.things[0], self )

	def start( self ):
		self.prepped = self.prepare( self.things[0], self )
		self.complete()


def action_print( data, pipeline ):
	print data

def prepare_to_string( data, pipeline ):
	return '%s' % data

def onEmpty( pipeline ):
	print 'Pipeline empty'

pl = Pipeline( prepare_to_string, action_print, onEmpty )

pl.extend( [1,2,3,4,5] )
pl.start()
pl.complete()
pl.complete()
pl.complete()
pl.complete()


