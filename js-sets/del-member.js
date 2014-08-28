# Deletings Member from Sets

Removing members from a set is also helpful:

	Set.remove = function( set, member ){
		var index = set._members.indexOf(member);
		if( index !== -1 ){
			set._members.splice( index, 1 );
		}
		return set;
	};
	Set.delMember = Set.remove;
	Set.prototype.remove = function( member ){
		return Set.remove( this, member );
	};
	Set.prototype.delMember = Set.prototype.remove;
