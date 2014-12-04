var container;
var controls;
var camera, scene, renderer;

var group;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var degToRad = Math.PI / 180.0;
/*
function Thingy( geometry ){
	// if we don't want to use the new keyword, correct it
	if ( !(this instanceof Thingy) ){
		return new Thingy(geometry);
	}

	this.bsp = null;
	this.geometry = null;
	this.material = null;
	this.object3d = null;

	// Create a copy or make a new one, depending on the type of input
	if( geometry instanceof Thingy ){
		return = geometry.clone();
	}else if( geometry instanceof ThreeBSP ){
		this.geometry = geometry.toGeometry();
		this.material = defaulMaterial;
		this.object3d = new THREE.Object3D();
		this.object3d.add( new THREE.Mesh(
			this.geometry,
			this.material
		) );
		this.bsp = new ThreeBSP( this.geometry );
	}else{
		this.bsp = new ThreeBSP( geometry );
	}
};
*/
function Thingy( geometry ){
	// if we don't want to use the new keyword, correct it
	if ( !(this instanceof Thingy) ){
		return new Thingy(geometry);
	}

	// Create a copy or make a new one, depending on the type of input
	if( geometry instanceof Thingy ){
		this.bsp = geometry.clone();
	}else if( geometry instanceof ThreeBSP ){
		this.bsp = new ThreeBSP( geometry.toGeometry() );
	}else{
		this.bsp = new ThreeBSP( geometry );
	}
};
Thingy.prototype.union = function( other ){
	if( other instanceof Thingy ){
		this.bsp = this.bsp.union( other.bsp );
	}else{
		this.union( new Thingy( other ) );
	}
	return this;
};
Thingy.prototype.subtract = function( other ){
	if( other instanceof Thingy ){
		this.bsp = this.bsp.subtract( other.bsp );
	}else{
		this.subtract( new Thingy( other ) );
	}
	return this;
};
Thingy.prototype.toGeometry = function(){
	return this.bsp.toGeometry();
};
Thingy.prototype.toMesh = function(material){
	return this.bsp.toMesh(material);
};
Thingy.prototype.clone = function(){
	return new Thingy( this.bsp );
};
Thingy.prototype.clones = function(n){
	var clones = [];
	for( var i=0; i<n; i+=1 ){
		clones.push( new Thingy( this.bsp ) );
	}
	return clones;
};
Thingy.prototype.translate = function(amount){
	var geometry = this.bsp.toGeometry();
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation(
		amount[0],
		amount[1],
		amount[2]
	) );
	this.bsp = new ThreeBSP( geometry );
	return this;
};

Thingy.prototype.rotateRad = function(amount){
	var geometry = this.bsp.toGeometry();
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( amount[0] ) );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationY( amount[1] ) );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( amount[2] ) );
	this.bsp = new ThreeBSP( geometry );
	return this;
};
Thingy.prototype.rotateDeg = function(amount){
	return this.rotateRad( [amount[0]*degToRad, amount[1]*degToRad, amount[2]*degToRad] );
};
Thingy.prototype.rotate = Thingy.prototype.rotateDeg;

Thingy.prototype.scale = function(amount){
	var geometry = this.bsp.toGeometry();
	geometry.applyMatrix( new THREE.Matrix4().makeScale(
		amount[0],
		amount[1],
		amount[2]
	) );
	this.bsp = new ThreeBSP( geometry );
	return this;
};

Thingy.prototype.toDrawable = function( options ){
	var defaults = {
		showOrigin: true,

		showWireframe: true,
		wireframeColor: 0x00EE00,

		showAABB: true,
		aabbColor: 0x000000,

		texture: 'basic',
		textureColor: 0xFF0000
	};

	var parms = copyExtend( defaults, options || {} );

	var group = new THREE.Object3D();

	if( parms.texture === 'phong' || parms.texture === 'shiny' || parms.texture === 'glossy' ){
		group.add( new THREE.Mesh( this.toGeometry(), new THREE.MeshPhongMaterial( {
			color: new THREE.Color( parms.textureColor )
		} ) ) );
	}else
	if( parms.texture === 'lambert' || parms.texture === 'dull' || parms.texture === 'matte' ){
		group.add( new THREE.Mesh( this.toGeometry(), new THREE.MeshLambertMaterial( {
			color: new THREE.Color( parms.textureColor )
		} ) ) );
	}else
	if( parms.texture === "basic" ){
		group.add( new THREE.Mesh( this.toGeometry(), new THREE.MeshBasicMaterial( {
			color: new THREE.Color( parms.textureColor )
		} ) ) );
	}

	if( parms.showOrigin ){
		group.add( new THREE.AxisHelper( 100 ) );
	}

	if( parms.showWireframe ){
		group.add( new THREE.Mesh( this.toGeometry(), new THREE.MeshBasicMaterial( {
			color: new THREE.Color( parms.lineColor ),
			wireframe: true,
			transparent: true
		} ) ) );
	}

	if( parms.showAABB ){
		var mesh = new THREE.Mesh( this.toGeometry(), new THREE.MeshBasicMaterial( {
			color: new THREE.Color( parms.aabbColor )
		} ) );
		var bbox = new THREE.BoundingBoxHelper( mesh, parms.aabbColor );
		bbox.update();
		group.add( bbox );
	}

	return group;

};


// ---------------------------------------------------------- Aliases -

// Scaling
Thingy.prototype.scale_x = function(amount){ this.scale([amount,1,1]); };
Thingy.prototype.scale_y = function(amount){ this.scale([1,amount,1]); };
Thingy.prototype.scale_z = function(amount){ this.scale([1,1,amount]); };
Thingy.prototype.scaleX = Thingy.prototype.scale_x;
Thingy.prototype.scaleY = Thingy.prototype.scale_y;
Thingy.prototype.scaleZ = Thingy.prototype.scale_z;

// Translating
Thingy.prototype.translate_x = function(amount){ this.translate([amount,1,1]); };
Thingy.prototype.translate_y = function(amount){ this.translate([1,amount,1]); };
Thingy.prototype.translate_z = function(amount){ this.translate([1,1,amount]); };
Thingy.prototype.translateX = Thingy.prototype.translate_x;
Thingy.prototype.translateY = Thingy.prototype.translate_y;
Thingy.prototype.translateZ = Thingy.prototype.translate_z;
Thingy.prototype.offset = Thingy.prototype.translate;
Thingy.prototype.offset_x = Thingy.prototype.translate_x;
Thingy.prototype.offset_y = Thingy.prototype.translate_y;
Thingy.prototype.offset_z = Thingy.prototype.translate_z;
Thingy.prototype.offsetX = Thingy.prototype.translate_x;
Thingy.prototype.offsetY = Thingy.prototype.translate_y;
Thingy.prototype.offsetZ = Thingy.prototype.translate_z;

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


var Cube = (function(THREE){

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

var Cylinder = (function(THREE){

	var defaults = {
		radiusTop: 20.0,
		radiusBottom: 20.0,
		height: 100.0,
		radiusSegments: 8,
		heightSegments: 1,
		openEnded: false
	};

	function Cylinder( options ){
		var parms = copyExtend(defaults,options||{});
		var geometry = new THREE.CylinderGeometry(
			parms.radiusTop,
			parms.radiusBottom,
			parms.height,
			parms.radiusSegments,
			parms.heightSegments,
			parms.openEnded
		);
		//var material = new THREE.MeshBasicMaterial( {
		//	color: parms.color,
		//	overdraw: 0.5
		//} );
		return geometry;
	}
	return Cylinder;
})(THREE);

var Sphere = (function(THREE){

	var defaults = {
		radius: 20.0,
		widthSegments: 8,
		heightSegments: 6,
		phiStart: 0.0,
		phiLength: Math.PI*2.0,
		thetaStart: 0.0,
		thetaLength: Math.PI
	};

	function Shape( options ){
		var parms = copyExtend(defaults,options||{});
		var geometry = new THREE.SphereGeometry(
			parms.radius,
			parms.widthSegments,
			parms.heightSegments,
			parms.phiStart,
			parms.phiLength,
			parms.thetaStart,
			parms.thetaLength
		);
		//var material = new THREE.MeshBasicMaterial( {
		//	color: parms.color,
		//	overdraw: 0.5
		//} );
		return geometry;
	}
	return Shape;
})(THREE);

var Lathe = (function(THREE){

	var defaults = {
		points: [],
		segments: 8,
		phiStart: 0.0,
		phiLength: Math.PI*2.0
	};

	function Shape( options ){
		var parms = copyExtend(defaults,options||{});
		var pts = [];
		var nPoints = parms.points.length;
		for( var i=0; i<nPoints; i+=1 ){
			pts.push( new THREE.Vector3( parms.points[i][0], 0, parms.points[i][1]) );
		}
		var geometry = new THREE.LatheGeometry(
			pts,
			parms.segments,
			parms.phiStart,
			parms.phiLength
		);
		//var material = new THREE.MeshBasicMaterial( {
		//	color: parms.color,
		//	overdraw: 0.5
		//} );
		return geometry;
	}
	return Shape;
})(THREE);

var Extrude = (function(THREE){

	var defaults = {
		points: [],
		curveSegments: undefined,
		steps: undefined,
		amount: 10,
	    bevelEnabled: false,
		bevelThickness: 1.0,
		bevelSize: 1.0,
		bevelSegments: 1.0,
		extrudePath: undefined,
	    frames: undefined,
	    material: undefined,
	    extrudeMaterial: undefined,
	    uvGenerator: undefined
	};

	function Shape( options ){
		var parms = copyExtend(defaults,options||{});
		var pts = [];
		var nPoints = parms.points.length;
		for( var i=0; i<nPoints; i+=1 ){
			pts.push( new THREE.Vector2( parms.points[i][0], parms.points[i][1]) );
		}
		var shape = new THREE.Shape( pts );
		delete parms.points;
		var geometry = new THREE.ExtrudeGeometry(
			shape,
			parms
		);
		return geometry;
	}
	return Shape;
})(THREE);

init();
animate();

function SimpleCube(size){
	var geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
	var material = new THREE.MeshLambertMaterial( {
		color: 0xFF0000,
		overdraw: 0.5
	} );
	var mesh = new THREE.Mesh(geometry,material);
	//var obj3d = new THREE.Object3D();
	//return obj3d.add( mesh );
	return mesh;
}

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 500;

	scene = new THREE.Scene();


	group = new THREE.Object3D();

	// Transalte/rotate/scale the connection points so they are
	// in terms of world/global (not local) coordinates

	// Then pick the "first one" to be the target
	// Translate/rotate the other to match the target
	// Remember this transformation and apply it to the shape

	var c1 = SimpleCube([100,100,100]);
	var c2 = SimpleCube([50,50,50]);

	/*
	c2.translateY(100).rotateX(1.1);
	var displacement = c1.position.clone().sub( c2.position );
	var t = new THREE.Matrix4();
	t.makeTranslation( displacement.x, displacement.y, displacement.z );
	//c2.applyMatrix( t );
	var rot = new THREE.Matrix4();
	var pt = new THREE.Vector3(0,100,0);
	var to = new THREE.Vector3(0,1,0);
	var up = new THREE.Vector3(0,0,1);
	rot.lookAt( pt, to, up  );
	//c2.applyMatrix( rot );
	var t= new THREE.Matrix4(), q=new THREE.Matrix4(), s=new THREE.Matrix4(); 
	//var decomp = rot.decompose(t,q,s);
	var t = (new THREE.Matrix4()).makeTranslation( 0, 100, 0 );
	var newm = (new THREE.Matrix4()).compose( t, q, s );
	c2.applyMatrix(newm);
	*/

	var rot = new THREE.Matrix4();
	var from = new THREE.Vector3(0,0,0);
	var to = new THREE.Vector3(100,50,0);
	var up = new THREE.Vector3(0,0,1);
	rot.lookAt( from, to, up  );
	//c2.applyMatrix( rot );
	//c2.position.y = 100;

	// Testing matrix building
	var t = (new THREE.Matrix4()).makeTranslation( 5,5,5 );
	var rx = (new THREE.Matrix4()).makeRotationX( 45.0*Math.PI/180.0 );
	var ry = (new THREE.Matrix4()).makeRotationY( 45.0*Math.PI/180.0 );
	var rz = (new THREE.Matrix4()).makeRotationZ( 45.0*Math.PI/180.0 );
	var s = (new THREE.Matrix4()).makeScale( 2,2,2 );

	var m = (new THREE.Matrix4());
	m.multiply(t).multiply(rx).multiply(ry).multiply(rz);

	c1.applyMatrix(m);

	var m = (new THREE.Matrix4());
	m.multiply(rx).multiply(ry).multiply(rz).multiply(t);
	c2.applyMatrix(m)

	//group.add( c1 );
	//group.add( c2 );

	function Connector( point, up ){
		var obj = new THREE.Object3D();
		obj.translateX( point[0] );
		obj.translateY( point[1] );
		obj.translateZ( point[2] );
		obj.up = new THREE.Vector3( up[0], up[1], up[2] );
		return obj;
	}

	function Cube3D(size){
		var geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
		var material = new THREE.MeshBasicMaterial( {
			color: Math.floor(0xFFFFFF*Math.random()),
			overdraw: 0.5
		} );

		var mesh = new THREE.Mesh( geometry, material );

		var cRight = Connector( [size[0]*0.5,0,0], [1,0,0] );
		var cLeft  = Connector( [-size[0]*0.5,0,0], [-1,0,0] );
		var cTop = Connector( [0,0,size[2]*0.5], [0,0,1] );
		var cBottom = Connector( [0,0,-size[2]*0.5], [0,0,-1] );
		var cFront = Connector( [0,size[1]*0.5,0], [0,1,0] );
		var cBack = Connector( [0,-size[1]*0.5,0], [0,-1,0] );

		var cube = new THREE.Object3D();
		cube.add( mesh );
		cube.add( cRight );
		cube.add( cLeft );
		cube.add( cTop );
		cube.add( cBottom );
		cube.add( cFront );
		cube.add( cBack );

		return cube;
	};

	console.info( Cube3D([5,5,5]) );

	var c1 = Cube3D([50,50,50]);
	var c2 = Cube3D([50,50,50]);
	//c2.position.z = 60;
	//c2.position.y = 30;

	var c1p = c1.localToWorld(c1.children[1].position);
	console.info( c1p );
	c1.translateX(-c1p.x);
	c1.translateY(-c1p.y);
	c1.translateZ(-c1p.z);

	var oldUp = c1.up;
	c1.up = c1.children[1].up;
	c1.lookAt( c2.children[3].up );
	c1.up = oldUp;

	var c2p = c2.localToWorld(c2.children[3].position);
	console.info( c2p );
	c1.translateX(c2p.x);
	c1.translateY(c2p.y);
	c1.translateZ(c2p.z);
	



	group.add( c1 );
	group.add( c2 );

	var light = new THREE.PointLight(0xffffff);
	light.position.set(camera.position.x*0.9,camera.position.y*0.8,camera.position.z*1.1);
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

function Connection(origin,lookAt,up){
	this.point = new THREE.Vector3( origin[0], origin[1], origin[2] );
	this.lookAt = this.point.clone().sub(
		new THREE.Vector3( lookAt[0], lookAt[1], lookAt[2] )
	).normalize();
	this.up = this.point.clone().sub( 
		new THREE.Vector3( up[0], up[1], up[2] )
	).normalize();
}
Connection.prototype.translate = function( x,y,z ){
	var vec = new THREE.Vector3( x,y,z );
	this.point.add( vec );
};
Connection.prototype.applyMatrix4 = function( m ){
	this.point.applyMatrix4( m );
	this.lookAt.applyMatrix4( m );
	this.up.applyMatrix4( m );
};
Connection.prototype.transformTo = function( other, obj ){
	var m = (new THREE.Matrix4()).lookAt(
		new THREE.Vector3(0,0,0),
		other.lookAt,
		other.up.clone().negate()
	);
	obj.translate( -this.point.x, -this.point.y, -this.point.z );
	obj.applyMatrix4( m );
	obj.translate( other.point.x, other.point.y, other.point.z );
};

var c = new Connection( [0,0,0], [0,0,1], [0,1,0] );
//console.info( c );
c.translate( 1,1,1 );
//console.info( c );

var d = new Connection( [5,5,5], [5,5,6], [5,6,5] );
//var trans = c.getTransformTo( d );
//c.applyMatrix( trans );
console.info( d );
//console.info( c );

var e = new Connection( [0,0,0], [0,0,1], [0,1,0] );
c.transformTo( d, e );
console.info( e );
// Connect
// translate c1 to origin
// rotate c1 so it's vectors agree with c2
// translate c1 to c2


function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {

	camera.lookAt( scene.position );

	var currentSeconds = Date.now();
	//group.rotation.y += 0.01;

	//group.rotation.x = Math.sin( currentSeconds * 0.0007 ) * 0.5;
	//group.rotation.y = Math.sin( currentSeconds * 0.0003 ) * 0.5;
	//group.rotation.z = Math.sin( currentSeconds * 0.0002 ) * 0.5;

	renderer.render( scene, camera );

}