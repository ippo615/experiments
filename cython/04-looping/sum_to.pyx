
# Notice how iterating in C is written differently than iterating in python
# Python:
# for i in range(0,10):
# 	pass # do something with i
# Cython:
# for i from 0 <= i < 10:
# 	# do something with i

cdef int _sum_to(int n):
	cdef int total = 0
	cdef int i
	for i from 0 <= i < n:
		total += i
	return total

def sum_to(int n):
	return _sum_to(n)

# To build:
# python setup.py build_ext --inplace
