/* Does stuff with complex numbers
 * (5+2i) / (7+4i) = {"real":0.6615384615384615,"imag":-0.09230769230769231}
 * (-1+8i) * (0.5+2i) = {"real":-16.5,"imag":2}
 * -1+ii-ji+5i*3 = {"real":-1,"imag":15}
 */

/* lexical grammar */
%lex

// Some code that does stuff
%{
  Fraction = function(num,den){
    return {
      num: num,
      den: den
    };
  };
  greatestCommonDivisor = function(a,b){
     var t = b;
     while( b !== 0 ){
       t = b;
       b = a % t;
       a = t;
    }
    return a;
  };
  leastCommonMultiple = function(a,b){
    var gcd = greatestCommonDivisor(a,b);
    return Math.abs( a/gcd * b );
  };
  matchDenom = function(c1,c2){
    var lcm = leastCommonMultiple(c1.den,c2.den);
    // we'll need to scale the numerators to agree with the new denominator
    var s1 = lcm / c1.den;
    var s2 = lcm / c2.den;
    c1.num = c1.num * s1;
    c2.num = c2.num * s2;
    c1.den = lcm;
    c2.den = lcm;
  };
  fracAdd = function(c1,c2){
    matchDenom(c1,c2);
    return Fraction(c1.num + c2.num, c1.den);
  };
  fracSub = function(c1,c2){
    matchDenom(c1,c2);
    return Fraction(c1.num - c2.num, c1.den);
  };
  fracMul = function(c1,c2){
    return Fraction(c1.num * c2.num, c1.den * c2.den);
  };
  fracFlip = function(c1){
    // get the reciporical
    return Fraction(c1.den,c1.num);
  };
  fracDiv = function(c1,c2){
    return fracMul(c1,fracFlip(c2));
  };
  fracPow = function(c1,c2){
    // compute the actual c2
    var exponent = c2.num/c2.den;
    return Frac(Math.pow(c1.num,exponent),Math.pow(c1.den,exponent));
  };
  fracPrint = function(c1){
    if( c1.den === 1 ){
      return ''+c1.num;
    }else{
      return c1.num+'/'+c1.den;
    }
    return 'wtf?'; 
  };
%}

%%

\s+                   /* skip whitespace */
[0-9]*\.{0,1}[0-9]+  return 'NUMBER'
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
    : e EOF
        {return fracPrint($1);}
    ;

e
    : e 'ADD' e           {$$ = fracAdd($1,$3);}
    | e 'SUB' e           {$$ = fracSub($1,$3);}
    | e 'MUL' e           {$$ = fracMul($1,$3);}
    | e 'DIV' e           {$$ = fracDiv($1,$3);}
    | e 'POW' e           {$$ = fracPow($1,$3);}
    | 'SUB' e %prec 'NEG' {$$ = fracMul($2,Fraction(-1,1)); }
    | '(' e ')'           {$$ = $2}
    | '{' e '}'           {$$ = $2}
    | '[' e ']'           {$$ = $2}
    | NUMBER              {$$ = Fraction(Number(yytext),1); }
    ;
