
#include "ball.h"

int main( void ){
	Ball x;

	ball_create( &x, 10.0, 0.0, 0.0 );
	ball_print( &x );

	ball_move_by( &x, -1.0, 2.0 );
	ball_print( &x );

	ball_move_to( &x, 3.0, 4.0 );
	ball_print( &x );

	return 0;
}
