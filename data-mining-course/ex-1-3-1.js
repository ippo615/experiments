/**
 * Exercise 1.3.1 : Suppose there is a repository of ten million documents. What
 * (to the nearest integer) is the IDF for a word that appears in (a) 40 documents
 * (b) 10,000 documents?
 */

function IDF( nAppearances, repositorySize ){
	return Math.log( repositorySize / nAppearances ) / Math.log(2);
}

console.info( IDF( 40, 10e6 ) );
console.info( IDF( 10000, 10e6 ) );
