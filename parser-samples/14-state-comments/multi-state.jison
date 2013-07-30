/* Turns a comma separated list of numbers into an array */

// lexical grammar
%lex
%options flex
// States
%x CMT CURLY
%%



// Comments
(\/\*)      {this.begin('CMT');}
<CMT>(\*\/) {this.popState();}
// Only match 1 character at a time.
// The tokenizer uses the LONGEST string match
// so if i coded that as <CMT>(.+) then the tokenizer
// would return everything including the end comment
// token. Which means we'd be stuck in the comment
// forever...
<CMT>(.)    {}

// Some other thing...
("{")         {this.begin('CURLY');alert('BGNCURLY');}
<CURLY>("}")  {this.popState();alert('ENDCURLY');}

<INITIAL,CURLY>[0-9]+("."[0-9]+)?\b  {return 'NUMBER'}
([,; \n\t]+)          {return 'SEP'}
<<EOF>>               { return 'EOF' }

/lex

/* operator associations and precedence */

%left SEP

%start prog

%% /* language grammar */

prog
  : list EOF {return $$;}
  ;
list
  : list_element {$$=[]; $$.push($1);}
  | list SEP list_element { $1.push($3); $$ = $1; }
  ;

list_element
  : NUMBER {$$ = $1;}
  ;

// Example:
//1 2 3 4 5; 6, /*7,8,*/9,10
//1 2 3 /*4 5; 6, /*7,8,*/9,10
//1 {2} 3 /*4 5; 6, /*7,8,*/9,{10}