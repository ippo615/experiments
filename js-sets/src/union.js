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
		var i, bl = Set.cardinality(b);
		for( i=0; i<bl; i+=1 ){
			this.addMember( b._members[i] );
		}
		return this;
	};
	Set.or = Set.union;
	Set.prototype.or = Set.prototype.union;

