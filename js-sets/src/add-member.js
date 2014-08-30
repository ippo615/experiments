# Adding Elements to Sets

Sets can be defined by adding objects to them. The objects become the
elements or members of the set. Sets typically do not allow repeats. For
example a set of `{1,1,2,3,3,3}` is equivalent to a set of `{1,2,3}`.

	Set.addMember = function( set, member ){
		if( set._allowRepeats === false ){
			if( set.contains( member ) ){
				return set;
			}
		}
		set._members.push( member );
		return set;
	};
	Set.prototype.addMember = function( member ){
		return Set.addMember( this, member );
	};

## Examples

When initially created, a set is an empty set:

	var a = new Set();
	assert( a.cardinality() === 0 );

Sets are modified in place:

	var a = new Set();
	Set.addMember( a, 1 );
	Set.addMember( a, 2 );
	Set.addMember( a, 3 );
	assert( a.toString() === '{ 1, 2, 3 }' );

Adding members can be chained:

	var a = new Set();
	a.addMember(1).addMember(2).addMember(3);
	assert( a.toString() === '{ 1, 2, 3 }' );

Set theory ignores repeated members in sets.

	var a = new Set();
	var b = new Set();
	a.addMember(2).addMember(1).addMember(1).addMember(1);
	b.addMember(2).addMember(1);
	assert( Set.isEqual(a,b) );

However, you can override that parameter and force the sets to allow
duplicate elements:

	var a = new Set();
	a._allowRepeats = true;
	a.addMember(2).addMember(1).addMember(1).addMember(1);
	assert( a.toString() === '{ 2, 1, 1, 1 }' );

