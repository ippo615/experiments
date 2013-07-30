/* Does stuff with dual numbers
 * What's cool about these is that you can compute the exact
 * numerical derivative of a function as follows:
 * Consider: f(x) = 3 + x^2
 * You want to know d/dx f(5)
 * Compute f(5+d) = 3 + (5+d)^2
 * Yields: 28+d10
 * therefore: d/dx f(5) = 10
 * To verify this: take the actual derivative
 * d/dx f(x) = 2x 
 * Evaluate that at x=5 yields 10 which agrees with the above
 * The formal proof has something to do with Taylor series...
 */

/* lexical grammar */
%lex

// Some code that does stuff
%{

  Dual = function(real,dual){
    return {
      real: real,
      dual: dual
    };
  };
  dualAdd = function(d1,d2){
    return Dual(
      d1.real + d2.real,
      d1.dual + d2.dual
    );
  };
  dualSub = function(d1,d2){
    return Dual(
      d1.real - d2.real,
      d1.dual - d2.dual
    );
  };
  dualMul = function(d1,d2){
    return Dual(
      d1.real*d2.real,
      d1.real*d2.dual + d2.real*d1.dual
    );
  };
  dualDiv = function(d1,d2){
    return Dual(
        d1.real/d2.real ,
	( d1.dual*d2.real - d1.real*d2.dual )/(d2.real*d2.real)
    );
  };
  dualSca = function(d1,sr,si){
    return {
      real: d1.real*sr,
      dual: d1.dual*si
    };
  };
  dualD = function(d1){
    return dualMul(d1,Dual(0,1));
  };
  dualPow = function(d1,d2){
    var nLeft = Math.floor(d2.real)-1;
    var result = d1;
    while(nLeft--){
      result = dualMul(result,d1);
    }
    return result;
  };
  dualPrint = function(d1){
    if( d1.dual > 0 ){
       return d1.real +'+d'+ d1.dual;
    }else if(d1.dual === 0){
       return d1.real +'';
    }else if(d1.dual < 0){
       return d1.real +'-d'+ (-d1.dual);
    }
    return 'wtf?'; 
  };

%}

%%

\s+                   /* skip whitespace */
[0-9]*\.{0,1}[0-9]+   return 'NUMBER'
[dD]                  return 'D'
"^"                   return 'POW'
"**"                  return 'POW'
"+"                   return 'ADD'
"-"                   return 'SUB'
"*"                   return 'MUL'
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
%left 'D'


%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return dualPrint($1);}
    ;

e
    : e ADD e           {$$ = dualAdd($1,$3);}
    | e SUB e           {$$ = dualSub($1,$3);}
    | e MUL e           {$$ = dualMul($1,$3);}
    | e DIV e           {$$ = dualDiv($1,$3);}
    | e POW e           {$$ = dualPow($1,$3);}
    | SUB e %prec NEG   {$$ = dualSca($2,-1,-1); }
    | D e               {$$ = dualD($2); }
    | e D               {$$ = dualD($1); }
    | D                 {$$ = Dual(0,1); }
    | '(' e ')'           {$$ = $2}
    | '{' e '}'           {$$ = $2}
    | '[' e ']'           {$$ = $2}
    | NUMBER              {$$ = Dual(Number(yytext),0); }
    ;
