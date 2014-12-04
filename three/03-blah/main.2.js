var container;
var controls;
var camera, scene, renderer;

var group;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

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
		center: true
	};

	function Cube( options ){
		var parms = copyExtend(defaults,options);
		var size = optionToArray( parms.size, 3 );
		var round = optionToArray( parms.round, 3 );
		var center = optionToArray( parms.center, 3 );

		var geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
		//var material = new THREE.MeshBasicMaterial( {
		//	color: parms.color,
		//	overdraw: 0.5
		//} );

		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(
			center[0]?0.0:0.5*size[0],
			center[1]?0.0:0.5*size[1],
			center[2]?0.0:0.5*size[2]
		) );

		return geometry;
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

	var geometry = Cube({size:[100,100,50],center:true});
	//var geometry = Cube({size:[100,100,50],center:false});
	//var geometry = Cube({size:[100,100,50],center:[true,false,true]});
	var material = new THREE.MeshPhongMaterial( {
		color: 0x00AA00,
		overdraw: 0.5
	} );
	//group.add( new THREE.Mesh( geometry, material ) );

	var geometry = Cube({size:[200,10,10]});
	var material = new THREE.MeshPhongMaterial( {
		color: 0xFF0000,
		overdraw: 0.5
	} );
	//group.add( new THREE.Mesh( geometry, material ) );

	var box = new ThreeBSP( Cube({size:[100,100,50],center:true}) );
	var hole = new ThreeBSP( Cube({size:[90,90,50],center:true}) );
	var shell = box.subtract(hole);

	group.add( new THREE.Mesh( shell.toGeometry(), material ) );

	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,150,100);
	scene.add(light);

	scene.add( group );

	//renderer = new THREE.CanvasRenderer();
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		logarithmicDepthBuffer: true
	});
	renderer.setClearColor( 0xffffff );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls( camera );
	controls.damping = 0.2;
	controls.addEventListener( 'change', render );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}


//

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {

	camera.lookAt( scene.position );

	var currentSeconds = Date.now();
	group.rotation.y += 0.01;
	//group.rotation.x = Math.sin( currentSeconds * 0.0007 ) * 0.5;
	//group.rotation.y = Math.sin( currentSeconds * 0.0003 ) * 0.5;
	//group.rotation.z = Math.sin( currentSeconds * 0.0002 ) * 0.5;

	renderer.render( scene, camera );

}