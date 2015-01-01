
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
var stlGeometry = null;

// Measurments to help with proper scaling (mm)
var refDeviceSize = 50.0;
var refGeometrySize = 50.0;
var curDeviceSize = 50.0;

// Computed scaling adjustment factors
var scaleRefCubeToRefMarker = 3.0;
var scaleRefDeviceToCurDevice = refDeviceSize / curDeviceSize;

var isPerpendicular = true;

var loader = new THREE.STLLoader();
loader.addEventListener( 'load', function ( event ) {
	stlGeometry = event.content;
	stlGeometry.applyMatrix( new THREE.Matrix4().makeScale(
		scaleRefCubeToRefMarker,
		scaleRefCubeToRefMarker,
		scaleRefCubeToRefMarker
	) );
	if( isPerpendicular ){
		stlGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI/2.0 ) );
	}
	setupGeometry( stlGeometry );
} );
loader.load( './openjscad.stl' );

function setupGeometry( geometry ){

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

	var cube = new THREE.Mesh( stlGeometry, material );
	scene.add( cube );

	// Main loop
	var render = function () {
		requestAnimationFrame(render);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		renderer.render(scene, camera);
	};
	render();

	console.info( 'Starting...' );
}
