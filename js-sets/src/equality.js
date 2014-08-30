# Equality

Sets are considered equal if every member of each set is the same. 

	Set.isEqual = function( a, b ){
		var al = a.cardinality();
		if( al !== b.cardinality() ){
			return false;
		}
		for( var i=0; i<al; i+=1 ){
			if( ! b.contains( a._members[i] ) ){
				return false;
			}
		}
		return true;
	};
	Set.areEqual = Set.isEqual;
	Set.prototype.isEqualTo = function( other ){
		return Set.isEqual( this, other );
	};
	Set.prototype.equals = Set.prototype.isEqualTo;

## Properties

Repeated members are only counted once in a set.

	var a = new Set();
	var b = new Set();
	a.addMember(2).addMember(1).addMember(1).addMember(1);
	b.addMember(2).addMember(1);
	assert( Set.isEqual(a,b) );

Elements do not need to be added in the same order for sets to be considered
equal:

	var a = new Set();
	var b = new Set();
	a.addMember(1).addMember(2).addMember(3);
	b.addMember(3).addMember(2).addMember(1);
	assert( Set.isEqual(a,b) );	
