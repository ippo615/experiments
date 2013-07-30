/* Translates latex equations to javascript */

%lex
// States (by default there is also 'INITIAL'
%x ARRAY

// Some code that does stuff
%{
  // Number parsing
  doNumber = function(a){return parseFloat(a);};
  // Basic operators
  doAdd = function(a,b){return a+'+'+b;};
  doSub = function(a,b){return a+'-'+b;};
  doMul = function(a,b){return a+'*'+b;};
  doDiv = function(a,b){return a+'/'+b;};
  doPow = function(a,b){return 'Math.pow('+a+','+b+')';};
  doMod = function(a,b){return a+'%'+b;};
  doSqrt = function(a){return 'Math.sqrt('+a+')';};
  doLn = function(a){return 'Math.log('+a+')/Math.log(Math.E)';};
  doLog10 = function(a){return 'Math.log('+a+')/Math.log(10)';};
  doLogBase = function(a,b){return 'Math.log('+b+')/Math.log('+a+')';};
  // Brackets
  doParen = function(a){return '('+a+')';};
  doCurly = function(a){return '('+a+')';};
  doSquare = function(a){return '('+a+')';};
  doFloor = function(a){return 'Math.floor('+a+')';};
  doCeil = function(a){return 'Math.ceil('+a+')';};
  doAbs = function(a){return 'Math.abs('+a+')';};
  // Trig
  doSin = function(a){return 'Math.sin('+a+')';};
  doCos = function(a){return 'Math.cos('+a+')';};
  doTan = function(a){return 'Math.tan('+a+')';};
  doArcSin = function(a){return 'Math.asin('+a+')';};
  doArcCos = function(a){return 'Math.acos('+a+')';};
  doArcTan = function(a){return 'Math.atan('+a+')';};
  doCsc = function(a){return '1/Math.sin('+a+')';};
  doSec = function(a){return '1/Math.cos('+a+')';};
  doCot = function(a){return '1/Math.tan('+a+')';};
  // Logic
  doNot = function(a){ return '!'+a;};
  doAnd = function(a,b){ return a+'&&'+b;};
  doOr = function(a,b){ return a+'||'+b;};
  doIfThen = function(a,b){ return 'if('+a+'){'+b+';}'; };
  doEqual = function(a,b){ return a +'='+ b; }; // need fixing for logical test
  doNotEqual = function(a,b){ return a+'!='+b; };
  doLess = function(a,b){ return a+'<'+b; };
  doGreater = function(a,b){ return a+'>'+b; };
  doLessEq = function(a,b){ return a+'<='+b; };
  doGreaterEq = function(a,b){ return a+'>='+b; };
  // Summations
  doSumLowerVarUpper = function(index,start,upper,expression){
    var code = 'var '+index+', sum'+index+'=0;';
    code += 'for('+index+'='+start+'; ';
    code += index+'<'+upper+'; ';
    code += index+'+=1){'
    code += 'sum'+index+'+='+expression;
    code += ';}';
    return code;
  };
  doUnderscore = function(a,b){ return a+'['+b+']'; };
  // Constants:
  doConst = function(a){
    if( a === 'e' ){return 'Math.E';}
    if( a === '\pi' ){ return 'Math.PI';}
  };
  // Symbols (ie variables)
  doVar = function(a){
    if( a.indexOf('\\') === 0 ){
      return a.slice(1);
    }
    // Other ie x or y or froggie
    return a;
  };
%}

%%


// Basic operators
<INITIAL,ARRAY>("+")                   { return 'ADD'; }
<INITIAL,ARRAY>("-")                   { return 'SUB'; }
<INITIAL,ARRAY>("\\pm")                { return 'ADDSUB'; }
<INITIAL,ARRAY>("*")                   { return 'MUL'; }
<INITIAL,ARRAY>("\\times")             { return 'MUL'; }
<INITIAL,ARRAY>("\\cdot")              { return 'MUL'; }
<INITIAL,ARRAY>("/")                   { return 'DIV'; }
<INITIAL,ARRAY>("\\div")               { return 'DIV'; }
<INITIAL,ARRAY>("\\frac")              { return 'FRAC'; }
<INITIAL,ARRAY>("\\mod")               { return 'MOD'; }
// Exponential stuff
<INITIAL,ARRAY>("\\sqrt")              { return 'SQRT'; }
<INITIAL,ARRAY>("^")                   { return 'POW'; }
<INITIAL,ARRAY>("\\ln")                { return 'LN'; }
<INITIAL,ARRAY>("\\log_")              { return 'LOGBASE'; }
<INITIAL,ARRAY>("\\log")               { return 'LOG10'; }
// Trig functions 
<INITIAL,ARRAY>("\\sin")               { return 'SIN'; }
<INITIAL,ARRAY>("\\cos")               { return 'COS'; }
<INITIAL,ARRAY>("\\tan")               { return 'TAN'; }
<INITIAL,ARRAY>("\\arcsin")            { return 'ARCSIN'; }
<INITIAL,ARRAY>("\\arccos")            { return 'ARCCOS'; }
<INITIAL,ARRAY>("\\arctan")            { return 'ARCTAN'; }
<INITIAL,ARRAY>("\\csc")               { return 'CSC'; }
<INITIAL,ARRAY>("\\sec")               { return 'SEC'; }
<INITIAL,ARRAY>("\\cot")               { return 'COT'; }
// Brackets 
<INITIAL,ARRAY>("||")                  { return 'MAGNITUDE'; }
<INITIAL,ARRAY>("|")                   { return 'ABS'; }
<INITIAL,ARRAY>("(")                   { return 'LPAREN'; }
<INITIAL,ARRAY>("{")                   { return 'LCURLY'; }
<INITIAL,ARRAY>("[")                   { return 'LSQUARE'; }
<INITIAL,ARRAY>("\\lceil")             { return 'LCEIL'; }
<INITIAL,ARRAY>("\\lfloor")            { return 'LFLOOR'; }
<INITIAL,ARRAY>(")")                   { return 'RPAREN'; }
<INITIAL,ARRAY>("}")                   { return 'RCURLY'; }
<INITIAL,ARRAY>("]")                   { return 'RSQUARE'; }
<INITIAL,ARRAY>("\\rceil")             { return 'RCEIL'; }
<INITIAL,ARRAY>("\\rfloor")            { return 'RFLOOR'; }
<INITIAL,ARRAY>("\\left")              {  }
<INITIAL,ARRAY>("\\right")             {  }
// Logic stuff
<INITIAL,ARRAY>("\\sim")               {return 'NOT';}
<INITIAL,ARRAY>("\\wedge")             {return 'AND';}
<INITIAL,ARRAY>("\\vee")               {return 'OR';}
<INITIAL,ARRAY>("\\to")                {return 'IFTHEN';}
<INITIAL,ARRAY>("\\leftrightarrow")    {return 'IFTHEN';}
<INITIAL,ARRAY>("\\Rightarrow")        {return 'IFTHEN';}
<INITIAL,ARRAY>("\\Leftrightarrow")    {return 'IFTHEN';}
<INITIAL,ARRAY>("=")                   {return 'EQUAL';}
<INITIAL,ARRAY>("\\equiv")             {return 'EQUAL';}
<INITIAL,ARRAY>("\\ne")                {return 'NOT_EQUAL';}
<INITIAL,ARRAY>("\\le")                {return 'LESS_EQUAL';}
<INITIAL,ARRAY>("<=")                  {return 'LESS_EQUAL';}
<INITIAL,ARRAY>("<")                   {return 'LT';}
<INITIAL,ARRAY>("\\ge")                {return 'GREAT_EQUAL';}
<INITIAL,ARRAY>(">=")                  {return 'GREAT_EQUAL';}
<INITIAL,ARRAY>(">")                   {return 'GT';}
// Summation and product
//<INITIAL,ARRAY>("_")                   {return 'SUBSCRIPT';}
//<INITIAL,ARRAY>("\\sum")               {return 'SUM';}
<INITIAL,ARRAY>("\\sum_")               {return 'SUM';}
<INITIAL,ARRAY>("_")                   {return 'UNDERSCORE';}

// Varibles numbers and constants
<INITIAL,ARRAY>([0-9]*\.{0,1}[0-9]+)   { return 'NUMBER'; }
<INITIAL,ARRAY>([A-Za-z][a-zA-Z0-9]*)       { return 'VAR'; }
<INITIAL,ARRAY>("\\alpha")      { return 'VAR'; }
<INITIAL,ARRAY>("\\beta")       { return 'VAR'; }
<INITIAL,ARRAY>("\\chi")        { return 'VAR'; }
<INITIAL,ARRAY>("\\delta")      { return 'VAR'; }
<INITIAL,ARRAY>("\\epsilon")    { return 'VAR'; }
<INITIAL,ARRAY>("\\varepsilon") { return 'VAR'; }
<INITIAL,ARRAY>("\\eta")        { return 'VAR'; }
<INITIAL,ARRAY>("\\gamma")      { return 'VAR'; }
<INITIAL,ARRAY>("\\iota")       { return 'VAR'; }
<INITIAL,ARRAY>("\\kappa")      { return 'VAR'; }
<INITIAL,ARRAY>("\\lambda")     { return 'VAR'; }
<INITIAL,ARRAY>("\\mu")         { return 'VAR'; }
<INITIAL,ARRAY>("\\nu")         { return 'VAR'; }
<INITIAL,ARRAY>("\\omega")      { return 'VAR'; }
<INITIAL,ARRAY>("\\phi")        { return 'VAR'; }
<INITIAL,ARRAY>("\\varphi")     { return 'VAR'; }
<INITIAL,ARRAY>("\\pi")         { return 'VAR'; }
<INITIAL,ARRAY>("\\psi")        { return 'VAR'; }
<INITIAL,ARRAY>("\\rho")        { return 'VAR'; }
<INITIAL,ARRAY>("\\sigma")      { return 'VAR'; }
<INITIAL,ARRAY>("\\tau")        { return 'VAR'; }
<INITIAL,ARRAY>("\\theta")      { return 'VAR'; }
<INITIAL,ARRAY>("\\upsilon")    { return 'VAR'; }
<INITIAL,ARRAY>("\\xi")         { return 'VAR'; }
<INITIAL,ARRAY>("\\zeta")       { return 'VAR'; }
<INITIAL,ARRAY>("\\Delta")      { return 'VAR'; }
<INITIAL,ARRAY>("\\Gamma")      { return 'VAR'; }
<INITIAL,ARRAY>("\\Lambda")     { return 'VAR'; }
<INITIAL,ARRAY>("\\Omega")      { return 'VAR'; }
<INITIAL,ARRAY>("\\Phi")        { return 'VAR'; }
<INITIAL,ARRAY>("\\Pi")         { return 'VAR'; }
<INITIAL,ARRAY>("\\Psi")        { return 'VAR'; }
<INITIAL,ARRAY>("\\Sigma")      { return 'VAR'; }
<INITIAL,ARRAY>("\\Theta")      { return 'VAR'; }
<INITIAL,ARRAY>("\\Upsilon")    { return 'VAR'; }
<INITIAL,ARRAY>("\\Xi")         { return 'VAR'; }
<INITIAL,ARRAY>("\\aleph")      { return 'VAR'; }
<INITIAL,ARRAY>("\\beth")       { return 'VAR'; }
<INITIAL,ARRAY>("\\daleth")     { return 'VAR'; }
<INITIAL,ARRAY>("\\gimel")      { return 'VAR'; }
<INITIAL,ARRAY>("e")                   { return 'CONST'; }
<INITIAL,ARRAY>("\\pi")                { return 'CONST'; }

// Other stuff to ignore 
<INITIAL,ARRAY>("$")                   {  }
<INITIAL,ARRAY>(\s+)                   {  }
<INITIAL,ARRAY><<EOF>>                 { return 'EOF'; }

/lex

/* operator associations and precedence */
%left SUM
%left IFTHEN
%left NOT AND OR EQUAL NOT_EQUAL LT GT GREAT_EQ LESS_EQ
%left ADD SUB
%left MUL DIV FRAC MOD
%right POW SQRT
%right SIN COS TAN ARCSIN ARCCOS ARCTAN CSC SEC COT LN LOG10 LOGBASE
%right UNDERSCORE
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
    // Logic
    | e IFTHEN e         {$$ = doIfThen($1,$3);}
    | NOT e              {$$ = doNot($2);}
    | e AND e            {$$ = doAnd($1,$3);}
    | e OR e             {$$ = doOr($1,$3);}
    | e EQUAL e          {$$ = doEqual($1,$3);}
    | e NOT_EQUAL e      {$$ = doNotEqual($1,$3);}
    | e LT e             {$$ = doLess($1,$3);}
    | e GT e             {$$ = doGreater($1,$3);}
    | e GREAT_EQ e       {$$ = doGreaterEq($1,$3);}
    | e LESS_EQ e        {$$ = doLessEq($1,$3);}
    // Summations
//    | SUM SUBSCRIPT VAR EQUAL NUMBER POW NUMBER e {$$ = doSumLowerVarUpper($3,$5,$7,$8);}
    | SUM VAR EQUAL NUMBER POW NUMBER e {$$ = doSumLowerVarUpper($2,$4,$6,$7);}
    | VAR UNDERSCORE e {$$ = doUnderscore($1,$3);}
    // Basics
    | CONST               {$$ = doConst(yytext); }
    | NUMBER              {$$ = doNumber(yytext); }
    | VAR                 {$$ = doVar(yytext); }
    ;
