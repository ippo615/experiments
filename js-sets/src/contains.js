# Contains

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
