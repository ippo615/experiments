
class Point( ):
	
	def __init__( self, x, y ):
		self.x = x
		self.y = y
	
	def minus( self, other ):
		return self.__class__(
			self.x - other.x,
			self.y - other.y
		)
	
	def magnitudeSquared( self ):
		return self.x**2.0 + self.y**2.0
	
	def magnitude( self ):
		return self.magnitudeSquared()**0.5
	
	def __str__( self ):
		return '( %s, %s )' % ( self.x, self.y )
		

class Line( ):

	def __init__( self, start, end ):
		self.start = start
		self.end = end

	def length( self ):
		return self.end.minus( self.start ).magnitude()

	def distanceToPoint( self, point ):
		x1, y1 = self.start.x, self.start.y
		x2, y2 = self.end.x, self.end.y
		vx, vy = point.x, point.y

		dx = x2 - x1
		dy = y2 - y1
		
		if dx == 0 and dy == 0:
			return ((x1-vx)**2.0 + (y1-vy)**2.0)**0.5
		
		length = self.length()
		t = ((vx-x1)*(x2-x1)+(vy-y1)*(y2-y1))/length
		
		if t<0:
			return self.start.minus( point ).magnitude()
		
		if t>1:
			return self.end.minus( point ).magnitude()
		
		return Point( x1+t*dx, y1+t*dy ).minus( point ).magnitude()
		

	def perpendicularDistanceToPoint( self, point ):
		x1, y1 = self.start.x, self.start.y
		x2, y2 = self.end.x, self.end.y
		vx, vy = point.x, point.y

		dx = x2 - x1
		if dx == 0:
			return abs(x1 - vx)

		dy = y2 - y1
		m = dy/dx
		b = y1 - m*x1
		return abs(m * vx - vy + b) / ((m*m + 1)**0.5)

	def __str__( self ):
		return 'line from %s to %s' % (self.start, self.end)

def _rdp( points, epsilon ):
	
	# Cannot reduce a line with fewer than 3 points
	if len( points ) < 3:
		return points
	
	# Check if all 'error' distances are smaller than epsilon
	distExtreme = epsilon
	indexExtreme = -1
	for i in range(1,len(points)-1):
		line = Line( points[i-1], points[i+1] )
		dist = line.distanceToPoint( points[i] )
		if dist > distExtreme:
			distExtreme = dist
			indexExtreme = i
	
	
	if indexExtreme != -1:
		firstHalf = _rdp( points[0:indexExtreme+1], epsilon )
		otherHalf = _rdp( points[indexExtreme:], epsilon )
		return  firstHalf + otherHalf[1:]
		
	else:
		# Simplify the line by using only the start and end points
		return [ points[0], points[-1] ]

def test():

	# Distance to line
	line = Line( Point(0,0), Point(10,0) )
	distTo = line.perpendicularDistanceToPoint( Point( 5,5 ) )
	assert( distTo == 5.0 )

	line = Line( Point(0,0), Point(0,10) )
	distTo = line.perpendicularDistanceToPoint( Point( 5,5 ) )
	assert( distTo == 5.0 )

if __name__ == '__main__':
	test()

	horizontal_line = [
		Point( 0, 0 ),
		Point( 1, 0.1 ),
		Point( 2, 0 ),
		Point( 3, 0.5 ),
		Point( 4, 0 ),
		Point( 5, 0.2 ),
		Point( 6, 0 )
	]
	print 'Horizontal Line:'
	for pt in _rdp( horizontal_line, 0.5 ):
		print pt

	vertical_line = [
		Point( 0, 0 ),
		Point( 0.1, 1 ),
		Point( 0, 2 ),
		Point( 0.3, 3 ),
		Point( 0, 4 ),
		Point( 0.5, 5 ),
		Point( 0, 6 )
	]
	print 'Vertical Line:'
	for pt in _rdp( vertical_line, 0.5 ):
		print pt
		
	rectangle = [
		Point( 0, 0 ), # Actual point
		Point( 0.3, 0.4 ),
		Point( 5, 0 ), # Actual point
		Point( 5.1, 0.3),
		Point( 5, 5 ), # Actual point
		Point( 4.8, 5.2),
		Point( 4.9, 5.3),
		Point( 0, 5 ), # Actual point
		Point( 0.1, 4.7),
		Point( 0.1, 2.5),
		Point( 0, 0 )  # Actual point
	]
	print 'Rectangle:'
	for pt in _rdp( rectangle, 0.5*((5.0**2.0+5.0**2.0)**0.5) ):
		print pt

# Temporary testing
def polygonArea( points ):
	# Shift the polygon so that the top,left of the aabb is 0,0
	area = 0.0
	for i in range(1,len(points)):
		area += (points[i-1][0]+points[i][0]) * (points[i-1][1]-points[i][1])
	return area*0.5

print 'Positive: %s' % polygonArea( [
	(0,0),
	(9,0),
	(9,9),
	(0,9)
] )

print 'Positive (shift): %s' % polygonArea( [
	(10,10),
	(19,10),
	(19,19),
	(10,19)
] )

print 'Negative: %s' % polygonArea( [
	( 0, 0),
	(-9, 0),
	(-9,-9),
	( 0,-9)
] )

print 'Centered: %s' % polygonArea( [
	(-4.5,-4.5),
	( 4.5,-4.5),
	( 4.5, 4.5),
	(-4.5, 4.5)
] )
