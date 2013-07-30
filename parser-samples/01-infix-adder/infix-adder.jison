
%lex
%%

[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"+"                   return '+'
<<EOF>>               return 'EOF'

/lex

%start expressions
%left '+'
%%

/* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | NUMBER
        {$$ = Number(yytext);}
    ;
