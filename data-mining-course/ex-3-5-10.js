/**
 * Exercise 3.5.10 : Find the Hamming distances between each pair of
 * the following vectors: 000000, 110011, 010101, and 011100.
 */

function hamming_distance( a, b ){
	var al = a.length;
	var bl = b.length;
	
	if( al !== bl ){
		throw new Error( 'Hamming distance requires vectors of the same length' );
	}

	var differs = 0;
	for( var i=0; i<al; i+=1 ){
		if( a[i] !== b[i] ){
			differs += 1;
		}
	}

	return differs;
}

var v1 = '000000'.split('');
var v2 = '110011'.split('');
var v3 = '010101'.split('');
var v4 = '011100'.split('');

console.info( hamming_distance( v1, v2 ) ); // 4
console.info( hamming_distance( v1, v3 ) ); // 3
console.info( hamming_distance( v1, v4 ) ); // 3
console.info( hamming_distance( v2, v3 ) ); // 3
console.info( hamming_distance( v2, v4 ) ); // 5
console.info( hamming_distance( v3, v4 ) ); // 2

// Textbook example 3-16 (should be 3) (it is)
console.info( hamming_distance( '10101'.split(''), '11110'.split('') ) );

