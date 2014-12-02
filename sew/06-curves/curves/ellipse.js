// For something that simulates arcTo:
// Specify 3 points: start, end, control and a radius (r).
// The final thing will be made of 1, 2, or 3 curves. It will start
// with a straight line from start that runs tangent an arc of radius
// r then will move through that tangent and out to the end where end
// is also tangent to the arc.
// 
var Ellipse = (function(){

	function Ellipse(center,radius,startAngle,endAngle,clockwise){
		Curve.call( this );
		this.center = center;
		this.radius = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
		this.clockwise = clockwise;
		this.start = this.point(0.0);
		this.end = this.point(1.0);
	}

	Ellipse.prototype.translate = function(v){
		this.center.add( v );
		return this;
	};

	Ellipse.prototype.clone = function(){
		return new Ellipse(
			this.center.clone(),
			this.radius.clone(),
			this.startAngle,
			this.endAngle,
			this.clockwise
		);
	};

	Ellipse.prototype.segments = Curve.prototype.segments;
	Ellipse.prototype.length = Curve.prototype.length;

	Ellipse.prototype._angleAt = function(t){
		var dAngle = this.endAngle - this.startAngle;
		if ( dAngle < 0.0 ){
			dAngle += Math.PI * 2.0;
		}
		if ( dAngle > Math.PI * 2 ){
			dAngle -= Math.PI * 2;
		}

		var angle;
		if ( this.clockwise === true ) {
			angle = this.endAngle + ( 1 - t ) * ( Math.PI * 2 - dAngle );
		} else {
			angle = this.startAngle + t * dAngle;
		}
		return angle;
	};

	Ellipse.prototype.point = function(t){
		var angle = this._angleAt(t);
		return this.center.clone().add( this.radius.clone().mul( new Vector(
			Math.cos( angle ),
			Math.sin( angle )
		) ) );
	};

	Ellipse.prototype.tangent = function(t){
		// Derivatives of trig functions:
		// d/dx cos(x) = -sin(x)
		// d/dx sin(x) = cos(x)
		var angle = this._angleAt(t);
		return new Vector(
			-Math.sin( angle ),
			Math.cos( angle )
		);
	};

	Ellipse.prototype.uiDraw = function(ctx){
		var start = this.point(0);
		//ctx.moveTo( start.x, start.y );
		ctx.arc(
			this.center.x, this.center.y,
			this.radius.length(),
			this.startAngle, this.endAngle,
			! this.clockwise
		);
	};

	return Ellipse;

})();
