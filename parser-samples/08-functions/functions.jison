/* Lambda calculus grammar by Zach Carter */

%lex
%%
/* Operators */
// Note that POW (**) can be made from 2 MUL (*).
// To avoid errors put the 'longer' one at the top.
'**'         { return 'POW'; }
'^'          { return 'POW'; }
'+'          { return 'ADD'; }
'-'          { return 'SUB'; }
'*'          { return 'MUL'; }
'/'          { return 'DIV'; }
/* Functions */
[sS][iI][nN]   { return 'SIN'; }
[cC][oO][sS]   { return 'COS'; }
/* Groupers */
// I had trouble when I didn't give these names
'{'     { return 'LCB'; } // Curly Brackets
'}'     { return 'RCB'; }
'('     { return 'LPA'; } // Parenthesis
')'     { return 'RPA'; }
'['     { return 'LSB'; } // Square Brackets
']'     { return 'RSB'; }
/* Separators */
\s+       { return 'SEP'; }
\s*\n\s*  { return 'EOL'; }
<<EOF>>   { return 'EOF'; }
/* NUmbers and variables */
[a-zA-Z]+       { return 'VAR'; }
[0-9]+\.*[0-9]* { return 'NUMBER'; }
/lex

/* Order of operations */
%left ADD SUB
%left MUL DIV
%right POW
%right SIN COS NEG
%

%%

file
  : expr EOF { return $1; }
  ;

expr
  : SEP { } // ignore separation
  | EOL { } // ignore end of line
  | expr ADD expr {$$ = $1+$3;}
  | expr SUB expr {$$ = $1-$3;}
  | expr MUL expr {$$ = $1*$3;}
  | expr DIV expr {$$ = $1/$3;}
  | expr POW expr {$$ = Math.pow($1,$3);}
  | SIN expr {$$ = Math.sin($2);}
  | COS expr {$$ = Math.cos($2);}
  | NEG expr {$$ = -$2;}
  | LCB expr RCB {$$ = $2;}
  | LPA expr RPA {$$ = $2;}
  | LSB expr RSB {$$ = $2;}
  | NUMBER {$$ = parseFloat(yytext);}
  ;