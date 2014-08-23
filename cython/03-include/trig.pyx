
# We can import stuff from the standard c library
# Here we're importing cosf and sinf from math.h
cdef extern from "math.h":
	float cosf(float theta)
	float sinf(float theta)

# Let's say we want to break a (length,angle) vector into x and y
# components. The following two functions will do that.
cdef float _length_dir_x(float length, float degrees):
	return length*cosf(3.14*degrees/180.0)

cdef float _length_dir_y(float length, float degrees):
	return length*sinf(3.14*degrees/180.0)

# We need to make a python functions to call the C function
def length_dir_x(float length, float degrees):
	return _length_dir_x(length,degrees)

def length_dir_y(float length, float degrees):
	return _length_dir_y(length,degrees)

# To build:
# python setup.py build_ext --inplace
