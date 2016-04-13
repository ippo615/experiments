
from point_2d import Point2D
from physical import Physical
from drawable import Drawable

class Ball( Point2D, Physical, Drawable ):
	def __init__( self, x, y ):
		Point2D.__init__( self, x, y )
		Physical.__init__( self )
		Drawable.__init__( self )
