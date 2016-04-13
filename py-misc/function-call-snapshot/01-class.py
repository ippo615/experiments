
import copy

class FunctionData( ):

	def __init__( self, action, args=[], kwargs={} ):
		self.action = action
		self.args = copy.copy(args)
		self.kwargs = copy.copy(kwargs)

	def run( self ):
		return self.action( *self.args, **self.kwargs )

if __name__ == '__main__':

	def add( x, y ):
		return x+y

	func1 = FunctionData( add, [1,2] )
	func2 = FunctionData( add, (3,4) )

	print func1.run()
	print func2.run()
