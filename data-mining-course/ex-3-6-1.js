/**
 * Exercise 3.6.1 : What is the effect on probability of starting with
 * the family of minhash functions and applying:
 * 
 * (a) A 2-way AND construction followed by a 3-way OR construction.
 * (b) A 3-way OR construction followed by a 2-way AND construction.
 * (c) A 2-way AND construction followed by a 2-way OR construction,
 *     followed by a 2-way AND construction.
 * (d) A 2-way OR construction followed by a 2-way AND construction,
 *     followed by a 2-way OR construction followed by a 2-way
 *     AND construction.
 */

// `n` "and" contstrunctions take a probability `p` and make it `p^n`
// `n` "or" contstrunctions convert a probability `p` to `1-(1-p)^n`
function and( p, n ){
	return '('+p+')'+'^'+n;
}
function or( p, n ){
	return '1-(1-('+p+'))^'+n;
}

// a) 1-(1-((p)^2))^3
console.info( or( and('p',2), 3 ) ); 

// b) (1-(1-(p))^3)^2
console.info( and( or('p',3), 2 ) );

// c) (1-(1-((p)^2))^2)^2
console.info( and(or(and('p',2),2),2) );

// d) (1-(1-((1-(1-(p))^2)^2))^2)^2
console.info( and(or(and(or('p',2),2),2),2) );

// Manually:

// A)
// or( and(p,2), 3 ) = 1-(1-p**2)**3
//   and(p,2) -> p**2
//   or(p,3) -> 1-(1-p)**3

// B)
// and( or(p,3), 2 ) = (1-(1-p)**3)**2
//   or(p,3) -> 1-(1-p)**3
//   and(p,2) -> p**2
