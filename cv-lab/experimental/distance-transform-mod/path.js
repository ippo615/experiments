
var Point2 = (function(){
	function Point2(x,y){
		this.x = x;
		this.y = y;
	}
	Point2.prototype.distanceTo = function(other){
		var dx = this.x - other.x;
		var dy = this.y - other.y;
		return Math.sqrt( dx*dx + dy*dy );
	};
	Point2.prototype.copy = function(){
		return new Point2( this.x, this.y );
	};
	Point2.prototype.radAngleTo = function( other ){
		var dx = other.x - this.x;
		var dy = other.y - this.y;
		return Math.atan2( dy, dx );
	};
	Point2.prototype.degAngleTo = function( other ){
		return 180/Math.PI * this.radAngleTo( other );
	};
	Point2.prototype.angleTo = Point2.prototype.degAngleTo;
	return Point2;
})();

var Path = (function(){
	function Path(){
		this.points = [];
		this.direction = -999;
	}

	Path.prototype.directionTo = function( point ){
		var n = this.points.length;
		var p = this.points[n-1];
		return p.angleTo( point );
	};
	Path.prototype._updateDirection = function(){
		var n = this.points.length;
		var p1 = this.points[n-1];
		var p0 = this.points[n-2];
		this.direction = p0.angleTo( p1 );
	};
	Path.prototype.addPoint = function( point ){
		if( this.points.length === 0 ){
			this.points.push( point );
		}else if( this.points.length === 1 ){
			this.points.push( point.copy() );
			this._updateDirection();
		}else{
			if( this.directionTo( point ) === this.direction ){
				this.points.pop();
				this.points.push( point.copy() );
			}else{
				this.points.push( point.copy() );
				this._updateDirection();
			}
		}
	};

	return Path;
})();

var path = new Path();
path.addPoint( new Point2( 20, 10 ) );
path.addPoint( new Point2( 10, 10 ) );
path.addPoint( new Point2(  0, 10 ) );
path.addPoint( new Point2(-10, 10 ) );
path.addPoint( new Point2(-50, 10 ) );
path.addPoint( new Point2( 30, 40 ) );
console.info( path.points );
