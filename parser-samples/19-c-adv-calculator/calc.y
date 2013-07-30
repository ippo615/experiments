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
    // Brackets
    | LBRACKET exp RBRACKET { $$ = $2; }
    | LPAREN   exp RPAREN   { $$ = $2; }
    | LCURLY   exp RCURLY   { $$ = $2; }
    // Numbers
	| FLOAT  { $$ = $1; }
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
