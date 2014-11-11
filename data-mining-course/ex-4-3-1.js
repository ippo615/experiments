/**
 * Exercise 4.3.1 : For the situation of our running example
 * (8 billion bits, 1 billion members of the set S), calculate the
 * false-positive rate if we use three hash functions? What if we
 * use four hash functions?
 */

function bloomMissRate( nMembers, nBits, nHashes ){
	return Math.exp( -nHashes*nMembers / nBits );
}
function bloomFalsePositive( nMembers, nBits, nHashes ){
	return Math.pow(1 - bloomMissRate( nMembers, nBits, nHashes ),nHashes);
}

console.info( bloomFalsePositive( 1e9, 8e9, 1 ) ); // 11.75 %
console.info( bloomFalsePositive( 1e9, 8e9, 2 ) ); //  4.89 %
console.info( bloomFalsePositive( 1e9, 8e9, 3 ) ); //  3.06 %
console.info( bloomFalsePositive( 1e9, 8e9, 4 ) ); //  2.40 %
