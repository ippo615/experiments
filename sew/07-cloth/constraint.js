var Constraint = (function(){

	var Constraint = function(a, b, distance) {
		this.a = a;
		this.b = b;
		this.distance = distance;
	};
	Constraint.prototype.resolve = function() {
		var delta = this.a.position.clone().sub(this.b.position);
		var distance = delta.length();
		var percentError = (this.distance - distance) / distance;

		var move = delta.mulScalar(percentError * 0.5);
		this.a.position.add(move);
		this.b.position.sub(move);
	};
	Constraint.prototype.ui_draw = function(ctx) {
		ctx.moveTo(this.a.position.x, this.a.position.y);
		ctx.lineTo(this.b.position.x, this.b.position.y);
	};

	return Constraint;

})();
