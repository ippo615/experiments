/**
 * Exercise 3.7.1 : Suppose we construct the basic family of six
 * locality-sensitive functions for vectors of length six. For each
 * pair of the vectors 000000, 110011, 010101, and 011100, which of
 * the six functions makes them candidates?
 */

// Note: these are not so much "distance" functions as they are
// "equality" functions.
// Also Note: I don't think this question has a answer. All of
// these LSH functions have a random parameter so their output can
// vary.

// I think the 6 functions referred to are: jaccard, hamming, cos,
// sketch, euclid, and minhash distances (what about edit distance
// and aren't minhash and jaccard the same)?

// Locality-Sensitive Hamming Distance
// If vectors a and b agree in the ith position they are "equal"
function lsh_hamming( a, ref ){
	return a[ref];
}

// Locality-Sensitive Cosine Distance
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
// i is a random vector that represents a hyperplace (ie `i` is the
// normal of the hyperplane)
function lsh_cos( a, ref ){
	return dot( ref, a ) > 0;
}

// for a sketch we use lsh_cos function but instead of picking ANY
// random vector we pick a vector whose elements are only +1 or -1
// for example: [1,1,-1], [-1,-1,1,-1,1,1]

// Locality-Sensitive Euclidean Distance
// This involves projecting the points onto a line segment. Instead of
// computing the general case of an arbitrary line I'm only considering
// straight lines (so a n-dimensional grid). You can think of ref as 
// representing the size of each grid cell, points in the same cell
// return the same result.
function lsh_euclid( a, ref ){

	var l = a.length;
	if( l !== ref.length ){
		throw new Error( 'lsh_euclid requires vectors of same length. Got: a['+l+'], ref['+ref.length+']' );
	}

	var result = [];
	for( var i=0; i<l; i+=1 ){
		result.push( Math.floor( a[i] / ref[i] ) );
	}
	
	return result;
}

function run( a, b ){
	console.info( '' );
	console.info( a+'; '+b );
	
	var hamming = Math.floor(Math.random()*a.length);
	console.info( lsh_hamming( a, hamming )+', '+lsh_hamming( b, hamming ) +' - hamming('+hamming+')' );
	
	
	var vec = [];
	for( var i=0, l=a.length; i<l; i+=1 ){
		vec.push( Math.random() );
	}
	console.info( lsh_cos( a, vec )+', '+lsh_cos( b, vec ) +' - cos(...)' );

	var sketch = [];
	for( var i=0, l=a.length; i<l; i+=1 ){
		sketch.push( (Math.random()>0.5)?1:-1 );
	}
	console.info( lsh_cos( a, sketch )+', '+lsh_cos( b, sketch ) +' - cos('+sketch+')' );

	var grid = [];
	for( var i=0, l=a.length; i<l; i+=1 ){
		grid.push( Math.random() );
	}
	console.info( lsh_euclid( a, grid )+', '+lsh_euclid( b, grid ) +' - euclid(...)' );
	
}

var vectors = [
	'000000'.split(''),
	'110011'.split(''),
	'010101'.split(''),
	'011100'.split('')
];

run( vectors[0], vectors[1] );
run( vectors[0], vectors[2] );
run( vectors[0], vectors[3] );
run( vectors[1], vectors[2] );
run( vectors[1], vectors[3] );
run( vectors[2], vectors[3] );
