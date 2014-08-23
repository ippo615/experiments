
# We can specify that a parameter is an array by using `type[:]` as the type
# for example `int[:] nums` below is an array of integers
cdef int _add_all_i(int[:] nums, int n):
	cdef int total = 0
	cdef int i
	for i from 0 <= i < n:
		total += nums[i]
	return total

# To create a view of the array memory (in C) we need to cimport array.
# This lets us `cdef array.array` which is a array usable in C
from cpython cimport array

# In python we need the array module so we can convert a python list to
# an array that is usable in C.
# https://docs.python.org/2/library/array.html
from array import array

# In this function we convert the python list to an array of integers that
# we can iterate through in C
def add_all(nums):
	cdef array.array cArray = array('i', nums)
	cdef int[:] arrayView = cArray
	return _add_all_i(arrayView,len(nums))

# To build:
# python setup.py build_ext --inplace
