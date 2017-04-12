
#ifndef __ball_h__
#define __ball_h__

class Ball {
	private:
	double radius;
	double x;
	double y;

	public:
	Ball(double radius, double x, double y);
	void move_by( double x, double y );
	void move_to( double x, double y );
	void print(void);
};

// Python's ctypes can only work with C types so we make some simple
// functions that turn the C++ class into a useable C API. We make
// sure that C API is exposed to the other module.
extern "C" {
	Ball* ball_create(double radius, double x, double y){ return new Ball(radius,x,y); }
	void ball_move_by(Ball* ball, double x, double y){ return ball->move_by(x,y); }
	void ball_move_to(Ball* ball, double x, double y){ return ball->move_to(x,y); }
	void ball_print(Ball* ball){ return ball->print(); }
}
#endif
