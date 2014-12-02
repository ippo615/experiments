var CubicBezier = (function(){

	function CubicBezier(start,end,a,b){
		this.start = start;
		this.end = end;
		this.controls = [a,b];
	}

	CubicBezier.prototype.clone = function(){
		return new CubicBezier(
			this.start.clone(),
			this.end.clone(),
			this.controls[0].clone(),
			this.controls[1].clone()
		);
	};

	CubicBezier.prototype.translate = Curve.prototype.translate;
	CubicBezier.prototype.segments = Curve.prototype.segments;
	CubicBezier.prototype.length = Curve.prototype.length;

	// From: http://en.wikipedia.org/wiki/B%C3%A9zier_curve
	CubicBezier.prototype.point = function(t){
		var tInv = 1-t;
		var p0Term = this.start.clone().mulScalar( tInv*tInv*tInv );
		var p1Term = this.controls[0].clone().mulScalar( 3*tInv*tInv*t );
		var p2Term = this.controls[1].clone().mulScalar( 3*tInv*t*t );
		var p3Term = this.end.clone().mulScalar( t*t*t );
		return p0Term.add( p1Term ).add( p2Term ).add( p3Term );
	};

	// From: http://en.wikipedia.org/wiki/B%C3%A9zier_curve
	CubicBezier.prototype.tangent = function(t){
		var tInv = 1-t;
		var p10Term = this.controls[0].clone().sub( this.start ).mulScalar( 3*tInv*tInv );
		var p21Term = this.controls[1].clone().sub( this.controls[0] ).mulScalar( 6*tInv*t );
		var p32Term = this.end.clone().sub( this.controls[1] ).mulScalar( 3*t*t );
		return p10Term.add( p21Term ).add( p32Term );
	};

	CubicBezier.prototype.uiDraw = function(ctx){
		ctx.moveTo(this.start.x,this.start.y);
		ctx.bezierCurveTo(
			this.controls[0].x, this.controls[0].y,
			this.controls[1].x, this.controls[1].y,
			this.end.x, this.end.y
		);
	};

	return CubicBezier;

})();
