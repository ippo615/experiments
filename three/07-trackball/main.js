// 
// This is not very good because the trackball controls move the
// camera and my controls rotate the object. This causes 1 of 2
// scenarios when both are used:
//
// (1) Since the trackball moves the camera when I rotate
//     the object it is clear that the object had moved and
//     not the camera (and you don't have the correct view)
//
// (2) If I .reset() the controlls when switching to my
//     custom rotating views then there is jerk/a non-tweened
//     transition to a very different scene.
//

var container;
var camera, scene, renderer, domEvents, controls;

var mainObject;

var mouse = new THREE.Vector2(),
	INTERSECTED;
var radius = 50,
	theta = 0;

// Make the view take all the entire available size
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls.handleResize();
}

// Compute mouse coordinates relative to the center of the screen
function onDocumentMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentKeyDown ( event ) {

	var keys = {
		'F': viewFront,
		'B': viewBack,
		'T': viewTop,
		'B': viewBottom,
		'L': viewLeft,
		'R': viewRight,
		' ': viewAngle
	};

	var keyChar = String.fromCharCode(event.keyCode);
	if( keys.hasOwnProperty( keyChar ) ){
		viewReset();
		keys[keyChar]();
	}
}
function viewReset(){controls.reset();}
function viewTop(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: Math.PI/2.0,
		y: 0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
}
function viewBottom(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: -Math.PI/2.0,
		y: 0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
}
function viewFront(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: 0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
}
function viewBack(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: 0,
		z: Math.PI
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
}
function viewLeft(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: Math.PI/2,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
}
function viewRight(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: -Math.PI/2,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
}
function viewAngle(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: Math.PI/8.0,
		y: -Math.PI/4.0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
}

function objectsUnderPoint( x, y, camera, scene ){
	var projector = new THREE.Projector();
	var raycaster = new THREE.Raycaster();

	var vector = new THREE.Vector3(x, y, 1);
	projector.unprojectVector(vector, camera);
	raycaster.set(camera.position, vector.sub(camera.position).normalize());

	return raycaster.intersectObjects(scene.children);
}
function render() {

	//theta += 0.1;
	//camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
	//camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
	//camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
	camera.lookAt( mainObject.position );
	camera.updateProjectionMatrix();
	// find intersections
	//var intersects = objectsUnderPoint( mouse.x, mouse.y, camera, scene );
	//var i, l = intersects.length;
	//for( i=0; i<l; i+=1 ){
	//	intersects[i].object.rotation.z += 0.1;
	//}

	TWEEN.update();
	controls.update();

	renderer.render(scene, camera);

}

function createThingy(x,y,z,geometry,scene){
	var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
		color: Math.random() * 0xffffff
	}));
	
	object.position.x = x;
	object.position.y = y;
	object.position.z = z;

	object.rotation.x = Math.random() * 2 * Math.PI;
	object.rotation.y = Math.random() * 2 * Math.PI;
	object.rotation.z = Math.random() * 2 * Math.PI;

	scene.add(object);

	domEvents.addEventListener(object, 'mouseover', function(event){
		//console.info( event );
		new TWEEN.Tween( event.target.scale ).to( {
			x: 3,
			y: 3,
			z: 3
		}, 750 ).easing( TWEEN.Easing.Elastic.Out ).start();
	}, false);
	domEvents.addEventListener(object, 'mouseout', function(event){
		//console.info( event );
		new TWEEN.Tween( event.target.scale ).to( {
			x: 1,
			y: 1,
			z: 1
		}, 750 ).easing( TWEEN.Easing.Elastic.Out ).start();
	}, false);
	domEvents.addEventListener(object, 'click', function(event){
		console.info( event );
	}, false);

}

function init() {

	container = document.createElement('div');
	document.body.appendChild(container);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 300;
	controls = new THREE.TrackballControls( camera );
	scene.add( camera );

	mainObject = new THREE.Object3D();
	scene.add(mainObject);

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xf0f0f0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.sortObjects = false;
	container.appendChild(renderer.domElement);

	domEvents = new THREEx.DomEvents(camera, renderer.domElement);

	var light = new THREE.DirectionalLight(0xffffff, 2);
	light.position.set(1, 1, 1).normalize();
	scene.add(light);

	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(-1, -1, -1).normalize();
	scene.add(light);

	var geometry = new THREE.BoxGeometry(20, 20, 20);

	//for (var i = 0; i < 20; i++) {
	//	createRandomly( geometry, scene );
	//}
	for( var x=0; x<3; x+=1 ){
		for( var y=0; y<3; y+=1 ){
			createThingy( x*60-60, y*60-60, 0, geometry, mainObject );
		}
	}

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('keydown', onDocumentKeyDown, false);
	window.addEventListener('resize', onWindowResize, false);

}

function animate() {
	requestAnimationFrame(animate);
	render();
}

// Main
init();
animate();

// NEXT STEP:
// http://threejs.org/examples/#canvas_interactive_cubes_tween

