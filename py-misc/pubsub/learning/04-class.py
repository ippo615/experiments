from blinker import signal

class EventListenerBlinker():
	
	@staticmethod
	def trigger( event, **kwargs ):
		thing = signal( event )
		thing.send( None, **kwargs )
	
	@staticmethod
	def _wrap( callback ):
		def f( sender, **kwargs ):
			callback( **kwargs )
		return f
	
	def __init__(self):
		pass
		
	def on( self, event, callback ):
		thing = signal(event)
		thing.connect( self.__class__._wrap(callback) )
		
	def off( self, event, callback ):
		thing = signal( event )
		thing.disconnect( self.__class__._wrap(callback) )
		
	def trigger( self, event, kwargs ):
		thing = signal( event )
		thing.send( self, **kwargs )

def say(text):
	print 'Hello %s' % text

blah = EventListenerBlinker()
blah.on( 'hello', say )
hi = EventListenerBlinker()
hi.trigger( 'hello', dict(a='world') )

# ---------------------------------------------------------------------
#                                            Blinker simple subscribe
# ---------------------------------------------------------------------
from blinker import signal

def subscriber(sender,a,b,c):
	print 'Blinker got a signal sent by %r' % sender
	print 'The values are a=%s, b=%s, c=%s' % (a,b,c)

ready = signal('abc')
ready.connect(subscriber)
ready.send( 'hello', a=1, b=2, c=3 )

# ---------------------------------------------------------------------
#                                             PubSub simple subscribe
# ---------------------------------------------------------------------
from pubsub import pub

def subscriber(sender,a,b,c):
	print 'PubSub got a signal sent by %r' % sender
	print 'The values are a=%s, b=%s, c=%s' % (a,b,c)

pub.subscribe( subscriber, 'abc' )
pub.sendMessage( 'abc', sender='hello', a=1, b=2, c=3 )
