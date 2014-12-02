var Curve = (function(){
	function Curve(){}

	Curve.prototype.segments = function(n){
		var segments = [];
		var delta = 1.0/n;
		var i;
		for( i=0.0; i<1.0; i+=delta ){
			segments.push( new Line(
				this.point( i ),
				this.point( i+delta )
			) );
		}
		segments.push( new Line(
			this.point( i ),
			this.point( 1.0 )
		) );
		return segments;
	};
	
	Curve.prototype.length = function(){

		// We'll divide the curve into segments and sum their lengths
		// First, we need to estimate a good number of segments to use.
		var nSegments = this.end.clone().sub( this.start ).length();
		nSegments = Math.floor(0.2*nSegments);
		var segments = this.segments( nSegments );

		// Note: segments may return a different number of segments
		// than requested (ie a line will only return 1 segment).
		var len = 0.0;
		for( var i=0, l=segments.length; i<l; i+=1 ){
			len += segments[i].length();
		}

		return len;
	};

	Curve.prototype.translate = function(v){
		this.start.add( v );
		this.end.add( v );
		for( var i=0, l=this.controls.length; i<l; i+=1 ){
			this.controls[i].add( v );
		}
		return this;
	};

	Curve.prototype.point = function(t){
		// t is between 0 and 1 (start and end of curve)
		// returns the vector that is the point at t
		throw new Error('Curve get point not implemented');
	};

	Curve.prototype.tangent = function(t){
		// t is between 0 and 1 (start and end of curve)
		throw new Error('Curve tangent not implemented');
	};

	return Curve;

})();
