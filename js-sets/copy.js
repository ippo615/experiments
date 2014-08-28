# Copying

Sets can be copied for easy usage:

	Set.copy = function( set ){
		var newSet = new Set();
		var i, l = set.cardinality();
		for( i=0; i<l; i+=1 ){
			newSet.addMember( set._members[i] );
		}
		return newSet;
	};
	Set.prototype.copy = function(){
		return Set.copy(this);
	};
