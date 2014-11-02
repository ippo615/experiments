/**
 * Exercise 3.3.1 : Verify the theorem from Section 3.3.3, which
 * relates the Jaccard similarity to the probability of minhashing
 * to equal values, for the particular case of Fig. 3.2.
 * 
 * (a) Compute the Jaccard similarity of each of the pairs of columns
 *     in Fig. 3.2.
 * (b) Compute, for each pair of columns of that figure, the fraction
 *     of the 120 permutations of the rows that make the two columns
 *     hash to the same value.
 */

// From Figure 3.2
//     = [a,b,c,d,e]
var S1 = [1,0,0,1,0];
var S2 = [0,0,1,0,0];
var S3 = [0,1,0,1,1];
var S4 = [1,0,1,1,0];

var sets = [
	'a b'.split(' '),
	'c'.split(' '),
	'b d e'.split(' '),
	'a c d'.split(' ')
];

// From ex-1-2.js
function jaccard_similarity( a, b ){
	var bCopy = [];
	for( var i=0, l=b.length; i<l; i+=1 ){
		bCopy.push( b[i] );
	}

	var union = [];
	var intersection = [];
	
	for( var i=0, l=a.length; i<l; i+=1 ){
		var index = bCopy.indexOf( a[i] );
		if( index > -1 ){
			intersection.push( a[i] );
			bCopy.splice( index, 1 );
		}
	}

	var unionTotal = b.length + a.length;
	var intersectionTotal = intersection.length;

	return intersectionTotal / unionTotal;

}

// Part (a)
console.info( jaccard_similarity( sets[0], sets[1] ) );
console.info( jaccard_similarity( sets[0], sets[2] ) );
console.info( jaccard_similarity( sets[0], sets[3] ) );
console.info( jaccard_similarity( sets[1], sets[2] ) );
console.info( jaccard_similarity( sets[1], sets[3] ) );
console.info( jaccard_similarity( sets[2], sets[3] ) );

// Part (b)
// not sure which hash function to use...
