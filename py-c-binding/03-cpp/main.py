from ctypes import *
lib_ball = cdll.LoadLibrary('./ball.so')

# --------------------------------------------------------------------
#                     Define the C header file information in Python
# --------------------------------------------------------------------
# Question: do I actually need to define the BallStructure in python?
# I'm not exposing a CPP ball class anywhere. I also dont think it
# helps but it doesnt seem to hurt it either. Could I just use a void
# pointer type (ie `c_void_p`)?
class BallStructure(Structure):
	_fields_ = [
		("radius",c_double),
		("x", c_double),
		("y", c_double)
	]

BallPointer = POINTER(BallStructure)

lib_ball.ball_create.argtypes = [BallPointer, c_double, c_double, c_double]
lib_ball.ball_create.restype = BallPointer

lib_ball.ball_move_to.argtypes = [BallPointer, c_double, c_double]
lib_ball.ball_move_to.restype = BallPointer

lib_ball.ball_move_by.argtypes = [BallPointer, c_double, c_double]
lib_ball.ball_move_by.restype = BallPointer

lib_ball.ball_print.argtypes = [BallPointer]
lib_ball.ball_print.restype = None

# --------------------------------------------------------------------
#                                                Create Pythonic API
# --------------------------------------------------------------------
class Ball():
	def __init__( self, radius, x, y ):
		self._ball = BallStructure()
		lib_ball.ball_create( byref(self._ball), radius, x, y )
	def move_to( self, x, y ):
		lib_ball.ball_move_to( byref(self._ball), x, y )
	def move_by( self, x, y ):
		lib_ball.ball_move_by( byref(self._ball), x, y )
	def debug( self ):
		lib_ball.ball_print( byref(self._ball) )


# --------------------------------------------------------------------
#                                                               Main
# --------------------------------------------------------------------
if __name__ == '__main__':

	# Similar to C way
	x = BallStructure()

	lib_ball.ball_create( byref(x), 10.0, 0.0, 0.0 )
	lib_ball.ball_print( byref(x) )

	lib_ball.ball_move_by( byref(x), -1.0, 2.0 )
	lib_ball.ball_print( byref(x) )

	lib_ball.ball_move_to( byref(x), 3.0, 4.0 )
	lib_ball.ball_print( byref(x) )

	# Pythonic api way
	b = Ball( 10.0, 0.0, 0.0 )
	b.debug()

	b.move_by( -1.0, 2.0 )
	b.debug()

	b.move_to( 3.0, 4.0 )
	b.debug()
