
class Line():

	def __init__( self, start, end ):
		self.start = start
		self.end = end

	def length( self ):
		dx = self.end.x - self.start.x
		dy = self.end.y - self.start.y
		return (dx**2 + dy**2)**0.5
