
function product(sets, callback, prefix) {
	// Recursive algorithm to generate all the combinations of sets of things
	// also know as a Cartesian product.
	if( sets.length === 0) {
		return callback(prefix);
	}

	// For every choice in the current set treat the choise as a prefix
	// and the remaining sets as combinable stuff
	var remainder = sets.slice(1);
	for(var i = 0; i < sets[0].length; i+=1) {
		product( remainder, callback, (prefix || []).concat(sets[0][i]));
	}
}

// Binary Numbers
product( [
	[0,1],
	[0,1],
	[0,1],
	[0,1]
], function(data){console.info(data);} );

// Saying stuff
product( [
	['Hello'],
	'John Mary Tim Omar Sarah Casey'.split(' ')
], function(strings){
	console.info( strings.join(' ')+'!' );
} );

// Dice
product( [
	[1,2,3,4,5,6],
	[1,2,3,4,5,6]
], function(data){console.info(data);} );
