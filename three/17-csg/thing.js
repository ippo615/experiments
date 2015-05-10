
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
Thingy.prototype.intersect = function( other ){
	if( other instanceof Thingy ){
		this.bsp = this.bsp.intersect( other.bsp );
	}else{
		this.intersect( new Thingy( other ) );
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
degToRad = Math.PI/180.0;
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
