
# ---------------------------------------------------------------------
#  Simple Instance Tracking
# ---------------------------------------------------------------------

class Ball( ):
	
	__instances__ = []
	
	def __init__( self, color='red', size=1.0 ):
		self.__class__.__instances__.append( self )
		self.color = color
		self.size = size
	
	def destroy( self ):
		self.__class__.__instances__.remove( self )
	
	#def __del__( self ):
	#	self.__class__.instances__.remove( self )
	
	def __str__( self ):
		return 'A %sin %s ball' % (
			self.size,
			self.color
		)
	

aBall = Ball('green',1.0)
bBall = Ball('blue',2.0)

for ball in Ball.__instances__:
	print ball

print '\nDestroying aBall'
aBall.destroy()

for ball in Ball.__instances__:
	print ball

# ---------------------------------------------------------------------
#  Meta Class
# ---------------------------------------------------------------------

class MetaTracker( cls ):
	
	
