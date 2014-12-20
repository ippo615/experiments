
function Point( position, mass, force ){
	this.position = position;
	this.previous = position.clone();
	this.mass = mass;
	this.force = force;

	// Convient properties
	this.invMass = 1.0/this.mass;
}

function Constraint(a, b, stiffness, distance) {
	this.a = a;
	this.b = b;
	this.distance = distance;
	this.stiffness = stiffness;
}

function resolveConstraints( constraints, dt ){
	for( var i=0,l=constraints.length; i<l; i+=1 ){
		var constraint = constraints[i];

		var delta = constraint.a.position.clone().sub(constraint.b.position);
		var distance = delta.length();
		if( distance === 0.0 ){ return; }

		var d2 = constraint.distance;
		var error = (d2 - distance);

		var move = delta.mulScalar(error * 0.5 * constraint.stiffness * dt);
		constraint.a.position.add(move);
		constraint.b.position.sub(move);
	}
}
