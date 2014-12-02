var QuadraticBezier = (function(){

	function QuadraticBezier(start,end,control){
		this.start = start;
		this.end = end;
		this.controls = [control];
	}

	QuadraticBezier.prototype.clone = function(){
		return new QuadraticBezier(
			this.start.clone(),
			this.end.clone(),
			this.controls[0].clone()
		);
	};

	QuadraticBezier.prototype.translate = Curve.prototype.translate;
	QuadraticBezier.prototype.segments = Curve.prototype.segments;
	QuadraticBezier.prototype.length = Curve.prototype.length;

	// From: http://en.wikipedia.org/wiki/B%C3%A9zier_curve
	QuadraticBezier.prototype.point = function(t){
		var tInv = 1-t;
		var p0Term = this.start.clone().mulScalar( tInv*tInv );
		var p1Term = this.controls[0].clone().mulScalar( 2*tInv*t );
		var p2Term = this.end.clone().mulScalar( t*t );
		return p0Term.add( p1Term ).add( p2Term );
	};

	// From: http://en.wikipedia.org/wiki/B%C3%A9zier_curve
	QuadraticBezier.prototype.tangent = function(t){
		var tInv = 1-t;
		var p10Term = this.controls[0].clone().sub( this.start ).mulScalar( 2*tInv );
		var p21Term = this.end.clone().sub( this.controls[0] ).mulScalar( 2*t );
		return p10Term.add( p21Term );
	};

	QuadraticBezier.prototype.uiDraw = function(ctx){
		ctx.moveTo(this.start.x,this.start.y);
		ctx.quadraticCurveTo(
			this.controls[0].x, this.controls[0].y,
			this.end.x, this.end.y
		);
	};

	return QuadraticBezier;

})();
