var Cloth = (function(){

	var Cloth = function(amount, space) {
		this.gravity = new Vector2(0.0, 1200.0);
		this.physics_iterations = 2;
		this.points = [];
		for (var y = 0; y < amount.y; y += 1) {
			for (var x = 0; x < amount.x; x += 1) {
				var point = new ClothPoint(x * space.x, y * space.y);
				if (y === 0) {
					point.pin_to(new Vector2(point.position.x, point.position.y));
				}
				if (x !== 0) {
					point.attach(this.points[this.points.length - 1], space.x);
				}
				if (y !== 0) {
					point.attach(this.points[x + (y - 1) * amount.x], space.y);
				}
				this.points.push(point);
			}
		}
	};
	Cloth.prototype.update = function(delta) {
		var i = this.physics_iterations;
		while (i--) {
			for (var p = 0, l = this.points.length; p < l; p += 1) {
				this.points[p].resolve_constraints();
			}
		}

		for (var p = 0, l = this.points.length; p < l; p += 1) {
			this.points[p].ui_update(delta);
		}

	};
	Cloth.prototype.ui_update = function(delta) {
		this.update(delta);
	};
	Cloth.prototype.ui_draw = function(ctx) {
		ctx.beginPath();
		for (var i = 0, l = this.points.length; i < l; i += 1) {
			cloth.points[i].ui_draw(ctx);
		}
		ctx.stroke();
	};

	return Cloth;

})();
