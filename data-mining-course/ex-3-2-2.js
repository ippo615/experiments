/**
 * Exercise 3.2.2 : If we use the stop-word-based shingles of
 * Section 3.2.4, and we take the stop words to be all the words of
 * three or fewer letters, then what are the shingles in the first
 * sentence of Section 3.2?
 */

function shinglize_stop_word_bag( text, stopWordMaxLength, k ){
	var words = text.split(' ');
	var bag = [];
	for( var i=0, l=words.length-k; i<l; i+=1 ){
		if( words[i].length <= stopWordMaxLength ){
			bag.push( words.slice(i,i+k).join(' ') );
		}
	}
	return bag;
}

function shinglize_stop_word_set( text, stopWordMaxLength, k ){
	var words = text.split(' ');
	var set = [];
	for( var i=0, l=words.length-k; i<l; i+=1 ){
		if( words[i].length <= stopWordMaxLength ){
			var shingle = words.slice(i,i+k).join(' ');
			if( set.indexOf( shingle ) === -1 ){
				set.push( shingle );
			}
		}
	}
	return set;
}


var text  = "The most effective way to represent documents as sets, ";
	text += "for the purpose of identifying lexically similar ";
	text += "documents is to construct from the document the set of ";
	text += "short strings that appear within it.";

console.info( shinglize_stop_word_bag( text, 3, 3 ).splice(0,10) );
console.info( shinglize_stop_word_set( text, 3, 3 ).splice(0,10) );
