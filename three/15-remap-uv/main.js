
// Shows how to take an arbitrary geometry and map the UV coordinates
// so that they appear to be the XY plane.
// We could also do this for the XZ and YZ planes.

function remap( value, fromMin, fromMax, toMin, toMax ){
	var dFrom = fromMax - fromMin;
	var dTo = toMax - toMin;
	var percent = (value - fromMin)/dFrom;
	return toMin + percent*dTo;
}

// For uv planar mapping along an arbitrary axis (or to an arbitrary
// plane) I can create a rotation matrix and then apply it to the
// geomtery before unwrapping. For example:
// var mtx = new THREE.Matrix4().makeRotationX(45*Math.PI/180);
// geomtery.applyMatrix(mtx);
// uv_planar_xy(mtx);
// var invMtx = new THREE.Matrix4().makeRotationX(45*Math.PI/180);
// geomtery.applyMatrix(invMtx);

function uv_planar_xy( geometry ){

	// The min/max x,y will be the extemes (0,1) of our planar UV map
	geometry.computeBoundingBox();
	var xMin = geometry.boundingBox.min.x;
	var xMax = geometry.boundingBox.max.x;
	var yMin = geometry.boundingBox.min.y;
	var yMax = geometry.boundingBox.max.y;

	// We need to go through every vertex of every face and map x,y
	// location from [min,max] to [0,1]. The results between 0,1 are
	// the UV mapped coordinates.
	geometry.faceVertexUvs[0] = [];
	for( var i=0,l=geometry.faces.length; i<l; i+=1 ){
		var face = geometry.faces[i];

		geometry.faceVertexUvs[0].push([
			new THREE.Vector2(
				remap( geometry.vertices[face.a].x, xMin, xMax, 0.0, 1.0 ),
				remap( geometry.vertices[face.a].y, yMin, yMax, 0.0, 1.0 )
			),
			new THREE.Vector2(
				remap( geometry.vertices[face.b].x, xMin, xMax, 0.0, 1.0 ),
				remap( geometry.vertices[face.b].y, yMin, yMax, 0.0, 1.0 )
			),
			new THREE.Vector2(
				remap( geometry.vertices[face.c].x, xMin, xMax, 0.0, 1.0 ),
				remap( geometry.vertices[face.c].y, yMin, yMax, 0.0, 1.0 )
			)
		]);
	}

	geometry.uvsNeedUpdate = true;
	return geometry;
}

function uv_spherical( geometry ){

	// We need the center of the geometer for this
	// and the y extrema
	geometry.computeBoundingBox();
	var xMid = 0.5*(geometry.boundingBox.min.x+geometry.boundingBox.max.x);
	var yMid = 0.5*(geometry.boundingBox.min.y+geometry.boundingBox.max.y);
	var zMid = 0.5*(geometry.boundingBox.min.z+geometry.boundingBox.max.z);
	var center = new THREE.Vector3( xMid, yMid, zMid );

	// We use the vector from the point to the center to create 2 angles
	// that describe the point as if it were projected onto a sphere
	geometry.faceVertexUvs[0] = [];
	for( var i=0,l=geometry.faces.length; i<l; i+=1 ){
		var face = geometry.faces[i];

		var ad = geometry.vertices[face.a].clone();
		ad.sub( center );
		ad.normalize();

		var bd = geometry.vertices[face.b].clone();
		bd.sub( center );
		bd.normalize();

		var cd = geometry.vertices[face.c].clone();
		cd.sub( center );
		cd.normalize();

		geometry.faceVertexUvs[0].push([
			new THREE.Vector2(
				0.5+Math.atan2(ad.x,ad.z)/(2.0*Math.PI),
				0.5-Math.asin(ad.y)/Math.PI
			),
			new THREE.Vector2(
				0.5+Math.atan2(bd.x,bd.z)/(2.0*Math.PI),
				0.5-Math.asin(bd.y)/Math.PI
			),
			new THREE.Vector2(
				0.5+Math.atan2(cd.x,cd.z)/(2.0*Math.PI),
				0.5-Math.asin(cd.y)/Math.PI
			)
		]);
	}

	geometry.uvsNeedUpdate = true;
	return geometry;
}

function uv_cylindrical( geometry ){

	// We need the center of the geometer for this
	geometry.computeBoundingBox();
	var xMid = 0.5*(geometry.boundingBox.min.x+geometry.boundingBox.max.x);
	var yMid = 0.5*(geometry.boundingBox.min.y+geometry.boundingBox.max.y);
	var zMid = 0.5*(geometry.boundingBox.min.z+geometry.boundingBox.max.z);
	var center = new THREE.Vector3( xMid, yMid, zMid );
	var yMin = geometry.boundingBox.min.y;
	var yMax = geometry.boundingBox.max.y;

	// We use the vector from the point to the center to create 2 angles
	// that describe the point as if it were projected onto a sphere
	geometry.faceVertexUvs[0] = [];
	for( var i=0,l=geometry.faces.length; i<l; i+=1 ){
		var face = geometry.faces[i];

		var ad = geometry.vertices[face.a].clone();
		ad.sub( center );
		ad.normalize();

		var bd = geometry.vertices[face.b].clone();
		bd.sub( center );
		bd.normalize();

		var cd = geometry.vertices[face.c].clone();
		cd.sub( center );
		cd.normalize();

		geometry.faceVertexUvs[0].push([
			new THREE.Vector2(
				0.5+Math.atan2(ad.x,ad.z)/(2.0*Math.PI),
				remap( geometry.vertices[face.a].y, yMin, yMax, 0.0, 1.0 )
			),
			new THREE.Vector2(
				0.5+Math.atan2(bd.x,bd.z)/(2.0*Math.PI),
				remap( geometry.vertices[face.b].y, yMin, yMax, 0.0, 1.0 )
			),
			new THREE.Vector2(
				0.5+Math.atan2(cd.x,cd.z)/(2.0*Math.PI),
				remap( geometry.vertices[face.c].y, yMin, yMax, 0.0, 1.0 )
			)
		]);
	}

	geometry.uvsNeedUpdate = true;
	return geometry;
}

// Create the scene
var scene = new THREE.Scene();

// Create and position the camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth*0.5 / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Create the thing that shows the scene
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Add a cube to the scene
//var geometry = new THREE.BoxGeometry(3,3,3);
var geometry = new THREE.SphereGeometry( 2, 12, 8 );
//geometry = uv_planar_xy( geometry );
//geometry = uv_spherical( geometry );
geometry = uv_cylindrical( geometry );
var uvCanvas = THREE.UVsDebug(geometry,1024);
uvCanvas.style.width = '50%';
uvCanvas.style.position = 'absolute';
uvCanvas.style.right='0';
uvCanvas.style.top='0';
uvCanvas.style.float = 'left';
document.body.appendChild( uvCanvas );

var texture = new THREE.Texture(uvCanvas);
texture.needsUpdate = true;
var material = new THREE.MeshBasicMaterial( {
	map: texture,
	color: 0xffffff
} );
/*
var material = new THREE.MeshLambertMaterial( {
	map: texture,
	color: 0xffffff,
	ambient: 0x777777,
	shading: THREE.SmoothShading
} );
*/
//var material = new THREE.MeshBasicMaterial( {
//	color: 0x00ff00
//} );

var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Main loop
var render = function () {
	requestAnimationFrame(render);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
};
render();
