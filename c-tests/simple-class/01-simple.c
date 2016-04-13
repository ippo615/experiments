#include <stdio.h>

// To build:
//     gcc 01-simple.c
// To run:
//     ./a.out

// To see that the macro works run:
//     gcc -x c -E 01-simple.c
#define create_instance( class, name ) class _##name; class* name = &_##name

typedef struct {
	int x;
	int y;
} Point;

void point_create( Point* point, int x, int y ){
	point->x = x;
	point->y = y;
}
void point_shift( Point* point, int dx, int dy ){
	point->x += dx;
	point->y += dy;
}

int main(){

	create_instance( Point, point1 );
	create_instance( Point, point2 );

	point_create( point1, 10, 9 );
	point_create( point2, 8, 5 );
	point_shift( point1, 11, 2 );

	printf( "Point1: %i, %i\n", point1->x, point1->y );
	printf( "Point2: %i, %i\n", point2->x, point2->y );

}
