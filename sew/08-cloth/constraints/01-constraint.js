
function Point( position, mass, force ){
	this.position = position;
	this.previous = position.clone();
	this.mass = mass;
	this.force = force;

	// Convient properties
	this.invMass = 1.0/this.mass;
}

function Constraint(a, b, distance) {
	this.a = a;
	this.b = b;
	this.distance = distance;
}

function resolveConstraints( constraints ){
	for( var i=0,l=constraints.length; i<l; i+=1 ){
		var constraint = constraints[i];

		var delta = constraint.a.position.clone().sub(constraint.b.position);
		var distance = delta.length();
		if( distance === 0.0 ){
			// what should I do?
			return;
		}
		var percentError = (constraint.distance - distance) / distance;
		
		var move = delta.mulScalar(percentError * 0.5);
		constraint.a.position.add(move);
		constraint.b.position.sub(move);
	}
}
