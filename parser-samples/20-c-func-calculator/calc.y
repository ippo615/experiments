%{
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
extern void yyerror(const char* s);

float my_add(float a, float b){
	return a+b;
}
float my_sub(float a, float b){
	return a-b;
}
float my_mul(float a, float b){
	return a*b;
}
float my_div(float a, float b){
	return a/b;
}
float my_pow(float a, float b){
	return pow(a,b);
}
float my_sin(float a){
	return sin(a);
}
float my_cos(float a){
	return cos(a);
}
float my_tan(float a){
	return tan(a);
}
float my_arcsin(float a){
	return asin(a);
}
float my_arccos(float a){
	return acos(a);
}
float my_arctan(float a){
	return atan(a);
}
float my_hypsin(float a){
	return sinh(a);
}
float my_hypcos(float a){
	return cosh(a);
}
float my_hyptan(float a){
	return tanh(a);
}
float my_csc(float a){
	return 1.0f/sin(a);
}
float my_sec(float a){
	return 1.0f/cos(a);
}
float my_cot(float a){
	return 1.0f/tan(a);
}
float my_ln(float a){
	return log(a);
}
float my_log10(float a){
	return log10(a);
}
float my_log(float a, float b){
	// Log base a of b (ie logbase(10,100)==2)
	return log(b)/log(a);
}
%}

// This is an option that gives us more verbose error messages
%error-verbose

// These are the data types that we can use.
%union {
	float  float_value;
	char  *string_value;
}

// These are the "terminal symbol" token types, the convention is ALL_CAPS.
// They also get associated with a field in the union above.
%token <float_value>  FLOAT
%token <string_value> STRING
// Other tokens
%token LBRACKET
%token RBRACKET
%token LPAREN
%token RPAREN
%token LCURLY
%token RCURLY

// These are the operators that dont have a data type
// We specify %left associatity to prevent shift/reduce conflicts
// Also note that the precidence is bottom-up (ie stuff on the bottom is
// executed before stuff on the top)
%left EOL
%right SIN COS TAN ASIN ACOS ATAN CSC SEC COT HSIN HCOS HTAN LN LOG10 LOGBASE
%left ADD SUB
%left MUL DIV
%right POW

// The types that we allow for 'non-token grammer stuff'
%type <float_value> exp line lines

%%
lines
        : lines line { }
        | line       { }
        ;

line    
        : exp EOL { printf("The result is: %f\n",$1); }
        ;

exp
    : exp POW exp    { $$ = my_pow($1,$3); }
    | exp MUL exp    { $$ = my_mul($1,$3); }
    | exp DIV exp    { $$ = my_div($1,$3); }
    | exp ADD exp    { $$ = my_add($1,$3); }
    | exp SUB exp    { $$ = my_sub($1,$3); }
    // TRIG
    | SIN exp  { $$ = my_sin($2); }
    | COS exp  { $$ = my_cos($2); }
    | TAN exp  { $$ = my_tan($2); }
    | ASIN exp { $$ = my_arcsin($2); }
    | ACOS exp { $$ = my_arccos($2); }
    | ATAN exp { $$ = my_arctan($2); }
    | HSIN exp { $$ = my_hypsin($2); }
    | HCOS exp { $$ = my_hypcos($2); }
    | HTAN exp { $$ = my_hyptan($2); }
    | CSC exp  { $$ = my_csc($2); }
    | SEC exp  { $$ = my_sec($2); }
    | COT exp  { $$ = my_cot($2); }
    // Exponents/Logs
    | LOGBASE exp exp { $$ = my_log($2,$3); }
    | LN exp          { $$ = my_ln($2); }
    | LOG10 exp       { $$ = my_log10($2); }
    // Brackets
    | LBRACKET exp RBRACKET { $$ = $2; }
    | LPAREN   exp RPAREN   { $$ = $2; }
    | LCURLY   exp RCURLY   { $$ = $2; }
    // Numbers
    | FLOAT    { $$ = $1; }
    ;
%%

main() {
	printf("Enter some stuff:\n");
	yyparse();
	printf("\nDone!\n");
}

extern void yyerror(const char *s) {
	printf("Parse error: %s",s);
}
