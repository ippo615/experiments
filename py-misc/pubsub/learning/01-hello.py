
# ---------------------------------------------------------------------
#                                            Blinker simple subscribe
# ---------------------------------------------------------------------
from blinker import signal

def subscriber(sender):
	print 'Blinker got a signal sent by %r' % sender

ready = signal('abc')
ready.connect(subscriber)
ready.send( 'hello' )

# ---------------------------------------------------------------------
#                                             PubSub simple subscribe
# ---------------------------------------------------------------------
from pubsub import pub

def subscriber(sender):
	print 'PubSub got a signal sent by %r' % sender

pub.subscribe( subscriber, 'abc' )
pub.sendMessage( 'abc', sender='hello' )
