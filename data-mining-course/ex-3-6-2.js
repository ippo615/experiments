/**
 * Exercise 3.6.2 : Find the fixedpoints for each of the functions
 * constructed in Exercise 3.6.1.
 * 
 * From exercise 3.6.1:
 * 
 * (a) A 2-way AND construction followed by a 3-way OR construction.
 * (b) A 3-way OR construction followed by a 2-way AND construction.
 * (c) A 2-way AND construction followed by a 2-way OR construction,
 *     followed by a 2-way AND construction.
 * (d) A 2-way OR construction followed by a 2-way AND construction,
 *     followed by a 2-way OR construction followed by a 2-way
 *     AND construction.
 */

// The fixed point is the value of p that satisfies `p = f(p)`
// ie when the function is applied to it, it does not change.
// Using that relation we get `0 = f(p) - p` and we just need
// to solve for `p`.

// `n` "and" contstrunctions take a probability `p` and make it `p^n`
// `n` "or" contstrunctions convert a probability `p` to `1-(1-p)^n`
function and( p, n ){
	return 'Math.pow('+p+','+n+')';
}
function or( p, n ){
	return '1-Math.pow(1-('+p+'),'+n+')';
}

// I'm being lazy so... BRUTE FORCE SEARCH
function fixed_point( f, epsilon ){
	eval( 'var run = function(p){ return ('+f+')-p; };' );
	//console.info( ''+run );
	for( var i=epsilon*2.0; i<1.0; i+=epsilon ){
		if( Math.abs(run( i )) < epsilon ){
			return i;
		}
	}
	return -1;
}

// Use a smaller epsilon for better precision
var epsilon = 0.001;

// a) 1-(1-((p)^2))^3
// fixed point = 0.388
var a = or( and('p',2), 3 );
console.info( fixed_point(a,epsilon) );

// b) (1-(1-(p))^3)^2
// fixed point = 0.151
var b = and( or('p',3), 2 );
console.info( fixed_point(b,epsilon) );

// c) (1-(1-((p)^2))^2)^2
// fixed point = 0.847
var c = and(or(and('p',2),2),2);
console.info( fixed_point(c,epsilon) );

// d) (1-(1-((1-(1-(p))^2)^2))^2)^2
// fixed point = 0.382
var d = and(or(and(or('p',2),2),2),2);
console.info( fixed_point(d,epsilon) );

