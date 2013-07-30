typedef struct complex_float {
	float real;
	float imag;
} complex_float ;

void complex_print(const char *format, complex_float num);
complex_float complex_make(float a);
complex_float complex_i(complex_float c1);
complex_float complex_add(complex_float c1, complex_float c2);
complex_float complex_sub(complex_float c1, complex_float c2);
complex_float complex_mul(complex_float c1, complex_float c2);
complex_float complex_div(complex_float c1, complex_float c2);
complex_float complex_pow(complex_float c1, complex_float c2);
complex_float complex_sin(complex_float c1);
complex_float complex_cos(complex_float c1);
complex_float complex_tan(complex_float c1);
complex_float complex_arcsin(complex_float c1);
complex_float complex_arccos(complex_float c1);
complex_float complex_arctan(complex_float c1);
complex_float complex_hypsin(complex_float c1);
complex_float complex_hypcos(complex_float c1);
complex_float complex_hyptan(complex_float c1);
complex_float complex_csc(complex_float c1);
complex_float complex_sec(complex_float c1);
complex_float complex_cot(complex_float c1);
complex_float complex_ln(complex_float c1);
complex_float complex_log10(complex_float c1);
complex_float complex_log(complex_float c1, complex_float c2);
