#include <stdio.h>
#include <math.h>
#include "complex.c"

int main(){
	complex_float a = complex_make(10.0f);
	complex_float b = complex_make(05.0f);
	complex_float c = complex_add(a,b);
	printf("Result: %f i%f\n",c.real,c.imag);
	complex_float arg = complex_add(complex_i(complex_make(1.0f)),complex_make(1.0f));
	complex_arcsin(arg);
}
