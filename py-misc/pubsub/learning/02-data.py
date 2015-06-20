
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
