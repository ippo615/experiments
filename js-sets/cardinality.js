# Cardinality (size)

Sets have a certain number of elements. The number of elements in a set is
known as the `cardinality` of a set.

	Set.cardinality = function( set ){
		return set._members.length;
	};
	Set.prototype.cardinality = function(){
		return Set.cardinality(this);
	};

## Example

Cardinality is the number of elements in a set:

	var a = new Set();
	a.addMember( 0 ).addMember( 1 );
	assert( a.cardinality() === 2 );

Sets generally do not allow for repeated members. For example:

	var a = new Set();
	a.addMember( 0 ).addMember( 0 ).addMember( 0 ).addMember( 0 );
	assert( a.cardinality() === 1 );
