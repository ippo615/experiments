// Verlet integration

function Point( position, mass, force ){
	this.position = position;
	this.previous = position.clone();
	this.mass = mass;
	this.force = force;

	// Convient properties
	this.invMass = 1.0/this.mass;
}

var DAMPING = 0.02;
var DRAG = 1.0-DAMPING;

Point.prototype.step = function(time,timesq){

	// Calculate velocity from the current and previous position
	var velocity = this.position.clone().sub(this.previous);

	// Apply velocity and acceleration to find the new position
	var newPosition = this.position.clone();
	newPosition.add(velocity.mulScalar(DRAG));
	newPosition.add(this.force.mulScalar(this.invMass).mulScalar(timesq));

	// Update the current/previous positions, reset acceleration
	var tmp = this.previous;
	this.previous = this.position;
	this.position = newPosition;
	this.force.zero();
};
