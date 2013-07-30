/* PEMDAS
 * This does basic 5th grade math, following order of operations.
 * PEMDAS - Parenthesis, Exponents, MD-Multiplication/Division, AS-Addition/Subtraction
 */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]*("."[0-9]+)?\b  return 'NUMBER'
"**"                  return '**'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return '('
")"                   return ')'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */
%left '-' '+' /* This is done last */
%left '*' '/' 
%left NEG     /* negation--unary minus */
%right '^' '**'    /* exponentiation, done first */

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { return $1; }
    ;

e
    : e '*' e 
        {$$ = $1*$3;}
    | e '+' e
        {$$ = $1+$3;}
    | e '-' e 
        {$$ = $1-$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '**' e
        {$$ = Math.pow($1,$3);}
    | NUMBER
        {$$ = Number(yytext);}
    | '(' e ')'
        {$$ = $2}
    ;