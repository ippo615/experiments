
# ---------------------------------------------------------------------
#                                            Blinker simple subscribe
# ---------------------------------------------------------------------
from blinker import signal

# Blinker must have 1 argument in the subscriber even if it is useless
def subscriber(a):
	print 'Blinker got a signal sent by ...'

ready = signal('abc')
ready.connect(subscriber)
ready.send('a')

# ---------------------------------------------------------------------
#                                             PubSub simple subscribe
# ---------------------------------------------------------------------
from pubsub import pub

def subscriber():
	print 'PubSub got a signal sent by ...'

pub.subscribe( subscriber, 'abc' )
pub.sendMessage( 'abc' )
