//
// Given a litter of 4 dogs what are their genders most likely to be?
//

function find_max( hashmap ){
	var max_ = null;
	var maxHash = null;
	for( var hash in hashmap ){
		if( hashmap[hash] > max_ || max_ === null ){
			maxHash = hash;
		}
	}
	return maxHash;
}

function simulate( nDogs, nTrials ){

	var choices = 'MF'.split('');
	var nChoices = choices.length;

	// Let's use a hash map to keep track of who appears the most
	var results = {};

	// Run the trials
	for( var t=0; t<nTrials; t+=1 ){
		var dogs = [];
		for( var i=0; i<nDogs; i+=1 ){
			dogs.push( choices[ Math.floor(Math.random()*nChoices) ] );
		}
		var result = dogs.sort().join('');
		if( ! results.hasOwnProperty(result) ){
			results[result] = 0;
		}
		results[result] += 1;
	}

	// Find the most common:
	return find_max( results );
}

console.info( simulate( 4, 100000 ) );
