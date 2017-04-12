
#include <stdio.h>
#include "ball.h"

Ball* ball_create( Ball* ball, double radius, double x, double y ){
	ball->radius = radius;
	ball->x = x;
	ball->y = y;
}
Ball* ball_move_by( Ball* ball, double x, double y ){
	ball->x += x;
	ball->y += y;
}
Ball* ball_move_to( Ball* ball, double x, double y ){
	ball->x = x;
	ball->y = y;
}
void ball_print( Ball* ball ){
	printf( "Your ball is at (%f, %f) with a radius of %f\n", ball->x, ball->y, ball->radius );
}
