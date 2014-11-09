/**
 * Exercise 3.7.3 : Suppose we form sketches by using all sixteen of
 * the vectors of length 4, whose components are each +1 or -1. Compute
 * the sketches of the three vectors in Exercise 3.7.2. How do the
 * estimates of the angles between each pair compare with the true
 * angles?
 */

function dot( a, b ){
	var l = a.length;
	if( l !== b.length ){
		throw new Error( 'Dot product requires vectors of same length. Got: a['+l+'], b['+b.length+']' );
	}

	var sum = 0;
	for( var i=0; i<l; i+=1 ){
		sum += a[i] * b[i];
	}

	return sum;
}
function sketch( a, refs ){
	var result = [];
	for( var i=0, l=refs.length; i<l; i+=1 ){
		result.push( dot(a, refs[i]) > 0 ? 1:-1 );
	}
	return result;
}

function magnitude( a ){
	var total = 0.0;
	for( var i=0,l=a.length; i<l; i+=1 ){
		total += Math.pow( a[i], 2 );
	}
	return Math.sqrt( total );
}
function angle_between( a, b ){
	var top = dot( a, b );
	return Math.acos( top / (magnitude(a)*magnitude(b)) ) * 180.0/Math.PI;
}
// Assumes `a` and `b` are made of elements that are either +1 or -1
// The dot product is the same but the magnitude is simplified to:
// `sqrt(n)` where `n` is the number of elements in each vector.
// Because the vectors are the same length we get `sqrt(n)*sqrt(n)`
// which is `n` for the denominator
function estimate_angle_between( a, b ){
	// More accurate but slower:
	// return Math.acos( dot( a, b ) / a.length ) * 180.0/Math.PI;

	// Looking at example 3.21 in the book seems to suggest the version
	// below - but it is HORRIBLY inaccurate. `acos` is usually an
	// expensive function call though. The book never makes it clear
	// that this is actual calculation.
	return 180.0 * dot( a, b ) / a.length;
}

var refVectors = [
	[ 1, 1, 1, 1 ],
	[ 1, 1, 1,-1 ],
	[ 1, 1,-1, 1 ],
	[ 1, 1,-1,-1 ],
	[ 1,-1, 1, 1 ],
	[ 1,-1, 1,-1 ],
	[ 1,-1,-1, 1 ],
	[ 1,-1,-1,-1 ],
	[-1, 1, 1, 1 ],
	[-1, 1, 1,-1 ],
	[-1, 1,-1, 1 ],
	[-1, 1,-1,-1 ],
	[-1,-1, 1, 1 ],
	[-1,-1, 1,-1 ],
	[-1,-1,-1, 1 ],
	[-1,-1,-1,-1 ]
];

var a = [2, 3, 4, 5];
var b = [-2, 3, -4, 5];
var c = [2, -3, 4, -5];

// Compute the sketches for each of them
console.info( sketch( a, refVectors ) );
console.info( sketch( b, refVectors ) );
console.info( sketch( c, refVectors ) );

// Compute the estimated angle between vs actual
console.info( estimate_angle_between(
	sketch( a, refVectors ),
	sketch( b, refVectors )
) );
console.info( angle_between( a, b ) );

console.info( estimate_angle_between(
	sketch( a, refVectors ),
	sketch( c, refVectors )
) );
console.info( angle_between( a, c ) );

console.info( estimate_angle_between(
	sketch( b, refVectors ),
	sketch( c, refVectors )
) );
console.info( angle_between( b, c ) );

// These results are not much better, they seem awful:
// a)   45: 74.97388624088055
// b)  -45: 105.02611375911947
// c) -135: 180
