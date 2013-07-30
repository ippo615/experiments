/* Turns a comma separated list of numbers into an array */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
","                   return 'SEP'
.               return 'EOF'

/lex

/* operator associations and precedence */

%left SEP

%start prog

%% /* language grammar */

prog
  : list {return $$;}
  ;
list
  : list_element {$$=[]; $$.push($1);}
  | list SEP list_element { $1.push($3); $$ = $1; }
  ;

list_element
  : NUMBER {$$ = $1;}
  ;