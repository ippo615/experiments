from ctypes import *
lib_ball = cdll.LoadLibrary('./ball.so')


class Ball(Structure):
	_fields_ = [
		("radius",c_double),
		("x", c_double),
		("y", c_double)
	]

BallPointer = POINTER(Ball)

lib_ball.ball_create.restype = BallPointer
lib_ball.ball_create.argtypes = [BallPointer, c_double, c_double, c_double]

lib_ball.ball_move_to.restype = BallPointer
lib_ball.ball_move_to.argtypes = [BallPointer, c_double, c_double]

lib_ball.ball_move_by.restype = BallPointer
lib_ball.ball_move_by.argtypes = [BallPointer, c_double, c_double]

lib_ball.ball_print.restype = None
lib_ball.ball_print.argtypes = [BallPointer]

if __name__ == '__main__':

	x = Ball()

	lib_ball.ball_create( byref(x), 10.0, 0.0, 0.0 )
	lib_ball.ball_print( byref(x) )

	lib_ball.ball_move_by( byref(x), -1.0, 2.0 )
	lib_ball.ball_print( byref(x) )

	lib_ball.ball_move_to( byref(x), 3.0, 4.0 )
	lib_ball.ball_print( byref(x) )
