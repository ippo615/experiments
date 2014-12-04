var container;
var camera, scene, renderer;

var group;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

var Cube = (function(THREE){

	function copyExtend( defaults, override ){
		var copy = {};
		for( var prop in defaults ){
			if( override.hasOwnProperty(prop) ){
				copy[prop] = override[prop];
			}else if( defaults.hasOwnProperty(prop) ){
				copy[prop] = defaults[prop];
			}
		}
		return copy;
	}

	function optionToArray( option, count ){
		// If we're given an array make sure it is the appropriate length
		// and return it
		if( option.hasOwnProperty( 'length' ) ){
			if( option.length !== count ){
				console.info( 'Option does not have a valid length' );
			}
			return option;
		}

		// If we're not given an array make the single option an array
		var array = [];
		while( count-- ){
			array.push( option );
		}
		return array;
	}

	var defaults = {
		size: [1,1,1],
		round: false,
		center: false,
		color: 0x00AA00
	};

	function Cube( options ){
		var parms = copyExtend(defaults,options);
		var size = optionToArray( parms.size, 3 );
		var round = optionToArray( parms.round, 3 );
		var center = optionToArray( parms.center, 3 );

		var geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
		var material = new THREE.MeshBasicMaterial( {
			color: parms.color,
			overdraw: 0.5
		} );
		var obj = new THREE.Object3D();
		obj.add( new THREE.Mesh( geometry, material ) );
		if( ! center[0] ){
			obj.position.x += size[0] * 0.5;
		}
		if( ! center[1] ){
			obj.position.x += size[1] * 0.5;
		}
		if( ! center[2] ){
			obj.position.x += size[2] * 0.5;
		}

		return obj;
	}

	return Cube;
})(THREE);


init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 500;

	scene = new THREE.Scene();

	var geometry = new THREE.BoxGeometry( 100, 100, 100 );
	var material = new THREE.MeshNormalMaterial( { overdraw: 0.5 } );

	group = new THREE.Object3D();

	for ( var i = 0; i < 200; i ++ ) {

		
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = Cube({size:[100,100,50]});
		mesh.position.x = Math.random() * 2000 - 1000;
		mesh.position.y = Math.random() * 2000 - 1000;
		mesh.position.z = Math.random() * 2000 - 1000;
		mesh.rotation.x = Math.random() * 2 * Math.PI;
		mesh.rotation.y = Math.random() * 2 * Math.PI;
		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();
		
		group.add( mesh );

	}

	scene.add( group );

	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

	mouseX = ( event.clientX - windowHalfX ) * 10;
	mouseY = ( event.clientY - windowHalfY ) * 10;

}

//

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	var currentSeconds = Date.now();
	group.rotation.x = Math.sin( currentSeconds * 0.0007 ) * 0.5;
	group.rotation.y = Math.sin( currentSeconds * 0.0003 ) * 0.5;
	group.rotation.z = Math.sin( currentSeconds * 0.0002 ) * 0.5;

	renderer.render( scene, camera );

}