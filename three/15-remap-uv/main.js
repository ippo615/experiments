
// Shows how to take an arbitrary geometry and map the UV coordinates
// so that they appear to be the XY plane.
// We could also do this for the XZ and YZ planes.

function remap( value, fromMin, fromMax, toMin, toMax ){
	var dFrom = fromMax - fromMin;
	var dTo = toMax - toMin;
	var percent = (value - fromMin)/dFrom;
	return toMin + percent*dTo;
}

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
geometry = uv_planar_xy( geometry );
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
