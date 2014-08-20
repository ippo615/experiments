
# This is a regular python function (no actual C benefit)
def square(x):
	return x*x

# Instead of running:
# cython square.pyx
# gcc -c -fPIC -I/usr/include/python2.7/ square.c
# gcc -shared square.o -o square.so

# We just need to run:
# python setup.py build_ext --inplace
