var Vector = (function(){

	function Vector(x,y){
		this.x = x;
		this.y = y;
	}
	Vector.prototype.clone = function( ){
		return new Vector( this.x, this.y );
	};

	// Vector
	Vector.prototype.add = function( other ){
		this.x += other.x;
		this.y += other.y;
		return this;
	};
	Vector.prototype.sub = function( other ){
		this.x -= other.x;
		this.y -= other.y;
		return this;
	};
	Vector.prototype.mul = function( other ){
		this.x *= other.x;
		this.y *= other.y;
		return this;
	};
	Vector.prototype.div = function( other ){
		this.x /= other.x;
		this.y /= other.y;
		return this;
	};

	// Scalar
	Vector.prototype.addScalar = function( s ){
		this.x += s;
		this.y += s;
		return this;
	};
	Vector.prototype.subScalar = function( s ){
		this.x -= s;
		this.y -= s;
		return this;
	};
	Vector.prototype.mulScalar = function( s ){
		this.x *= s;
		this.y *= s;
		return this;
	};
	Vector.prototype.divScalar = function( s ){
		this.x /= s;
		this.y /= s;
		return this;
	};

	Vector.prototype.lengthSq = function(){
		return this.x*this.x + this.y*this.y;
	};
	Vector.prototype.length = function(){
		return Math.sqrt(this.lengthSq());
	};
	Vector.prototype.normalize = function(){
		return this.divScalar( this.length() );
	};
	Vector.prototype.perpendicular = function(){
		var swap = this.x;
		this.x = -this.y;
		this.y = swap;
		return this;
	};

	Vector.prototype.distanceSq = function(other) {
		var dx = this.x - other.x;
		var dy = this.y - other.y;
		return dx * dx + dy * dy;
	};
	Vector.prototype.distance = function(other) {
		return Math.sqrt(this.distanceSq(other));
	};

	return Vector;
})();
