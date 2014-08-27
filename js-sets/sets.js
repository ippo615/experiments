Set theory is an important part of mathemathics. It deals with the
relationship between an object and a set. An object can be a member or
an element of a set.

	function Set(config){
		this._members = [] || config.members;
		this._rangeMin = -Infinity;
		this._rangeMax = -Infinity;
		this._allowRepeats = false;
	}

Sets have a certain number of elements. The number of elements in a set is
known as the `cardinality` of a set.

	Set.cardinality = function( set ){
		return set._members.length;
	};
	Set.prototype.cardinality = function(){
		return Set.cardinality(this);
	};

A set can have none or more elements. You can query if a set has a certain
element.

	Set.contains = function( set, element ){
		return (set._members.indexOf(element) !== -1);
	}
	Set.prototype.contains = function(element){
		return Set.contains(this,element);
	};
	Set.has = Set.contains;
	Set.prototype.has = Set.prototype.contains;

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

Removing members from a set is also helpful:

	Set.remove = function( set, member ){
		var index = set._members.indexOf(member);
		if( index !== -1 ){
			set._members.splice( index, 1 );
		}
		return set;
	};
	Set.prototype.remove = function( member ){
		return Set.remove( this, member );
	};

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
