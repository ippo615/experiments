var ClothPoint = (function(){

	var ClothPoint = function(x, y) {
		this.position = new Vector2(x, y);
		this.previous = new Vector2(x, y);
		this.velocity = new Vector2(0, 0);
		this.pin = null;
		this.constraints = [];
	};

	ClothPoint.prototype.update = function(delta) {
		this.velocity.add(gravity);

		var d2 = delta * delta;
		var next = this.position.clone();
		next.add(this.position.clone().sub(this.previous).mulScalar(parameters.damping));
		next.add(this.velocity.mulScalar(0.5 * delta));

		this.previous = this.position;
		this.position = next;
		this.velocity.mulScalar(0.0);
	};

	ClothPoint.prototype.resolve_constraints = function() {
		if (this.pin !== null) {
			this.position = this.pin.clone();
			return;
		}

		for (var i = 0, l = this.constraints.length; i < l; i += 1) {
			this.constraints[i].resolve();
		}
	};
	ClothPoint.prototype.attach = function(other, distance) {
		this.constraints.push(new Constraint(this, other, distance));
	};
	ClothPoint.prototype.detach = function(otherIndex) {
		this.constraints.splice(this.constraints.indexOf(otherIndex), 1);
	};
	ClothPoint.prototype.pin_to = function(pin) {
		this.pin = pin;
	};
	ClothPoint.prototype.ui_update = function(delta) {
		if (mouse.down) {

			var diff_x = this.position.x - mouse.x,
				diff_y = this.position.y - mouse.y,
				dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

			if (mouse.button == 1) {

				if (dist < parameters.mouse_influence) {
					this.previous.x = this.position.x - (mouse.x - mouse.px) * 1.8;
					this.previous.y = this.position.y - (mouse.y - mouse.py) * 1.8;
				}

			} else if (dist < parameters.mouse_cut){
				this.constraints = [];
			}
		}

		this.update(delta);
	};
	ClothPoint.prototype.ui_draw = function(ctx) {
		for (var i = 0, l = this.constraints.length; i < l; i += 1) {
			this.constraints[i].ui_draw(ctx);
		}
	};

	return ClothPoint;
})();
