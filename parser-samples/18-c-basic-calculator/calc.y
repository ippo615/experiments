%{
#include <stdio.h>
#include <stdlib.h>
extern void yyerror(const char* s);
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

// These are the operators that dont have a data type
// We specify %left associatity to prevent shift/reduce conflicts
%left PLUS MINUS
%left EOL

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
	: exp PLUS exp    { $$ = $1+$3; }
	| exp MINUS exp   { $$ = $1-$3; }
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
