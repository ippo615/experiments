/**
 * Exercise 3.2.1 : What are the first ten 3-shingles in the first
 * sentence of Section 3.2?
 */

function shinglize_bag( text, k ){
	var bag = [];
	for( var i=0, l=text.length-k; i<l; i+=1 ){
		bag.push( text.substr(i,k) );
	}
	return bag;
}

function shinglize_set( text, k ){
	var set = [];
	for( var i=0, l=text.length-k; i<l; i+=1 ){
		var shingle = text.substr(i,k);
		// only add the shingle if it has not been added
		if( set.indexOf( shingle ) === -1 ){
			set.push( shingle );
		}
	}
	return set;
}

var text  = "The most effective way to represent documents as sets, ";
	text += "for the purpose of identifying lexically similar ";
	text += "documents is to construct from the document the set of ";
	text += "short strings that appear within it.";

console.info( shinglize_bag( text, 3 ).splice(0,10) );
console.info( shinglize_set( text, 3 ).splice(0,10) );
