
class Point2():
	def __init__( self, x, y ):
		self.x = x
		self.y = y

	def __str__( self ):
		return 'Point2(%s,%s)' % (self.x, self.y)

class Path():
	
	def __init__( self ):
		self.points = []


