# Intersection

The intersection of sets `a` and `b` is the set of all elements that are
members of both `a` and `b`.

	Set.intersection = function(a,b){
		var i, al = Set.cardinality(a);
		var intersection = new Set();
		for( i=0; i<al; i+=1 ){
			if( b.contains( a._members[i] ) ){
				intersection.addMember( a._members[i] );
			}
		}
		return intersection;
	};
	Set.prototype.intersection = function( other ){
		var i, l = this.cardinality();
		for( i=0; i<l; i+=1 ){
			if( ! other.contains( this._members[i] ) ){
				this.remove( this._members[i] );
			}
		}
		return this;
	};
	Set.and = Set.intersection;
	Set.prototype.and = Set.prototype.intersection;

## Examples

For example

	var a = new Set();
	a.addMember(1).addMember(2);
	var b = new Set();
	b.addMember(1).addMember(3);
	
	assert( Set.intersection(a,b).toString() === '{ 1 }' );

Intersection is also communative:

	var a = new Set();
	a.addMember(1).addMember(2);
	var b = new Set();
	b.addMember(1).addMember(3);
	
	assert( Set.isEqual(
		Set.intersection(a,b),
		Set.intersection(b,a)
	) );
