# How to

This is how to make the actual thing.

## For Python

### Building

For python we just need to make a shared object file that we can call
from within our python program:

	g++ --shared -fPIC ball.cpp -o ball.so

### Running

Just run:

	python main.py
