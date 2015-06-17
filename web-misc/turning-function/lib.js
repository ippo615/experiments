
var Point = (function(){
	function Point(x,y){
		this.x = x;
		this.y = y;
	};
	Point.prototype.add = function(other){
		this.x += other.x;
		this.y += other.y;
		return this;
	};
	Point.prototype.sub = function(other){
		this.x -= other.x;
		this.y -= other.y;
		return this;
	};
	Point.prototype.rotateRad = function(radians){
		var c = Math.cos( radians );
		var s = Math.sin( radians );
		var x = this.x*c - this.y*s;
		var y = this.x*s + this.y*c;
		this.x = x;
		this.y = y;
		return this;
	};
	Point.prototype.rotateDeg = function(degrees){
		return this.rotateRad( degrees * Math.PI/180 );
	};
	Point.prototype.scale = function(scalar){
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};
	Point.prototype.length = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	};
	Point.prototype.direction = function(){
		return Math.atan2( this.y, this.x );
	};
	Point.prototype.clone = function(){
		return new Point( this.x, this.y );
	};

	return Point;
})();

var Polygon = (function(){

	function Polygon(points){
		this.points = [];
		for( var i=0, l=points.length; i<l; i+=1 ){
			this.push( points[i].clone() );
		}
	};
	Polygon.prototype.clone = function(){
		return new Polygon( this.points );
	};
	Polygon.prototype.push = function( point ){
		this.points.push( point.clone() );
	};
	Polygon.prototype.perimeter = function(){
		var d = 0;
		for( var i=0, l=this.points.length-1; i<l; i+=1 ){
			d += this.points[i+1].clone().sub(this.points[i]).length();
		}
		d += this.points[0].clone().sub(this.points[this.points.length-1]).length();
		return d;
	};
	Polygon.prototype.scale = function(scalar){
		for( var i=0, l=this.points.length; i<l; i+=1 ){
			this.points[i].scale( scalar );
		}
		return this;
	};
	Polygon.prototype.translate = function( point ){
		for( var i=0, l=this.points.length; i<l; i+=1 ){
			this.points[i].add( point );
		}
		return this;
	};
	Polygon.prototype.rotateRad = function( radians ){
		for( var i=0, l=this.points.length; i<l; i+=1 ){
			this.points[i].rotateRad( radians );
		}
		return this;
	};
	Polygon.prototype.rotateDeg = function( degrees ){
		for( var i=0, l=this.points.length; i<l; i+=1 ){
			this.points[i].rotateDeg( degrees );
		}
		return this;
	};
	Polygon.prototype.center = function(){
		var center = new Point(0,0);
		for( var i=0, l=this.points.length; i<l; i+=1 ){
			center.add( this.points[i] );
		}
		return center.scale( 1/this.points.length );
	};
	Polygon.prototype.edges = function(){
		var edges = [];
		for( var i=0, l=this.points.length-1; i<l; i+=1 ){
			edges.push( this.points[i+1].clone().sub(this.points[i]) );
		}
		edges.push( this.points[0].clone().sub(this.points[this.points.length-1]) );
		return edges;
	};
	Polygon.prototype.turning = function(){
		var edges = this.edges();
		var turnings = [];
		var d = 0;
		for( var i=0, l=edges.length; i<l; i+=1 ){
			var len = edges[i].length();
			var dir = Math.PI+edges[i].direction();
			d += len;
			turnings.push( new Point( d, dir ) );
		}
		return turnings;
	};

	function distanceToSegment( point, start, end ){
		// Vectors that represent the segment and point relationships
		var vSegment = end.clone().sub( start );
		var vPointStart = point.clone().sub( start );

		// If segment is a point return the distance to that point
		var segLength = vSegment.length();
		if( segLength === 0 ){
			return vPointStart.length();
		}

		// The percent between start and end the point is on the segment
		var t = 0;
		t += (vPointStart.x - vSegment.x)
		t += (vPointStart.y - vSegment.y);
		t /= segLength;

		// If the percet is negative the point is closer to the start
		if( t < 0 ){
			return vPointStart.length()
		}

		// If the percent is above 1 the point is closer to the end
		if( t > 1 ){
			return point.clone().sub( end ).length();
		}

		// Otherwise the point is closer to a specific point in the middle
		var nearest = new Point(
			start.x + t*vSegment.x,
			start.y + t*vSegment.y
		);
		return point.clone().sub( nearest ).length();
	}

	Polygon.prototype.getNearestDistance = function( point ){
		var minDist = distanceToSegment( point, this.points[0], this.points[1] );
		for( var i=1, l=this.points.length-1; i<l; i+=1 ){
			var dist = distanceToSegment( point, this.points[i], this.points[i+1] );
			if( dist < minDist ){
				minDist = dist;
			}
		}
		return minDist;
	};
	Polygon.prototype.similarity = function( other ){
		var totalMinDist = 0;
		for( var i=0, l=other.points.length; i<l; i+=1 ){
			totalMinDist += this.getNearestDistance( other.points[i] );
		}
		return totalMinDist;
	};
	Polygon.prototype.matchAngle = function( other ){
		// Create copies of the shapes so we can translate/rotate/scale
		var cThis = this.clone();
		var cThat = other.clone();

		// Translate them so they have the same center
		cThis.translate( cThis.center().scale( -1 ) );
		cThat.translate( cThat.center().scale( -1 ) );

		// Parameters (can be moved to function args)
		var angleStart = 0;
		var angleEnd = 360;
		var angleStep = 5;

		// 
		var minSimilarity = cThis.similarity( cThat );
		var minAngle = 0;

		for( var angle = angleStart; angle < angleEnd; angle += angleStep ){
			var rotThat = cThat.clone().rotateDeg( angle );
			var similarity = cThis.similarity( rotThat );
			if( similarity < minSimilarity ){
				minAngle = angle;
				minSimilarity = similarity;
			}
		}

		return minAngle;
	};

	return Polygon;
})();
