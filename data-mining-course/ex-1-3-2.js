/**
 * Suppose there is a repository of ten million documents, and
 * word w appears in 320 of them. In a particular document d, the maximum
 * number of occurrences of a word is 15. Approximately what is the TF.IDF
 * score for w if that word appears (a) once (b) five times?
 */

function IDF( nAppearances, repositorySize ){
	return Math.log( repositorySize / nAppearances ) / Math.log(2);
}
function TF( specificOccurances, maxOccurances ){
	return specificOccurances / maxOccurances;
}

console.info( TF( 1, 15 ) * IDF( 320, 10e6 ) );
console.info( TF( 5, 15 ) * IDF( 320, 10e6 ) );
