/* Does stuff with complex numbers
 * (5+2i) / (7+4i) = {"real":0.6615384615384615,"imag":-0.09230769230769231}
 * (-1+8i) * (0.5+2i) = {"real":-16.5,"imag":2}
 * -1+ii-ji+5i*3 = {"real":-1,"imag":15}
 */

/* lexical grammar */
%lex

// Some code that does stuff
%{
  Complex = function(real,imag){
    return {
      real: real,
      imag: imag
    };
  };
  cpxAdd = function(c1,c2){
    return {
      real: c1.real + c2.real,
      imag: c1.imag + c2.imag
    }
  };
  cpxSub = function(c1,c2){
    return {
      real: c1.real - c2.real,
      imag: c1.imag - c2.imag
    }
  };
  cpxMul = function(c1,c2){
    return {
      real: c1.real*c2.real - c1.imag*c2.imag,
      imag: c1.real*c2.imag + c2.real*c1.imag
    };
  };
  cpxDiv = function(c1,c2){
    var denom = c2.real*c2.real + c2.imag*c2.imag;
    return {
        real: ( c1.real*c2.real + c1.imag*c2.imag)/denom,
        imag: (-c1.real*c2.imag + c2.real*c1.imag)/denom
    };
  };
  cpxSca = function(c1,sr,si){
    return {
      real: c1.real*sr,
      imag: c1.imag*si
    };
  };
  cpxI = function(c1){
    return {
      real: -1*c1.imag,
      imag: c1.real
    };
  };
  cpxPow = function(c1,c2){
    var nLeft = Math.floor(c2.real)-1;
    var result = c1;
    while(nLeft--){
      result = cpxMul(result,c1);
    }
    return result;
  };
  cpxPrint = function(c1){
    if( c1.imag > 0 ){
       return c1.real +'+i'+ c1.imag;
    }else if(c1.imag === 0){
       return c1.real +'';
    }else if(c1.imag < 0){
       return c1.real +'-i'+ (-c1.imag);
    }
    return 'wtf?'; 
  };
%}

%%

\s+                   /* skip whitespace */
[0-9]*\.{0,1}[0-9]+  return 'NUMBER'
[ij]                   return 'I'
"+"                   return 'ADD'
"-"                   return 'SUB'
"*"                   return 'MUL'
"^"                   return 'POW'
"/"                   return 'DIV'
"("                   return '('
"{"                   return '{'
"["                   return '['
")"                   return ')'
"}"                   return '}'
"]"                   return ']'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%left 'ADD' 'SUB'
%left 'MUL' 'DIV'
%right 'POW'
%left 'NEG' /* unary negate operator should be done first */
%left 'I'


%start expressions

%% /* language grammar */

expressions
    : e EOF   {return cpxPrint($1);}
    ;

e
    : e 'ADD' e           {$$ = cpxAdd($1,$3);}
    | e 'SUB' e           {$$ = cpxSub($1,$3);}
    | e 'MUL' e           {$$ = cpxMul($1,$3);}
    | e 'DIV' e           {$$ = cpxDiv($1,$3);}
    | e 'POW' e           {$$ = cpxPow($1,$3);}
    | 'SUB' e %prec 'NEG' {$$ = cpxSca($2,-1,-1); }
    | 'I' e               {$$ = cpxI($2); }
    | e 'I'               {$$ = cpxI($1); }
    | 'I'                 {$$ = Complex(0,1); }
    | '(' e ')'           {$$ = $2}
    | '{' e '}'           {$$ = $2}
    | '[' e ']'           {$$ = $2}
    | NUMBER              {$$ = Complex(Number(yytext),0); }
    ;
