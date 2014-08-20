
# This is a regular python function (no actual C benefit)
def square(x):
	return x*x

# We can convert it to C code by running the following on the command line:
# cython square.pyx

# That should have created a file called square.c (which is rather large)

# We can compile that file with `gcc` making sure we tell the compiler where
# it can include the appropriate python libraries. The arguments are:
# -c = compile bit don't link
# -fPIC = generates position independent code (PIC) for shared libraries
#   I honestly don't know exactly why this is used but apparently it's the
#   correct thing to do
# -I/usr/include/python2.7/ = the path to pythons include files, make sure
#   you update it for your python version, run `ls /usr/include/ | grep python`
#   to see which python versions you have
# The full command is:
# gcc -c -fPIC -I/usr/include/python2.7/ square.c

# That creates a file "square.o" which is the compiled code. You can link your
# compiled code with:
# gcc -shared square.o -o square.so

# Read (or run) main.py to see how to use the newly compiled library
