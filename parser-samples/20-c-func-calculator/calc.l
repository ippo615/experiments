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

([sS][iI][nN])    { return SIN; }
([cC][oO][sS])    { return COS; }
([tT][aA][nN])    { return TAN; }
([aA][rR][cC][sS][iI][nN]) { return ASIN; }
([aA][rR][cC][cC][oO][sS]) { return ACOS; }
([aA][rR][cC][tT][aA][nN]) { return ATAN; }
([sS][iI][nN][hH])    { return HSIN; }
([cC][oO][sS][hH])    { return HCOS; }
([tT][aA][nN][hH])    { return HTAN; }
([cC][sS][cC])    { return CSC; }
([sS][eE][cC])    { return SEC; }
([cC][oO][tT])    { return COT; }

([lL][oO][gG])    { return LOG10; }
([lL][nN])        { return LN; }
([lL][oO][gG][bB][aA][sS][eE]) { return LOGBASE; }

(\*\*)            { return POW; }
(^)               { return POW; }
(\*)              { return MUL; }
(\/)              { return DIV; }
(\+)              { return ADD; }
(-)               { return SUB; }

([eE])            { yylval.float_value = 2.71828f; return FLOAT; }
([pP][iI])        { yylval.float_value = 3.14159f; return FLOAT; }
([0-9]+\.*[0-9]*) { yylval.float_value = atof(yytext); return FLOAT; }
(\n)              { return EOL; }
(.)               { ; }
%%
