/**
 * Exercise 3.9.4 : Suppose s is a string of length 12. With what
 * symbol-position pairs will s be compared with if we use the indexing
 * approach of Section 3.9.5, and (a) J = 0.75 (b) J = 0.95?
 */

// NOT DONE
function prefix_length( string_length, jaccard_similarity ){
	return Math.floor((1 - jaccard_similarity)*string_length)  + 1;
}
function index_check( string_length, jaccard_similarity ){
	var i = prefix_length(string_length, jaccard_similarity);
	var j = (string_length*(1 - jaccard_similarity) - i + 1 + jaccard_similarity)/jaccard_similarity;
	return j;
}

console.info( index_check( 12, 0.75 ) );
console.info( index_check( 12, 0.95 ) );
