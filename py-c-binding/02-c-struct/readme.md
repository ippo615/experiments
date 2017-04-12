# How to

This is how to make the actual thing.

## For Python

### Building

For python we just need to make a shared object file that we can call
from within our python program:

	gcc --shared -fPIC ball.c -o ball.so

### Running

Just run:

	python main.py

## For C

### Building

We can further create a C executable that can be run (ie a main.c that
can use this "library"). To do that, first compile the library the main
program and the library then link them:

	gcc -c main.c ball.c
	gcc main.o ball.o

### Running

Just run:

	./a.out
