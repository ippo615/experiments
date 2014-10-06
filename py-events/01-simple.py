
class Subscription():

	def __init__(self):
		self.events = {}

	def on( self, event, action ):
		if not event in self.events:
			self.events[event] = []
		self.events[event].append( action )

	def fire( self, event, args=(), kwargs={} ):
		for action in self.events[event]:
			action( *args, **kwargs )

def on_start( name ):
	print 'Starting %s' % name

def on_stop( ):
	print 'Stopping'

def say_hi( name ):
	print 'Hi %s' % name

x = Subscription()
x.on( 'start', on_start )
x.on( 'start', say_hi )
x.on( 'stop', on_stop )

x.fire( 'start', ('hello',) )
x.fire( 'stop' )

