// Verlet integration

function Point( position, mass, force ){
	this.position = position;
	this.previous = position.clone();
	this.mass = mass;
	this.force = force;

	// Convient properties
	this.invMass = 1.0/this.mass;
}

function verletStep( points, dt, drag ){
	var dtsq = dt*dt;
	for( var i=0, l=points.length; i<l; i+=1 ){

		var point = points[i];

		// Calculate velocity from the current and previous position
		var velocity = point.position.clone().sub(point.previous);

		// Apply velocity and acceleration to find the new position
		var newPosition = point.position.clone();
		newPosition.add(velocity.mulScalar(drag));
		newPosition.add(point.force.mulScalar(point.invMass).mulScalar(dtsq));

		// Update the current/previous positions, reset acceleration
		var tmp = point.previous;
		point.previous = point.position;
		point.position = newPosition;
		point.force.zero();
	}
}


