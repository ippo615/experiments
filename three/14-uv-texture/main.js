
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


