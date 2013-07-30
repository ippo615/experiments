%{
#include <stdio.h>
#include <stdlib.h>
// We need to get the token info from bison
#include "types.tab.h"
%}
%%
[ \t\n]           ;
[0-9]+\.[0-9]+    { yylval.float_value = atof(yytext); return FLOAT; }
[0-9]+            { yylval.int_value = atoi(yytext); return INT; }
[a-zA-Z0-9]+      {	yylval.string_value = strdup(yytext); return STRING; }
.                ;
%%
