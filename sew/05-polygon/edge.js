var Edge = (function(){

	function Edge(start,end){
		this.start = start;
		this.end = end;
	}
	Edge.prototype.clone = function( ){
		return new Edge( this.start, this.end );
	};

	Edge.prototype.normal = function( invert ){
		var pt = this.end.clone();
		var delta = pt.sub( this.start ).normalize();
		if( invert ){
			return delta.perpendicular().mulScalar(-1);
		}else{
			return delta.perpendicular();
		}
	};
	Edge.prototype.offset = function( distance, direction ){
		var normal = this.normal();
		this.start.add( normal.clone().mulScalar(distance*direction) );
		this.end.add( normal.clone().mulScalar(distance*direction) );
		return this;
	};
	
	return Edge;
})();
