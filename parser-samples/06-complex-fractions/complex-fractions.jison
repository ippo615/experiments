/* Does stuff with fractions of complex numbers
 * -(5+i)*1+2j-1/j = (-5+i2) / (1)
 * 8/i + 6 = (8+i6) / (0+i1) = (6-i8) / (1)
 * (2+j3)/(2+j3) = (2+i3) / (2+i3) = (13) / (13)
 * [2+7j] / (3+j4) + (2+j6) / (1+2j) = (-30+i37) / (-5+i10) = (520+i115) / (125)
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
  cpxNorm = function(c1){
    return c1.real*c1.real + c1.imag*c1.imag;
  };
  cpxRound = function(c1){
    return Complex(Math.round(c1.real),Math.round(c1.imag));
  };
  isCpxEqualTo = function(c1,c2){
    return ( c1.real === c2.real && c1.imag === c1.imag );
  };
  isCpxEq = isCpxEqualTo;
  isCpx0 = function(c1){
    return ( c1.real === 0 && c1.imag === 0 );
  };
  isCpxGreaterThan = function(c1,c2){
    return ( cpxNorm(c1) > cpxNorm(c2) );
  };
  isCpxGt = isCpxGreaterThan;
  isCpxLessThan = function(c1,c2){
    return ( cpxNorm(c1) < cpxNorm(c2) );
  };
  isCpxLt = isCpxLessThan;
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
  cpxGcd = function(c1,c2){
    var a = c1;
    var b = c2;
    var normA,normB,tmp,q,r=Complex(1,1);
    while( ! isCpx0(r) ){
      normA = cpxNorm(a);
      normB = cpxNorm(b);
      if( normB > normA ){
        tmp = a;
        a = b;
        b = tmp;
      }
      // Get the nearest 'gaussian integer' to the quotient
      q = cpxRound(cpxDiv(a,b));
      // compute the remainder
      r = cpxSub(a,cpxMul(b,q));
      // repeat with the remainder and the smaller one...
      a = b;
      b = r;
    }
    return a;
  };
  cpxLcm = function(a,b){
    var gcd = cpxGcd(a,b);
    return  cpxMul(cpxDiv(a,gcd),b);
  };


  Fraction = function(num,den){
    return {
      num: num,
      den: den
    };
  };
  matchDenom = function(c1,c2){
    var lcm = cpxLcm(c1.den,c2.den);
    // we'll need to scale the numerators to agree with the new denominator
    var s1 = cpxDiv(lcm,c1.den);
    var s2 = cpxDiv(lcm,c2.den);
    c1.num = cpxMul(c1.num,s1);
    c2.num = cpxMul(c2.num,s2);
    c1.den = lcm;
    c2.den = lcm;
  };
  fracAdd = function(c1,c2){
    matchDenom(c1,c2);
    return Fraction(cpxAdd(c1.num,c2.num), c1.den);
  };
  fracSub = function(c1,c2){
    matchDenom(c1,c2);
    return Fraction(cpxSub(c1.num,c2.num), c1.den);
  };
  fracMul = function(c1,c2){
    return Fraction(cpxMul(c1.num,c2.num), cpxMul(c1.den,c2.den));
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
    var exponent = fracDiv(c2.num,c2.den);
    return Frac(cpxPow(c1.num,exponent),cpx(c1.den,exponent));
  };
  fracI = function(c1){
    return Fraction( cpxI(c1.num), c1.den );
  };
  fracRationalize = function(c1){
    if( c1.den.imag !== 0 ){
      return Fraction( cpxMul(c1.num,Complex(c1.den.real,-c1.den.imag)),
                       cpxMul(c1.den,Complex(c1.den.real,-c1.den.imag)));
    }
    return c1;
  };
  fracPrint = function(c1){
    var x = fracRationalize(c1);
    return '('+ cpxPrint(x.num) +') / ('+ cpxPrint(x.den) +')';
    return 'wtf?'; 
  };

%}

%%

\s+                   /* skip whitespace */
[0-9]*\.{0,1}[0-9]+   return 'NUMBER'
[ij]                  return 'I'
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
    | 'I' e               {$$ = fracI($2); }
    | e 'I'               {$$ = fracI($1); }
    | 'SUB' e %prec 'NEG' {$$ = fracMul($2,Fraction(Complex(-1,0),Complex(1,0))); }
    | '(' e ')'           {$$ = $2}
    | '{' e '}'           {$$ = $2}
    | '[' e ']'           {$$ = $2}
    | I                 {$$ = Fraction(Complex(0,1),Complex(1,0)); }
    | NUMBER            {$$ = Fraction(Complex(Number(yytext),0),Complex(1,0)); }
    ;
