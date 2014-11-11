/**
 * Exercise 3.8.2 : Suppose we use the family F of functions described
 * in Section 3.8.5, where there is a 20% chance of a minutia in an
 * grid square, an 80% chance of a second copy of a fingerprint having
 * a minutia in a grid square where the first copy does, and each
 * function in F being formed from three grid squares. In Example 3.22,
 * we constructed family F1 by using the OR construction on 1024
 * members of F. Suppose we instead used family F2 that is a 2048-way
 * OR of members of F.
 * 
 * (a) Compute the rates of false positives and false negatives for F2.
 * (b) How do these rates compare with what we get if we organize the
 *     same 2048 functions into a 2-way AND of members of F1 , as was
 *     discussed at the end of Section 3.8.5?
 */

function true_positive( orCount ){
	// F hashes fingerprints by picking 3 grid squares and seeing if they
	// ALL have minutiae.
	var p_1_fingerprint = Math.pow(0.2, 3);

	// We care about 2 fingerprints hashing to the same thing:
	// ie this represents a match
	var p_2_fingerprints = p_1_fingerprint * p_1_fingerprint;

	return Math.pow(1-p_2_fingerprints, orCount);
}
function false_positive( orCount ){
	return 1-true_positive( orCount );
}

function false_negative( orCount ){
	// F hashes fingerprints by picking 3 grid squares and seeing if they
	// ALL have minutiae.
	var p_fingerprint_a = Math.pow(0.2, 3);
	var p_fingerprint_b = Math.pow(0.8, 3);

	// The probability that the other finger print will hash the same
	var p_same = p_fingerprint_a * p_fingerprint_b;

	// Applying the or combination
	var false_negative = Math.pow( 1-p_same, orCount );
	return false_negative;
}
function true_negative( orCount ){
	return 1-false_negative( orCount );
}

// Part A
// False Positive[1024]: 6.343663440071112%
// False Negative[1024]: 1.4951891534014772%
// False Positive[2048]: 12.284906221733271%
// False Negative[2048]: 0.02235590604449426%
// By increasing the n-way-or from 1024 to 2048 we have more false
// positives and fewer false negatives. That is probably undesirable
// because it would require we check a larger portion of the database
// (roughly twice as much); however, we would rarely miss a match.
console.info( 'False Positive[1024]: ' + 100*false_positive( 1024 ) +'%' );
console.info( 'False Negative[1024]: ' + 100*false_negative( 1024 ) +'%' );
console.info( 'False Positive[2048]: ' + 100*false_positive( 2048 ) +'%' );
console.info( 'False Negative[2048]: ' + 100*false_negative( 2048 ) +'%' );

// Part B
// Confirm the example in the book:
console.info( Math.pow(true_positive( 1024 ),1) );
console.info( 1 - Math.pow(true_positive( 1024 ),2) );
console.info( Math.pow(false_negative( 1024 ),2) );

// NOT DONE
