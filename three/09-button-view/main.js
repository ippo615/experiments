
var container, sidebar;
var camera, scene, renderer, domEvents;

var mainObject;

var mouse = new THREE.Vector2(),
	INTERSECTED;
var radius = 50,
	theta = 0;

// UI Resizing
var hSize = 320;
var vSize = 320;

// Make the view take all the entire available size
function onWindowResize() {
	sidebar.style.width = hSize+'px';
	sidebar.style.height = window.innerHeight;

	var renderSizeX = window.innerWidth - hSize;
	var renderSizeY = window.innerHeight;
	camera.aspect = renderSizeX / renderSizeY;
	camera.updateProjectionMatrix();
	renderer.setSize( renderSizeX, renderSizeY );

	//camera.aspect = window.innerWidth / window.innerHeight;
	//camera.updateProjectionMatrix();
	//renderer.setSize(window.innerWidth, window.innerHeight);
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
		keys[keyChar]();
	}
}

function viewTop(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: Math.PI/2.0,
		y: 0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	return 'Viewing the top of the printer (looking down z-axis)';
}
function viewBottom(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: -Math.PI/2.0,
		y: 0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	return 'Viewing the bottom of the printer (looking along z-axis)';
}
function viewFront(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: 0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	return 'Viewing the front of the printer, looking at x-z plane';
}
function viewBack(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: 0,
		z: Math.PI
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	return 'Viewing the back of the printer, looking at x-z plane';
}
function viewLeft(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: Math.PI/2,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	return 'Viewing the left side of the printer, looking at y-z plane';
}
function viewRight(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: 0,
		y: -Math.PI/2,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	return 'Viewing the right side of the printer, looking at y-z plane';
}
function viewAngle(){
	new TWEEN.Tween( mainObject.rotation ).to( {
		x: Math.PI/8.0,
		y: -Math.PI/4.0,
		z: 0
	}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	return 'Viewing the printer from a slight angle';
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
	camera.lookAt( mainObject.position );
	camera.updateProjectionMatrix();
	TWEEN.update();
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

	container = document.getElementById('rendering-area');
	sidebar = document.getElementById('sidebar');

	document.body.appendChild(container);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 300;
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
	//document.addEventListener('keydown', onDocumentKeyDown, false);

	document.getElementById('btn-view-default').addEventListener('click', viewAngle, false);
	document.getElementById('btn-view-front').addEventListener('click', viewFront, false);
	document.getElementById('btn-view-top').addEventListener('click', viewTop, false);
	document.getElementById('btn-view-bottom').addEventListener('click', viewBottom, false);
	document.getElementById('btn-view-left').addEventListener('click', viewLeft, false);
	document.getElementById('btn-view-right').addEventListener('click', viewRight, false);

	window.addEventListener('resize', onWindowResize, false);
	onWindowResize();

}

function animate() {
	requestAnimationFrame(animate);
	render();
}

// Main
init();
animate();

// Setup trigger and action for typing commands
var dispatcher = new Dispatcher();
dispatcher.push( new Trigger({
	text: 'view angle',
	description: 'Look at an angle',
	args: [],
	action: viewAngle
}) ).push( new Trigger({
	text: 'view front',
	description: 'Look at the front',
	args: [],
	action: viewFront
}) ).push( new Trigger({
	text: 'view left',
	description: 'Look at the left side',
	args: [],
	action: viewLeft
}) ).push( new Trigger({
	text: 'view right',
	description: 'Look at the right side',
	args: [],
	action: viewRight
}) ).push( new Trigger({
	text: 'view top',
	description: 'looks down (from the top of the printer)',
	args: [],
	action: viewTop
}) ).push( new Trigger({
	text: 'view bottom',
	args: [],
	action: viewBottom
}) ).push( new Trigger({
	text: 'va',
	description: 'Look at an angle',
	args: [],
	action: viewAngle
}) ).push( new Trigger({
	text: 'vf',
	description: 'Look at the front',
	args: [],
	action: viewFront
}) ).push( new Trigger({
	text: 'vl',
	description: 'Look at the left side',
	args: [],
	action: viewLeft
}) ).push( new Trigger({
	text: 'vr',
	description: 'Look at the right side',
	args: [],
	action: viewRight
}) ).push( new Trigger({
	text: 'vt',
	description: 'looks down (from the top of the printer)',
	args: [],
	action: viewTop
}) ).push( new Trigger({
	text: 'vb',
	args: [],
	action: viewBottom
}) );

function clear_input_text(){
	document.getElementById('in-text-cmd').value='';
}
function auto_complete_text(){
	var text = document.getElementById('in-text-cmd').value;
	var matches = dispatcher.find_matches(text);
	document.getElementById('in-text-cmd').value = matches[0].text;
}

function update_hints(){
	var text = document.getElementById('in-text-cmd').value;
	var matches = dispatcher.find_matches(text);
	var html = '';
	for( var i=0,l=matches.length; i<l; i+=1 ){
		html += matches[i].toHtml()+'<br/>';
	}
	document.getElementById('out-hint').innerHTML = html;
}

function try_to_run(){
	var text = document.getElementById('in-text-cmd').value;
	var result = dispatcher.exec(text);
	document.getElementById('out-hint').innerHTML = result;
}

function quick_run(){
	var text = document.getElementById('in-text-cmd').value;
	var matches = dispatcher.find_matches_without_args(text);
	if( matches.length === 1 ){
		var result = matches[0].exec( text );
		document.getElementById('out-hint').innerHTML = result;
		return true;
	}
	return false;
}

function onKeyUp( event ){
	switch( event.keyCode ){
		case 13: // enter
		//case 32: // space
			try {
				try_to_run();
			}catch(e){}
			return;
	}
	if( quick_run() ){
		clear_input_text();
	}else{
		update_hints();
	}
}
function onKeyDown( event ){
	switch( event.keyCode ){
		// esc
		case 27:
			clear_input_text();
			update_hints();
			return;

		// tab
		case 9:
			auto_complete_text();
			event.preventDefault();
			event.stopPropagation();
			return false;
	}
}

document.getElementById('in-text-cmd-hint').innerHTML = dispatcher.toHtml();
document.getElementById('in-text-cmd').addEventListener('keyup',onKeyUp,false);
document.getElementById('in-text-cmd').addEventListener('keydown',onKeyDown,false);

