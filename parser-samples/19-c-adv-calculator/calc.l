%{
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
// We need to get the token info from bison
#include "calc.tab.h"
%}

%%
([ \t])           { ; }
(\()              { return LPAREN; }
(\))              { return RPAREN; }
(\[)              { return LBRACKET; }
(\])              { return RBRACKET; }
(\{)              { return LCURLY; }
(\})              { return RCURLY; }
(\*\*)            { return POW; }
(^)               { return POW; }
(\*)              { return MUL; }
(\/)              { return DIV; }
(\+)              { return ADD; }
(-)               { return SUB; }
([0-9]+\.*[0-9]*) { yylval.float_value = atof(yytext); return FLOAT; }
(\n)              { return EOL; }
(.)               { ; }
%%
