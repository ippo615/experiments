/**
 * Exercise 3.5.6 : Prove that the cosine distance between any two
 * vectors of 0's and 1's, of the same length, is at most 90 degrees.
 */

// The cosine distance between 2 vectors is their dot product divided
// by the product of their L2 norms with the origin (ie dot product
// divided by product of length).
// 
// The problem is asking about vectors of the same length. That means
// their L2 norms are equal. The L2 norms will effectively be the total
// number of ones in a vector. For example [1,0,0,1] and [1,1,0,0]
// have the same length which is the same L2 norm which is sqrt(1+1)
// which is sqrt(2) which in the denominator of the cosine distance
// is sqrt(2)*sqrt(2) which is 2. In this problem the denominator will
// always be the square of the length of the vector.
//
// The numerator is the dot product which is a count of the number
// of shared 1's. In one extreme, each vector could have no matching
// 0's or 1's in which case the dot product is 0. In the other extreme,
// all the 1's and 0's match which means the dot product is the count
// of 1's in a vector which is the same as the squared length of the
// vector. So the numerator is always between 0 and length^2.
//
// We have the 2 extremes and can simplify them:
//
//            0        / (length*length) = 0
//     (length*length) / (length*length) = 1
//
// So arccos( 0 ) = 90 and arccos( 1 ) = 0 (which proves hat the cosine
// distance between any two vectors of 0's and 1's, of the same length,
// is at most 90 degrees.
//
