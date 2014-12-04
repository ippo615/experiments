var THREE = require("../three.min.js");

function Connection(origin,lookAt,up){
	this.point = new THREE.Vector3( origin[0], origin[1], origin[2] );
	this.lookAt = this.point.clone().sub(
		new THREE.Vector3( lookAt[0], lookAt[1], lookAt[2] )
	);
	this.up = this.point.clone.sub( 
		new THREE.Vector3( up[0], up[1], up[2] )
	);
}

var c = new Connection( [0,0,0], [0,0,1], [0,1,0] );
console.info( c );
