
# This will become a C function, trival and equivalent to:
# float _square( float x ){
# 	return x*x;
# }

cdef float _square(float x):
	return x*x

# We need to make a python function to call the C function
def square(float x):
	return _square(x)

# To build:
# python setup.py build_ext --inplace
