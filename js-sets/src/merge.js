

The difference of set `A` and set `B` is the set of all the members of `A` 
that are not members of `B`. Conversely, the set difference of `B` and `A`
is the set of all the members of `B` that are not in `A`.

	Set.difference = function( a, b ){
		var diff = new Set();
		var i, al = a.cardinality();
		for( i=0; i<al; i+=1 ){
			if( ! b.contains( a._members[i] ) ){
				diff.addMember( a._members[i] );
			}
		}
		return diff;
	};
	Set.prototype.difference = function( other ){
		// TODO: fix the loop - as I remove elements the index and
		// length will change. It may be better to implement this as:
		// return Set.difference( this, other );
		var i, l = this.cardinality();
		for( i=0; i<l; i+=1 ){
			if( this._members[i] && other.ontains( this._members[i] ) ){
				this.remove( this._members[i] );
			}
		}
		return this;
	};

The symmetric difference of sets `A` and `B` is the set of all elements
that members of one but not the other. For example: something can be an
element of `A` but not and element of `B`; or something can be an element
of `B` but not an element of `A`.

	Set.symmetricDifference = function( a, b ){
		var symm = new Set();
		var i, l = a.cardinality();
		for( i=0; i<l; i+=1 ){
			if( ! b.contains( a._members[i] ) ){
				symm.addMember( a._members[i] );
			}
		}
		i, l = b.cardinality();
		for( i=0; i<l; i+=1 ){
			if( ! a.contains( b._members[i] ) ){
				symm.addMember( b._members[i] );
			}
		}
		return symm;
	};
	Set.prototype.symmetricDifference = function( other ){
		this = Set.symmetricDifference( this, other );
		return this;
	};
	Set.xor = Set.symmetricDifference;
	Set.prototype.xor = Set.prototype.symmetricDifference;

