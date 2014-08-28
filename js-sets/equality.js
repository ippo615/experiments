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
