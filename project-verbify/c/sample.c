// To compile: gcc sample.c
#include <stdlib.h>
#include <stdio.h>

// Not important for verbification
typedef struct {
	int x;
	int y;
} point ;

// Typically the following section would be in a separate header file
// ------------------------------------------------------------ Begin Header -

// The idea is to have a structure that holds a pointer to the data that will
// be modified and pointers to all of the functions that can modify it.

// Declare the typedef for convience
typedef struct rMove rMove;

// This is the acutal structure (make sure the name matches the typedef).
struct rMove {
	// You need to specify the type of data that this verb can modify.
	point *data;
	// 
	// Then you need to list all of the function pointers, these are the 
	// details that describe how we can modify the data. Each function
	// pointer returns this structure of data. 
	//
	// In this case we specify 2 modifiers: `by` and `to`.
	// `by` takes 2 ints as arguments and returns an rMove struct.
	// `to` takes 2 ints as arguments and returns an rMove struct.
	rMove (*by)(int,int);
	rMove (*to)(int,int);
};

//  Declare the verb and modifier functions so that we can point to them.
rMove move(point *data);
rMove move_by(int x, int y);
rMove move_to(int x, int y);

// We need an actual variable to hold the data and pointers.
// This will be returned by all of the verb methods.
// We intialize the data to null and set the function pointers.
rMove _move = {
	NULL,
	&move_by,
	&move_to
};

// -------------------------------------------------------------- End Header -

// This is definition of the verb function.
// The verb is responsible for storing/setting-up the data to be modifier.
rMove move(point *data){
	// Just point to the passed location.
	_move.data = data;
	// Make sure we return the _move object so that the modifier functions
	// can be called.
	return _move;
}

// This the definition of the move_by function.
rMove move_by(int x, int y){
	_move.data->x += x;
	_move.data->y += y;
	// Don't forget to return _move.
	return _move;
}

// This is another modifier function.
rMove move_to(int x, int y){
	_move.data->x = x;
	_move.data->y = y;
	return _move;
}

int main(int argc,char *argv[]){

	// Create an object to modify.
	point p;
	p.x = 0;
	p.y = 10;

	// This is the actual manipulation of the object.
	// We need `&p` because the verb needs to operate on a pointer.
	move(&p).by(10,10).by(10,0).to(0,0).by(-1,-2);

	// Note that you can also write that as:
	move(&p).by(10,10)
		.by(10,0)
		.to(0,0)
		.by(-1,-2);

	// Prove that it worked.
	printf("x: %d; y: %d\n",p.x,p.y);

	return 0;
}
