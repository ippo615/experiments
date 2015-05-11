
function makeGeometryThingy( threeGeometry ){
	return (function(threeGeometry){
		return function(){
			var geometry = Object.create( threeGeometry.prototype );
			geometry = (threeGeometry.apply( geometry, arguments ) || geometry);
			return new Thingy( geometry );
		};
	})(threeGeometry);
}

// 3D Primitives
var Box = makeGeometryThingy( THREE.BoxGeometry );
var Cylinder = makeGeometryThingy( THREE.CylinderGeometry );
var Sphere = makeGeometryThingy( THREE.SphereGeometry );
var Torus = makeGeometryThingy( THREE.TorusGeometry );
var TorusKnot = makeGeometryThingy( THREE.TorusKnotGeometry );
var Text = makeGeometryThingy( THREE.TextGeometry );

// 3D Polyhedron
var Polyhedron = makeGeometryThingy( THREE.PolyhedronGeometry );
var Dodecahedron = makeGeometryThingy( THREE.DodecahedronGeometry );
var Icosahedron = makeGeometryThingy( THREE.IcosahedronGeometry );
var Octahedron = makeGeometryThingy( THREE.OctahedronGeometry );
var Tetrahedron = makeGeometryThingy( THREE.TetrahedronGeometry );

// 3D Advanced
var Lathe = function(points, segments, phiStart, phiLength){
	// Convert [x,y] points to THREE.Vector3(x,0,y)
	var _points = [];
	for( var i=0,l=points.length; i<l; i+=1 ){
		_points.push( new THREE.Vector3( points[i][0], 0, points[i][1] ) );
	}
	var geometry = new THREE.LatheGeometry( _points, segments, phiStart, phiLength );
	return new Thingy( geometry );
};
var Extrude = makeGeometryThingy( THREE.ExtrudeGeometry );
var Tube = makeGeometryThingy( THREE.TubeGeometry );

// 3D Advanced
var ParametricGeometry = makeGeometryThingy( THREE.ParametricGeometry );

// 2D 
var Shape = (function(){
	return function(){
		var shape = Object.create( THREE.Shape.prototype );
		shape = (THREE.Shape.apply( shape, arguments ) || shape);
		return shape;
	}
})();

var Shape3 = (function(){
	function Shape(){
		this.path = new THREE.CurvePath();
		this.position = new THREE.Vector3(0,0,0);
	};
	Shape.prototype.moveTo = function(x,y,z){
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
	};
	Shape.prototype.lineTo = function(x,y,z){
		this.path.add( new THREE.LineCurve3(
			this.position.clone(),
			new THREE.Vector3( x, y, z )
		));
		this.moveTo(x,y,z);
	};
	Shape.prototype.quadraticCurveTo = function( cpx, cpy, cpz, x, y, z ){
		this.path.add( new THREE.QuadraticBezierCurve3(
			this.position.clone(),
			new THREE.Vector3( cpx, cpy, cpz ),
			new THREE.Vector3( x, y, z )
		));
		this.moveTo(x,y,z);
	};
	Shape.prototype.bezierCurveTo = function( cpx1, cpy1, cpz1, cpx2, cpy2, cpz2, x, y, z ){
		this.path.add( new THREE.CubicBezierCurve3(
			this.position.clone(),
			new THREE.Vector3( cpx1, cpy1, cpz1 ),
			new THREE.Vector3( cpx2, cpy2, cpz2 ),
			new THREE.Vector3( x, y, z )
		));
		this.moveTo(x,y,z);
	};
	Shape.prototype.splineThru = function( points ){
		var _points = [this.position.clone()];
		for( var i=0,l=points.length; i<l; i+=1 ){
			_points.push( new THREE.Vector3( points[i][0], points[i][1], points[i][2] ) );
		}
		this.path.add( new THREE.SplineCurve3(_points) );
		var last = _points[_points.length-1];
		this.moveTo(last.x,last.y,last.z);
	};
	Shape.prototype.fromShape = function( shape, z ){
		var actions = shape.actions;
		for( var i=0, l=actions.length; i<l; i+=1 ){
			var type = actions[i].action;
			if( type === 'moveTo' ){
				this.moveTo( actions[i].args[0], actions[i].args[1], z );
			}else
			if( type === 'lineTo' ){
				this.lineTo( actions[i].args[0], actions[i].args[1], z );
			}else
			if( type === 'quadraticCurveTo' ){
				this.quadraticCurveTo(
					actions[i].args[0], actions[i].args[1], z,
					actions[i].args[2], actions[i].args[3], z
				);
			}else
			if( type === 'bezierCurveTo' ){
				this.bezierCurveTo(
					actions[i].args[0], actions[i].args[1], z,
					actions[i].args[2], actions[i].args[3], z,
					actions[i].args[4], actions[i].args[5], z
				);
			}
		}
		return this;
	};

	return function(){
		return new Shape();
	};

})();

var Spline = function(points,isClosed){
	var _points = [];
	for( var i=0,l=points.length; i<l; i+=1 ){
		_points.push( new THREE.Vector3( points[i][0], points[i][1], points[i][2] ) );
	}
	if( isClosed ){
		return new THREE.ClosedSplineCurve3( _points );
	}else{
		return new THREE.SplineCurve3( _points );
	}
};

// Aliases
var Cube = makeGeometryThingy( THREE.CubeGeometry );

/*
CircleGeometry
var Ring = makeGeometryThingy( THREE.RingGeometry );
var Plane = makeGeometryThingy( THREE.PlaneGeometry );
ShapeGeometry
*/

function sign(a){
	if( a === 0 ){ return 0; }
	if( a > 0 ){ return 1; }
	if( a < 0 ){ return -1; }
}
function makeFilletCorner( r, x, y, z ){
	var x = sign(x);
	var corner = Cube( r, r, r, 1, 1, 1 );
	var sphere = Sphere(r*1.1, 8, 8, 0, Math.PI*2, 0, Math.PI).translate([
		-0.5*r*sign(x),
		-0.5*r*sign(y),
		-0.5*r*sign(z)
	]);
	return corner.subtract( sphere );
}
function makeFilletCorners( r, w, h, d ){
	var xPos =  w/2 - r/2;
	var xNeg = -w/2 + r/2;
	var yPos =  h/2 - r/2;
	var yNeg = -h/2 + r/2;
	var zPos =  d/2 - r/2;
	var zNeg = -d/2 + r/2;
	var corners = [
		makeFilletCorner( r, w, h, d ).translate([ xPos, yPos, zPos]),
		makeFilletCorner( r, w, h,-d ).translate([ xPos, yPos, zNeg]),
		makeFilletCorner( r, w,-h, d ).translate([ xPos, yNeg, zPos]),
		makeFilletCorner( r, w,-h,-d ).translate([ xPos, yNeg, zNeg]),
		makeFilletCorner( r,-w, h, d ).translate([ xNeg, yPos, zPos]),
		makeFilletCorner( r,-w, h,-d ).translate([ xNeg, yPos, zNeg]),
		makeFilletCorner( r,-w,-h, d ).translate([ xNeg, yNeg, zPos]),
		makeFilletCorner( r,-w,-h,-d ).translate([ xNeg, yNeg, zNeg])
	];
	var filletCorners = corners[0];
	filletCorners.union( corners[1] );
	filletCorners.union( corners[2] );
	filletCorners.union( corners[3] );
	filletCorners.union( corners[4] );
	filletCorners.union( corners[5] );
	filletCorners.union( corners[6] );
	filletCorners.union( corners[7] );
	return filletCorners;
}

function makeFilletEdgeProfile( r, x, y, z ){
	var r2 = r/2;
    var shape = Shape();
    shape.moveTo(  0, 0 );
	shape.lineTo(  r, 0 );
	//0, 0, // ax, aY
	//10, 10 // xRadius, yRadius
	//0, 2 * Math.PI, // aStartAngle, aEndAngle
	//false // aClockwise
	//shape.ellipseTo( -r, -r, r, r, 0, Math.PI/2, false );
	shape.quadraticCurveTo( 0, 0, 0, -r );
	shape.lineTo( 0, 0 );
	return shape;
}
function makeFilletEdge( r, curve ){
	var shape = makeFilletEdgeProfile(r);

	var extrudeSettings = {
		steps: 5,
		extrudePath: curve.path
	};
	return Extrude( shape, extrudeSettings );
}
function makeFilletEdges( r, curves ){

	console.info( curves );

	/*
	var group = makeFilletEdge( r, curves[0] );
	group.union( makeFilletEdge( r, curves[1] ).rotateTarget([180, 0, 0],'','max','max') );
	group.union( makeFilletEdge( r, curves[2] ).rotateTarget([ 90, 0, 0],'','min','max').rotateTarget([180,0,0]) );
	group.union( makeFilletEdge( r, curves[3] ).rotateTarget([-90, 0, 0],'','max','min').rotateTarget([180,0,0]) );
	group.union( makeFilletEdge( r, curves[4] ) );
	*/
	var group = makeFilletEdge( r, curves[0] );
	for( var i=1, l=curves.length; i<l; i+=1 ){
		group.union(makeFilletEdge( r, curves[i] ));
	}
	return group;

	// TODO: get appropriate length/width curves for the other parts
	//var copy = group.clone();
	//copy.rotateTarget([0,90,0]);
	//return group.union(copy);
}

function makeFilletBoxEdges( r, w, h, d ){
	var edges = [];

	var w2 = w/2;
	var h2 = h/2;
	var d2 = d/2;

	for( var i=0; i<12; i+=1 ){
		edges.push( new Shape3() );
	}

	// x axis fillets
	edges[0].moveTo( -w2, h2, d2 );
	edges[0].lineTo(  w2, h2, d2 );
	edges[1].moveTo( -w2, h2,-d2 );
	edges[1].lineTo(  w2, h2,-d2 );
	edges[2].moveTo( -w2,-h2, d2 );
	edges[2].lineTo(  w2,-h2, d2 );
	edges[3].moveTo( -w2,-h2,-d2 );
	edges[3].lineTo(  w2,-h2,-d2 );

	// y axis fillets
	edges[4].moveTo(  w2,-h2, d2 );
	edges[4].lineTo(  w2, h2, d2 );
	edges[5].moveTo(  w2,-h2,-d2 );
	edges[5].lineTo(  w2, h2,-d2 );
	edges[6].moveTo( -w2,-h2, d2 );
	edges[6].lineTo( -w2, h2, d2 );
	edges[7].moveTo( -w2,-h2,-d2 );
	edges[7].lineTo( -w2, h2,-d2 );

	// z axis fillets
	edges[8].moveTo(  w2, h2,-d2 );
	edges[8].lineTo(  w2, h2, d2 );
	edges[9].moveTo(  w2,-h2,-d2 );
	edges[9].lineTo(  w2,-h2, d2 );
	edges[10].moveTo( -w2, h2,-d2 );
	edges[10].lineTo( -w2, h2, d2 );
	edges[11].moveTo( -w2,-h2,-d2 );
	edges[11].lineTo( -w2,-h2, d2 );

	// Create all the fillets
	var fillets = [];
	for( var i=0, l=edges.length; i<l; i+=1 ){
		fillets.push(makeFilletEdge( r, edges[i] ));
	}

	// Rotate all of the fillets correctly
	fillets[0];
	fillets[1].rotateTarget([-90, 0, 0],'','max','max');
	fillets[2].rotateTarget([-90, 0, 0],'','max','min').rotateTarget([180,0,0]);
	fillets[3].rotateTarget([-180, 0, 0],'','max','max');

	fillets[4].rotateTarget([0,  90, 0],'min','','max');;
	fillets[5].rotateTarget([0, 180, 0],'min','','max');
	fillets[6];
	fillets[7].rotateTarget([0, 270, 0],'min','','max');

	fillets[8];
	fillets[9].rotateTarget([0,0,-90],'max','max','');
	fillets[10].rotateTarget([0,0,90],'max','max','');
	fillets[11].rotateTarget([0,0,180],'max','max','');

	// union them
	var group = fillets[0];
	for( var i=1, l=fillets.length; i<l; i+=1 ){
		group.union(fillets[i]);
	}

	return group;

	//return makeFilletEdges( r, edges );
}
