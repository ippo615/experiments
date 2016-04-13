import time

class Runner():
	def __init__( self ):
		pass
	
	def run( self, delay=0.1, action=None, data=None ):
		if callable(action):
			count = 0
			while count < 5:
				action( data )
				time.sleep( delay )
				count += 1

class Thing():
	def __init__( self ):
		pass
	
	def update( self, data ):
		print data

# Main 
thing = Thing()
runner = Runner()

runner.run( action = thing.update, data = None )
