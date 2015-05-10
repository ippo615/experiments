
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
	var sphere = Sphere(r, 8, 8, 0, Math.PI*2, 0, Math.PI).translate([
		-0.5*r*sign(x),
		-0.5*r*sign(y),
		-0.5*r*sign(z)]);
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

function main(p){
	var box = Box( 5,5,5, 1,1,1 );
	var corners = makeFilletCorners( 1, 5,5,5 );
	//return corners.toGeometry();
    return box.subtract( corners ).toGeometry()
}
