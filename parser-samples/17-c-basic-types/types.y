%{
#include <stdio.h>
#include <stdlib.h>
extern void yyerror(const char* s);
%}

// These are the data types that we can use.
%union {
	int    int_value;
	float  float_value;
	char  *string_value;
}

// These are the "terminal symbol" token types, the convention is ALL_CAPS.
// They also get associated with a field in the union above.
%token <int_value>    INT
%token <float_value>  FLOAT
%token <string_value> STRING

%%
// This is the acutal grammer. Notice how these `printf`s have different
// types than before.
line
	: line INT    { printf( "bison found an int: %d\n",$2); }
	| line FLOAT  { printf( "bison found a float: %f\n",$2); }
	| line STRING { printf( "bison found a string: %s\n",$2); }
	| INT         { printf( "bison found an int: %d\n",$1); }
	| FLOAT       { printf( "bison found a float: %f\n",$1); }
	| STRING      { printf( "bison found a string: %s\n",$1); }
	;
%%

main() {
	printf("Enter some stuff:\n");
	// Last time that was `yylex` - Took me TOO long to figure out that I
	// needed to use `yyparse` in Bison.
	yyparse();
	printf("\nDone!\n");
}

extern void yyerror(const char *s) {
	printf("Parse error: %s",s);
}

