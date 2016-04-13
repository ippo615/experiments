
# ---------------------------------------------------------------------
#  Method 1: Dynamic Instance Wide Defaults
# ---------------------------------------------------------------------

print '\nMethod 1: Class-wide defaults'

class Ball():

	color = 'red'
	size = 0.5
	
	def __init__(self, color=None, size=None ):
		if color != None:
			self.color = color
		if size != None:
			self.size = size
	
	def __str__( self ):
		return 'A %s ball of size %s' % (
			self.color,
			self.size
		)

aBall = Ball( 'green', 10.0 )
bBall = Ball( )

print aBall
print bBall

Ball.color = 'blue'

print aBall
print bBall

# ---------------------------------------------------------------------
#  Method 2: Defaults in Init (defaults cannot be set dynamically)
# ---------------------------------------------------------------------

print '\nMethod 2'

class Ball():

	def __init__(self, color='red', size=0.5 ):
		self.color = color
		self.size = size
	
	def __str__( self ):
		return 'A %s ball of size %s' % (
			self.color,
			self.size
		)

aBall = Ball( 'green', 10.0 )
bBall = Ball( )

print aBall
print bBall
print 'Cannot dynaimically change the defaults'
