/* Working with variables 
 * (hello=8)*7+hello --> 64
 * 7+(x=5)-2+x --> 15
 * z+4 --> null
 */
%lex
%{
var variables = {};
%}

int  "-"?([0-9]|[1-9][0-9]+)
exp  [eE][-+]?[0-9]+
frac  "."[0-9]+

%%
/* Operators */
'**'         { return 'POW'; }
'^'          { return 'POW'; }
'+'          { return 'ADD'; }
'-'          { return 'SUB'; }
'*'          { return 'MUL'; }
'/'          { return 'DIV'; }
':='         { return 'SET'; }
'='          { return 'SET'; }
/* Functions */
[sS][iI][nN]   { return 'SIN'; }
[cC][oO][sS]   { return 'COS'; }
/* Groupers */
'{'     { return 'LCB'; } // Curly Brackets
'}'     { return 'RCB'; }
'('     { return 'LPA'; } // Parenthesis
')'     { return 'RPA'; }
'['     { return 'LSB'; } // Square Brackets
']'     { return 'RSB'; }
/* Separators */
\s+       { return 'SEP'; }
';'       { return 'SEP'; }
','       { return 'SEP'; }
\s*\n\s*  { return 'EOL'; }
<<EOF>>   { return 'EOF'; }
/* NUmbers and variables */
[a-zA-Z]+            { return 'VAR'; }
{int}{frac}?{exp}?\b { return 'NUMBER'; }
/lex

/* Order of operations */
%right SET
%right SEP
%left ADD SUB
%left MUL DIV
%right POW
%right SIN COS NEG
%

%%

file
  : expr EOF { return $1; }
  | file expr {return $1;}
  | expr {return $1;}
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
  | VAR SET expr {$$ = $3; variables[$1]=$3;}
  | VAR {$$ = variables[$1];}
  | NUMBER {$$ = parseFloat(yytext);}
  ;