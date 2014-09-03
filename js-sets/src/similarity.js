# Similarity

Building on set theory it is easy to compute a similarity score between 2 
sets. The similarity between 2 sets is the number of shared elements divided
by the total number of elements.

	Set.similarity = function(a,b){
		var union = Set.union(a,b);
		var difference = Set.intersection(a,b);
		return difference.cardinality()/union.cardinality();
	};
	Set.prototype.similarity = function( other ){
		return Set.similarity( this, other );
	};

## Examples

Identical sets have a similarity of 1.

	var a = new Set();
	a.addMember(1).addMember(2);
	var b = new Set();
	b.addMember(1).addMember(2);
	
	assert( Set.similarity(a,b) === 1 );

Sets that have nothing in common have a similarity score of 0.

	var a = new Set();
	a.addMember(1).addMember(2);
	var b = new Set();
	b.addMember(3).addMember(4);
	
	assert( Set.similarity(a,b) === 0 );

Other sets have a score between 0 and 1.

	var a = new Set();
	a.addMember(1).addMember(2).addMember(3);
	var b = new Set();
	b.addMember(3).addMember(4).addMember(5);
	
	assert( Set.similarity(a,b) === 1/5 );
