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
