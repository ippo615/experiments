%{
#include <stdio.h>
#include <stdlib.h>
// We need to get the token info from bison
#include "calc.tab.h"
%}

%%
([ \t])           { ; }
(\+)              { return PLUS; }
(-)               { return MINUS; }
([0-9]+\.*[0-9]*) { yylval.float_value = atof(yytext); return FLOAT; }
(\n)              { return EOL; }
(.)               { ; }
%%
