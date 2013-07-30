/* Ealuates simple LATEX equations */

/* lexical grammar */
%lex

// Some code that does stuff
%{
  // Number parsing
  doNumber = function(a){return parseFloat(a);};
  // Basic operators
  doAdd = function(a,b){return a+b;};
  doSub = function(a,b){return a-b;};
  doMul = function(a,b){return a*b;};
  doDiv = function(a,b){return a/b;};
  doPow = function(a,b){return Math.pow(a,b);};
  doMod = function(a,b){return a%b;};
  doSqrt = function(a){return Math.sqrt(a);};
  doLn = function(a){return Math.log(a)/Math.log(Math.E);};
  doLog10 = function(a){return Math.log(a)/Math.log(10);};
  doLogBase = function(a,b){return Math.log(b)/Math.log(a);};
  // Brackets
  doParen = function(a){return a;};
  doCurly = function(a){return a;};
  doSquare = function(a){return a;};
  doFloor = function(a){return Math.floor(a);};
  doCeil = function(a){return Math.ceil(a);};
  doAbs = function(a){return Math.abs(a);};
  // Trig
  doSin = function(a){return Math.sin(a);};
  doCos = function(a){return Math.cos(a);};
  doTan = function(a){return Math.tan(a);};
  doArcSin = function(a){return Math.asin(a);};
  doArcCos = function(a){return Math.acos(a);};
  doArcTan = function(a){return Math.atan(a);};
  doCsc = function(a){return 1/Math.sin(a);};
  doSec = function(a){return 1/Math.cos(a);};
  doCot = function(a){return 1/Math.tan(a);};
  // Constants:
  doConst = function(a){
    if( a === 'e' ){return Math.E;}
    if( a === '\pi' ){ return Math.PI;}
  };
%}

%%

([0-9]*\.{0,1}[0-9]+)   { return 'NUMBER'; }
// Basic operators
("+")                   { return 'ADD'; }
("-")                   { return 'SUB'; }
("\\pm")                { return 'ADDSUB'; }
("*")                   { return 'MUL'; }
("\\times")             { return 'MUL'; }
("\\cdot")              { return 'MUL'; }
("/")                   { return 'DIV'; }
("\\div")               { return 'DIV'; }
("\\frac")              { return 'FRAC'; }
("\\mod")               { return 'MOD'; }
// Exponential stuff
("\\sqrt")              { return 'SQRT'; }
("^")                   { return 'POW'; }
("\\ln")                { return 'LN'; }
("\\log_")              { return 'LOGBASE'; }
("\\log")               { return 'LOG10'; }
// Constants
("e")                   { return 'CONST'; }
("\\pi")                { return 'CONST'; }
// Trig functions 
("\\sin")               { return 'SIN'; }
("\\cos")               { return 'COS'; }
("\\tan")               { return 'TAN'; }
("\\arcsin")            { return 'ARCSIN'; }
("\\arccos")            { return 'ARCCOS'; }
("\\arctan")            { return 'ARCTAN'; }
("\\csc")               { return 'CSC'; }
("\\sec")               { return 'SEC'; }
("\\cot")               { return 'COT'; }
// Brackets 
("||")                  { return 'MAGNITUDE'; }
("|")                   { return 'ABS'; }
("(")                   { return 'LPAREN'; }
("{")                   { return 'LCURLY'; }
("[")                   { return 'LSQUARE'; }
("\\lceil")             { return 'LCEIL'; }
("\\lfloor")            { return 'LFLOOR'; }
(")")                   { return 'RPAREN'; }
("}")                   { return 'RCURLY'; }
("]")                   { return 'RSQUARE'; }
("\\rceil")             { return 'RCEIL'; }
("\\rfloor")            { return 'RFLOOR'; }
("\\left")              {  }
("\\right")             {  }
// Other stuff to ignore 
("$")                   {  }
(\s+)                   {  }
<<EOF>>                 { return 'EOF'; }

/lex

/* operator associations and precedence */

%left ADD SUB
%left MUL DIV FRAC MOD
%right POW SQRT
%right SIN COS TAN ARCSIN ARCCOS ARCTAN CSC SEC COT LN LOG10 LOGBASE
%right NEG /* unary negate operator should be done first */
%left IGNORE NUMBER


%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
    : e ADD e           {$$ = doAdd($1,$3);}
    | e SUB e           {$$ = doSub($1,$3);}
    | e MUL e           {$$ = doMul($1,$3);}
    | e DIV e           {$$ = doDiv($1,$3);}
    | e MOD e           {$$ = doMod($1,$3);}
    | SQRT e            {$$ = doSqrt($2);}
    | FRAC e e          {$$ = doDiv($2,$3);}
    | e POW e           {$$ = doPow($1,$3);}
    | LN e              {$$ = doLn($2);}
    | LOG10 e           {$$ = doLog10($2);}
    | LOGBASE e e       {$$ = doLogBase($2,$3);}
    // Brackets
    | ABS     e ABS      {$$ = doAbs($2);}
    | LPAREN  e RPAREN   {$$ = doParen($2);}
    | LCURLY  e RCURLY   {$$ = doCurly($2);}
    | LSQUARE e RSQUARE  {$$ = doSquare($2);}
    | LFLOOR  e RFLOOR   {$$ = doFloor($2);}
    | LCEIL   e RCEIL    {$$ = doCeil($2);}
    // Trig
    | SIN e              {$$ = doSin($2);}
    | COS e              {$$ = doCos($2);}
    | TAN e              {$$ = doTan($2);}
    | ARCSIN e           {$$ = doArcSin($2);}
    | ARCCOS e           {$$ = doArcCos($2);}
    | ARCTAN e           {$$ = doArcTan($2);}
    | CSC e              {$$ = doCsc($2);}
    | SEC e              {$$ = doSec($2);}
    | COT e              {$$ = doCot($2);}
    // Basics
    | CONST               {$$ = doConst(yytext); }
    | NUMBER              {$$ = doNumber(yytext); }
    ;

