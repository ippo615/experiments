/**
 * Exercise 1.3.4 : In terms of e, give approximations to
 * (a) (1.01)^500 (b) (1.05)^1000 (c) (0.9)^40
 */

// Recall we can approximate (1+a)^b as e^(a*b)
console.info( Math.pow( 1.01, 500 ) );
console.info( Math.exp( 0.01 * 500 ) );

console.info( Math.pow( 1.05, 1000 ) );
console.info( Math.exp( 0.05 * 1000 ) );

console.info( Math.pow( 0.90, 40 ) );
console.info( Math.exp( -0.1 * 40 ) );
