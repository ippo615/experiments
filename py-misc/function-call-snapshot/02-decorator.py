
import copy

'''
This contains a wrapper that will return an object which can later be
run via its `.run()` method.
'''

def queueable(queue):
	def decorator(f):
		def func( *args, **kwargs ):
			fData = FunctionData( f, args, kwargs )
			if queue == None:
				return fData.run()
			queue.append( fData )
		return func
	return decorator

class FunctionData( ):

	def __init__( self, action, args=[], kwargs={} ):
		# Maybe I can make the deep copy optional to save on some
		# resources.
		self.action = action
		self.args = copy.deepcopy(args)
		self.kwargs = copy.deepcopy(kwargs)

	def run( self ):
		return self.action( *self.args, **self.kwargs )

if __name__ == '__main__':

	actions = []
	actions2 = []
	
	@queueable( actions )
	def add( x, y ):
		return x+y

	@queueable( actions2 )
	def sayHiTo( person ):
		return 'Hello, %s!' % person

	@queueable( actions2 )
	def joinify( dataDict ):
		return '%s: %s' % (dataDict['name'], dataDict['address'] )

	@queueable( actions )
	def sub( x=5, y=5 ):
		return x-y

	add( 1, 2 )
	sayHiTo( 'Adam' )
	add( 3, 4 )
	sub( x=3, y=2 )
	sayHiTo( 'Betty' )
	data = dict(
		name = 'john',
		address = '982 Bleeker Street'
	)
	joinify( data )
	data['name'] = 'samatha'
	joinify( data )

	for a in actions:
		print a.run()
	for a in actions2:
		print a.run()

