/**
 * Exercise 3.5.5 : Compute the cosines of the angles between each of
 * the following pairs of vectors. Note that what we are asking for is
 * not precisely the cosine distance, but from the cosine of an angle,
 * you can compute the angle itself, perhaps with the aid of a table or
 * library function.
 * 
 * (a) (3, −1, 2) and (−2, 3, 1).
 * (b) (1, 2, 3) and (2, 4, 6).
 * (c) (5, 0, −4) and (−1, −6, 2).
 * (d) (0, 1, 1, 0, 1, 1) and (0, 0, 1, 0, 0, 0).
 * 
 */

// The cosine distance between 2 vectors is their dot product divided
// by the product of their L2 norms with the origin (ie dot product
// divided by product of length).

function l_norm( r, p1, p2 ){
	var dim = p1.length;
	if( p2.length !== dim ){
		throw new Error( 'Cannot compute the distance between a vector with '+dim+' elements and a vector with '+p2.length+' elements' );
	}

	var sum = 0.0;
	for( var i=0; i<dim; i+=1 ){
		sum += Math.pow( Math.abs( p1[i] - p2[i] ), r );
	}
	return Math.pow( sum, 1/r );
}

function dot_product( p1, p2 ){
	var dim = p1.length;
	if( p2.length !== dim ){
		throw new Error( 'Cannot compute the distance between a vector with '+dim+' elements and a vector with '+p2.length+' elements' );
	}

	var sum = 0.0;
	for( var i=0; i<dim; i+=1 ){
		sum += p1[i] * p2[i];
	}
	return sum;
}

function cosine_distance( a, b ){
	var dim = a.length;

	var origin = [];
	for( var i=0; i<dim; i+=1 ){
		origin.push( 0.0 );
	}

	var dp = dot_product( a, b );
	var l2a = l_norm( 2, a, origin );
	var l2b = l_norm( 2, b, origin );

	var inv = dp / (l2a * l2b);
	return Math.acos( inv )*180.0/Math.PI;
}

// check with the example to verify correct implementation:
// 60 deg is the correct answer (59.9999999 is the output)
console.info( cosine_distance( [1, 2, -1], [2, 1, 1] ) );

console.info( cosine_distance( [3,-1,2], [-2,3,1] ) );
console.info( cosine_distance( [1,2,3], [2,4,6] ) );
console.info( cosine_distance( [5,0,-4], [-1,-6,2] ) );
console.info( cosine_distance( [0, 1, 1, 0, 1, 1], [0, 0, 1, 0, 0, 0] ) );

// Output:
// 120.00000000000001
// 0
// 108.48601467908766
// 60.00000000000001
