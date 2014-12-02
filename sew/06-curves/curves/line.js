var Line = (function(){

	function Line(start,end){
		Curve.call( this );
		this.start = start;
		this.end = end;
		this.controls = [];
	}

	Line.prototype.translate = Curve.prototype.translate;

	Line.prototype.clone = function(){
		return new Line( this.start.clone(), this.end.clone() );
	};

	Line.prototype.segments = function(n){
		return [
			this.clone()
		];
	};

	Line.prototype.length = function(){
		return this.end.clone().sub( this.start ).length();
	};

	Line.prototype.point = function(t){
		var delta = this.end.clone().sub( this.start );
		return this.start.clone().add( delta.mulScalar(t) );
	};

	Line.prototype.tangent = function(t){
		var delta = this.end.clone().sub( this.start );
		return delta.normalize();
	};

	Line.prototype.uiDraw = function(ctx){
		ctx.moveTo(this.start.x,this.start.y);
		ctx.lineTo(this.end.x,this.end.y);
	};

	return Line;

})();
