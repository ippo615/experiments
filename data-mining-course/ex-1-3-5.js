/**
 * Exercise 1.3.5 : Use the Taylor expansion of e x to compute, to three decimal
 * places: (a) e^1/10 (b) e^−1/10 (c) e^2
 */

function eTaylorVerbose( x ){
	return (
		1 +
		Math.pow(x,1) / (1) +
		Math.pow(x,2) / (2*1) +
		Math.pow(x,3) / (3*2*1) +
		Math.pow(x,4) / (4*3*2*1) +
		Math.pow(x,5) / (5*4*3*2*1) +
		Math.pow(x,6) / (6*5*4*3*2*1) +
		Math.pow(x,7) / (7*6*5*4*3*2*1)
	);
}

function eTaylorAlgo( x, nTerms ){
	var total = 1;
	var denom = 1;
	var numerator = 1;
	for( var i=1; i<nTerms+1; i+=1 ){
		denom *= i; // updates the factoral on the bottom
		numerator = Math.pow( x, i );
		total += numerator / denom;		
	}
	return total;
}

console.info( Math.exp( 1/10 ) );
console.info( eTaylorVerbose( 1/10 ) );
console.info( eTaylorAlgo( 1/10, 10 ) );

console.info( Math.exp( -1/10 ) );
console.info( eTaylorVerbose( -1/10 ) );
console.info( eTaylorAlgo( -1/10, 10 ) );

console.info( Math.exp( 2 ) );
console.info( eTaylorVerbose( 2 ) );
console.info( eTaylorAlgo( 2, 10 ) );
