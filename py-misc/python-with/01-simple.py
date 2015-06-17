
class Thingy():

	def __init__( self, x, y ):
		self.x = x
		self.y = y

	def __enter__( self ):
		return self

	def __exit__( self, error_type, error_value, error_traceback ):
		pass

	def add( self, dx, dy ):
		self.x += dx
		self.y += dy

	def __str__( self ):
		return '(%s,%s)' % (self.x, self.y)

with Thingy( 1, 1 ) as t:
	t.add( 2, 3 )
	print t

