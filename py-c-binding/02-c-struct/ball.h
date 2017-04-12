
#ifndef __ball_h__
#define __ball_h__

typedef struct Ball_t {
	double radius;
	double x;
	double y;
} Ball;

Ball* ball_create( Ball* ball, double radius, double x, double y );
Ball* ball_move_by( Ball* ball, double x, double y );
Ball* ball_move_to( Ball* ball, double x, double y );
void ball_print( Ball* ball );

#endif
