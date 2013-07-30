%lex
// Simple token constructions
dec    ([1-9][0-9]*)
H6     (\#\#\#\#\#\#)
H5     (\#\#\#\#\#)
H4     (\#\#\#\#)
H3     (\#\#\#)
H2     (\#\#)
H1     (\#)
newline (\n)

%{
// Desired JS code
%}

// List of states
%x INITIAL

%%

// Token definitions
<*><<EOF>>       { return 'EOF'; }
<*>{newline}      { return 'EOL'; }
<*>{H5}           { return 'H5' ; }
<*>{H4}           { return 'H4' ; }
<*>{H3}           { return 'H3' ; }
<*>{H2}           { return 'H2' ; }
<*>{H1}           { return 'H1' ; }
<*>(.+)           { return 'TEXT'; }
/lex

%start file

%%

file
  : file_elements EOF { return $$; }
  ;

file_elements
  : element { $$ = [$1]; }
  | file_elements element { $$.push($2); }
  ;

header
  : H1 TEXT { $$ = 'H1:'+$2; }
  | H2 TEXT { $$ = 'H2:'+$2; }
  | H3 TEXT { $$ = 'H3:'+$2; }
  | H4 TEXT { $$ = 'H4:'+$2; }
  ;


element
  : TEXT EOL  { $$ = $1; }
  | header EOL { $$ = $1; }
  | EOL { }
  ;