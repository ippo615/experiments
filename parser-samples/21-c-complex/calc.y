%{
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "complex.c"
extern void yyerror(const char* s);
%}

// This is an option that gives us more verbose error messages
%error-verbose

// These are the data types that we can use.
%union {
	float float_value;
	complex_float complex_float_value;
}

// These are the "terminal symbol" token types, the convention is ALL_CAPS.
// They also get associated with a field in the union above.
%token <float_value>          FLOAT
%token <complex_float_value>  COMPLEX

// Other tokens
/*
%token LBRACKET
%token RBRACKET
%token LPAREN
%token RPAREN
%token LCURLY
%token RCURLY
%token COMMA
*/
// These are the operators that dont have a data type
// We specify %left associatity to prevent shift/reduce conflicts
// Also note that the precidence is bottom-up (ie stuff on the bottom is
// executed before stuff on the top)
%left EOL
%right LOGBASE
%right SIN COS TAN ASIN ACOS ATAN CSC SEC COT HSIN HCOS HTAN LN LOG10 
%left ADD SUB
%left MUL DIV
%right POW
%right NEG
%nonassoc LBRACKET RBRACKET LPAREN RPAREN LCURLY RCURLY COMMA
%right R_UNARY
%left L_UNARY
%nonassoc I

// The types that we allow for 'non-token grammer stuff'
%type <complex_float_value> exp line lines

%%
lines
        : lines line { }
        | line       { }
        ;

line    
        : exp EOL { printf("The result is: %f +i%f\n",$1.real,$1.imag); }
        ;

exp
    : exp POW exp       { $$ = complex_pow($1,$3); }
    | exp MUL exp       { $$ = complex_mul($1,$3); }
    | exp DIV exp       { $$ = complex_div($1,$3); }
    | exp ADD exp       { $$ = complex_add($1,$3); }
    | exp SUB exp       { $$ = complex_sub($1,$3); }
    | SUB exp %prec NEG { $$ = complex_mul($2,complex_make(-1));}
    // TRIG
    | SIN exp  { $$ = complex_sin($2); }
    | COS exp  { $$ = complex_cos($2); }
    | TAN exp  { $$ = complex_tan($2); }
    | ASIN exp { $$ = complex_arcsin($2); }
    | ACOS exp { $$ = complex_arccos($2); }
    | ATAN exp { $$ = complex_arctan($2); }
    | HSIN exp { $$ = complex_hypsin($2); }
    | HCOS exp { $$ = complex_hypcos($2); }
    | HTAN exp { $$ = complex_hyptan($2); }
    | CSC exp  { $$ = complex_csc($2); }
    | SEC exp  { $$ = complex_sec($2); }
    | COT exp  { $$ = complex_cot($2); }
    // Exponents/Logs
    //| LOGBASE exp exp { $$ = complex_log($2,$3); } // reduce/reduce conflict, without this everything is fine
    | LOGBASE LPAREN exp COMMA exp RPAREN { $$ = complex_log($3,$5); }
    | LOGBASE LCURLY exp COMMA exp RCURLY { $$ = complex_log($3,$5); }
    | LOGBASE LBRACKET exp COMMA exp RBRACKET { $$ = complex_log($3,$5); }
    | LN exp          { $$ = complex_ln($2); }
    | LOG10 exp       { $$ = complex_log10($2); }
    // Brackets
    | LBRACKET exp RBRACKET { $$ = $2; }
    | LPAREN   exp RPAREN   { $$ = $2; }
    | LCURLY   exp RCURLY   { $$ = $2; }
    // Numbers
    | I exp %prec R_UNARY { $$ = complex_i($2); } // shift/reduce conflict
    | exp I %prec L_UNARY { $$ = complex_i($1); } // shift/reduce conflict
    | I          { $$ = complex_i(complex_make(1.0f)); } // doubles problems
    | FLOAT      { $$ = complex_make($1); }
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
