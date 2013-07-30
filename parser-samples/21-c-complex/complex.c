#include <math.h>
#include "complex.h"

// Code!
complex_float complex_make(float a){
	complex_float r;
	r.real = a;
	r.imag = 0;
	return r;
}
complex_float complex_i(complex_float c1){
	complex_float r;
	r.real = -1*c1.imag;
	r.imag = c1.real;
	return r;
}
complex_float complex_add(complex_float c1, complex_float c2){
	complex_float r;
	r.real = c1.real + c2.real;
	r.imag = c1.imag + c2.imag;
	return r;
}
complex_float complex_sub(complex_float c1, complex_float c2){
	complex_float r;
	r.real = c1.real - c2.real;
	r.imag = c1.imag - c2.imag;
	return r;
}
complex_float complex_mul(complex_float c1, complex_float c2){
	complex_float r;
	r.real = c1.real*c2.real - c1.imag*c2.imag;
	r.imag = c1.real*c2.imag + c2.real*c1.imag;
	return r;
}
complex_float complex_div(complex_float c1, complex_float c2){
	complex_float r;
	float denom = c2.real*c2.real + c2.imag*c2.imag;
	r.real = ( c1.real*c2.real + c1.imag*c2.imag)/denom;
        r.imag = (-c1.real*c2.imag + c2.real*c1.imag)/denom;
	return r;
}
complex_float complex_pow(complex_float c1, complex_float c2){
	complex_float r;
	// first convert c1 to polar form
	float radius = sqrt(c1.real*c1.real + c1.imag*c1.imag);
	float theta  = atan2(c1.imag,c1.real);
	// According to https://en.wikipedia.org/wiki/Exponentiation
	// (a+ib)^(c+id) ==> convert (a+ib) to polar r,t ==> then
	// = (r^c * exp(-d*t))*[cos(d*log(r)+c*t) + i*sin(d*log(r)+c*t)]
	// Note the arg to sin and cos is the same
	float length = pow(radius,c2.real) * exp(-c2.imag*theta);
	float argument = c2.imag*log(radius) + c2.real*theta;
	r.real = length * cos(argument);
	r.imag = length * sin(argument);	
	return r;
}
complex_float complex_sin(complex_float c1){
	// So... Euler said: exp(i*t) = cos(t) + i*sin(t) 
	// and then: sin(t) = (exp(i*t) - exp(-i*t)) / 2i 
	// and also: cos(t) = (exp(i*t) + exp(-i*t)) / 2  
	// Hm... I already have functions that raise complex numbers
	// to complex numbers so I'll use those for sin/code.
	complex_float exp1 = complex_pow( complex_make(exp(1)), complex_i(c1) );
	complex_float exp2 = complex_pow( complex_make(exp(1)), complex_mul(complex_make(-1.0f),complex_i(c1)) );
	complex_float diff = complex_sub(exp1,exp2);
	complex_float r = complex_div( diff, complex_i(complex_make(2.0f)) );
	return r;
}
complex_float complex_cos(complex_float c1){
	complex_float exp1 = complex_pow( complex_make(exp(1)), complex_i(c1) );
	complex_float exp2 = complex_pow( complex_make(exp(1)), complex_mul(complex_make(-1.0f),complex_i(c1)) );
	complex_float sum  = complex_add(exp1,exp2);
	complex_float r = complex_div( sum, complex_make(2.0f) );
	return r;
}
complex_float complex_tan(complex_float c1){
	complex_float cpx_sin = complex_sin(c1);
	complex_float cpx_cos = complex_cos(c1);
	complex_float r = complex_div( cpx_sin, cpx_cos );
	return r;
}
void complex_print(const char* format, complex_float z){
	printf(format,z.real,z.imag);
	printf("\n");
}
complex_float complex_arcsin(complex_float c1){
	// Hopefully I got this right, from a paper called:
	// "Implementing the Complex Arcsine and Arccosine Functions Using Exception Handling"
	// arcsin(z) = -i* log(i*z + sqrt(1 - z*z))
	complex_float zz = complex_mul(c1,c1);
	complex_float a = complex_make(1.0f);
	a = complex_sub(a,zz);                 // 1 - z*z
	a = complex_pow(a,complex_make(0.5f)); // sqrt(...)
	complex_float iz = complex_i(c1);      // i*z
	a = complex_add(iz,a);                 // i*z + sqrt(...)
	a = complex_ln(a);                     // log(...)
	complex_float r = complex_mul(complex_i(complex_make( -1.0f )),a); // -i * log(...)
	return r;
}
complex_float complex_arccos(complex_float c1){
	// arccos(z) = (pi/2) + i * log(i*z + sqrt(1 - z*z))
	complex_float zz = complex_mul(c1,c1);
	complex_float a = complex_make(1.0f);
	a = complex_sub(a,zz);                 // 1 - z*z
	a = complex_pow(a,complex_make(0.5f)); // sqrt(...)
	complex_float iz = complex_i(c1);      // i*z
	a = complex_add(iz,a);                 // i*z + sqrt(...)
	a = complex_ln(a);                     // log(...)
	a = complex_mul(complex_i(complex_make( 1.0f )),a); // i * log(...)
	complex_float r = complex_add( complex_make(1.57079632f), a); // pi/2 + ...
	return r;
}
complex_float complex_arctan(complex_float c1){
	complex_float cpx_asin = complex_arcsin(c1);
	complex_float cpx_acos = complex_arccos(c1);
	complex_float r = complex_div(cpx_asin,cpx_acos);
	return r;
}
complex_float complex_hypsin(complex_float c1){
	// The hyperbolics are easy!
	// sinh(a+ib) = cos(b)sinh(a) + i*sin(b)cosh(a)
	complex_float r;
	r.real = cos(c1.imag)*sinh(c1.real);
	r.imag = sin(c1.imag)*cosh(c1.real);
	return r;
}
complex_float complex_hypcos(complex_float c1){
	// cosh(a+ib) = cos(b)sinh(a) + i*sin(b)cosh(a)
	complex_float r;
	r.real = cos(c1.imag)*cosh(c1.real);
	r.imag = sin(c1.imag)*sinh(c1.real);
	return r;
}
complex_float complex_hyptan(complex_float c1){
	// I'm assuming sinh/cosh
	complex_float cpx_sinh = complex_hypsin(c1);
	complex_float cpx_cosh = complex_hypcos(c1);
	complex_float r = complex_div(cpx_sinh,cpx_cosh);
	return r;
}
complex_float complex_csc(complex_float c1){
	// this is 1/sin
	complex_float cpx_sin = complex_sin(c1);
	complex_float r = complex_div(complex_make(1.0f),cpx_sin);
	return r;
}
complex_float complex_sec(complex_float c1){
	// this is 1/cos
	complex_float cpx_cos = complex_cos(c1);
	complex_float r = complex_div(complex_make(1.0f),cpx_cos);
	return r;
}
complex_float complex_cot(complex_float c1){
	// this is 1/tan = 1/(sin/cos) = cos/sin
	complex_float cpx_sin = complex_sin(c1);
	complex_float cpx_cos = complex_cos(c1);
	complex_float r = complex_div(cpx_cos,cpx_sin);
	return r;
}
complex_float complex_ln(complex_float c1){
	// Given e^a = z and z = r*exp(i*t) = (polar form)
	// then a = ln(r) + i(t + 2*n*pi) -- note n is arbitrary ie 0
	// so ln(e^a) = ln(z) <=> a = ln(z)
	complex_float r;
	// first convert c1 to polar form
	float radius = sqrt(c1.real*c1.real + c1.imag*c1.imag);
	float theta  = atan2(c1.imag,c1.real);
	r.real = log(radius);
	r.imag = theta; // i'm choosing n=0;
	return r;
}
complex_float complex_log10(complex_float c1){
	// I'm assuming it's the same as ln but with the
	// natural log replaced with log base 10
	complex_float r;
	// first convert c1 to polar form
	float radius = sqrt(c1.real*c1.real + c1.imag*c1.imag);
	float theta  = atan2(c1.imag,c1.real);
	r.real = log10(radius);
	r.imag = theta; // i'm choosing n=0;
	return r;
}
complex_float complex_log(complex_float c1, complex_float c2){
	complex_float a, b, r;
	a = complex_ln(c1);
	b = complex_ln(c2);
	r = complex_div(b,a);
	return r;
}
