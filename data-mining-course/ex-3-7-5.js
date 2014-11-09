/**
 * Exercise 3.7.5 : Suppose we have points in a 3-dimensional
 * Euclidean space: p1 = (1, 2, 3), p2 = (0, 2, 4), and
 * p3 = (4, 3, 2). Consider the three hash functions defined by the
 * three axes (to make our calculations very easy). Let buckets be of
 * length a, with one bucket the interval [0, a) (i.e., the set of
 * points x such that 0 <= x < a), the next [a, 2a), the previous one
 * [−a, 0), and so on.
 * 
 * (a) For each of the three lines, assign each of the points to
 *     buckets, assuming a = 1.
 * (b) Repeat part (a), assuming a = 2.
 * (c) What are the candidate pairs for the cases a = 1 and a = 2?
 * (d) For each pair of points, for what values of a will that pair
 *     be a candidate pair?
 */

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

var p1 = [1, 2, 3];
var p2 = [0, 2, 4];
var p3 = [4, 3, 2];

// Part A
var a = [1,1,1];
console.info( lsh_euclid( p1, a ) ); // [ 1, 2, 3 ]
console.info( lsh_euclid( p2, a ) ); // [ 0, 2, 4 ]
console.info( lsh_euclid( p3, a ) ); // [ 4, 3, 2 ]

// Part B
var b = [2,2,2];
console.info( lsh_euclid( p1, b ) ); // [ 0, 1, 1 ]
console.info( lsh_euclid( p2, b ) ); // [ 0, 1, 2 ]
console.info( lsh_euclid( p3, b ) ); // [ 2, 1, 1 ]

// Part C
//
// Based on the book's text there are 3 hash functions (one for each
// axis or dimension). Different hash functions, values of a, and 
// combinations (and/or) yield different candidate pairs.
//
//  h  a  pairs
//  0  1  { }
//  1  1  {p1,p2}
//  2  1  { }
//  0  2  {p1,p2}
//  1  2  {p1,p2},{p1,p3},{p2,p3}
//  2  2  {p1,p3}
//
// Here are some examples combining h's:
//
//  h  op  h  a  pairs
//  0 and  1  2  {p1,p2}
//  0  or  2  2  {p1,p2},{p1,p3}

// Part D
//
// Once again, different hash functions, values of a, and combinations
// (and/or) yield different candidate pairs.  I'll assume we're being
// as strict (ie we reject most pairs) as possible.
//
// p1,p2 -> max( 1,2,3, 0,2,4 ) = 4
// p1,p3 -> max( 1,2,3, 4,3,2 ) = 4
// p2,p3 -> max( 0,2,4, 4,3,2 ) = 4
