
# This notation is more familiar to C users. Instead of having a python
# memory view we have a regular C pointer
cdef int _add_all_i(int* nums, int n):
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

# Instead of creating the memory view we access the array's `data.as_ints`
# property to access it (in C) as an array of integers
def add_all(nums):
	cdef array.array cArray = array('i', nums)
	return _add_all_i(cArray.data.as_ints,len(nums))

# To build:
# python setup.py build_ext --inplace
