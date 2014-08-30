# Union

A union of set A and set B is the set of all the objects that are either
members of A, members of B, or members of both.

	Set.union = function(a,b){
		var i, bl = Set.cardinality(b);
		var union = a.copy();
		for( i=0; i<bl; i+=1 ){
			union.addMember( b._members[i] );
		}
		return union;
	};
	Set.prototype.union = function(other){
		var i, bl = Set.cardinality(other);
		for( i=0; i<bl; i+=1 ){
			this.addMember( other._members[i] );
		}
		return this;
	};
	Set.or = Set.union;
	Set.prototype.or = Set.prototype.union;

## Properties

The union of a set with the empty set is itself:

	var emptySet = new Set();
	var a = new Set();
	a.addMember(1).addMember(2);
	assert( Set.union(a,emptySet).equals(a) );

The union opertation is communative, the order of the operands does not
affect the result:

	var a = new Set();
	a.addMember(1).addMember(2);
	var b = new Set();
	b.addMember(3).addMember(4);
	
	assert( Set.isEqual(
		Set.union(a,b),
		Set.union(b,a)
	) );

The union opertation is associative:

	var a = new Set();
	a.addMember(1).addMember(2);
	var b = new Set();
	b.addMember(3).addMember(4);
	var c = new Set();
	c.addMember(5).addMember(6);
	
	assert( Set.isEqual(
		Set.union(a,b).union(c),
		Set.union(a,Set.union(b,c))
	) );
