
return BoxGeometry(1, 1, 1, 1, 1, 1).toGeometry();

//Cylinder(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
return Cylinder(1, 1, 5, 24, 1, false).toGeometry();
return Cylinder(1, 4, 5, 24, 1, false).toGeometry();
return Cylinder(4, 1, 5, 24, 1, false).toGeometry();
return Cylinder(1, 4, 2, 24, 1, false).toGeometry();
return Cylinder(1, 4, 5, 4, 1, false).toGeometry();
return Cylinder(1, 4, 5, 24, 12, false).toGeometry();
return Cylinder(1, 2, 5, 24, 1, true).toGeometry();

//Sphere(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
return Sphere(2, 3, 2, 0, Math.PI*2, 0, Math.PI).toGeometry(); // minimums
return Sphere(1, 8, 6, 0, Math.PI*2, 0, Math.PI).toGeometry(); // default
return Sphere(1, 8, 6, 0, Math.PI, 0, Math.PI).toGeometry(); // half
return Sphere(1, 8, 6, 0, Math.PI*2, 0, Math.PI/2).toGeometry(); // half
return Sphere(1, 24, 18, 0, Math.PI*2, 0, Math.PI).toGeometry();

//TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
//radius — Default is 100.
//tube — Diameter of the tube. Default is 40.
//radialSegments — Default is 8
//tubularSegments — Default is 6.
//arc — Central angle. Default is Math.PI * 2. 
return Torus(2, 1, 3, 3, Math.PI*2).toGeometry();
return Torus(2, 1, 8, 6, Math.PI*2).toGeometry();
return Torus(1, 0.5, 24, 18, Math.PI*2).toGeometry();
return Torus(1, 0.5, 24, 18, Math.PI).toGeometry();
return Torus(1, 0.5, 24, 18, Math.PI/4).toGeometry();

// TextGeometry(text, parameters)
//text — The text that needs to be shown.
//parameters — Object that can contain the following parameters.
//    size — Float. Size of the text.
//    height — Float. Thickness to extrude text. Default is 50.
//    curveSegments — Integer. Number of points on the curves.
//    font — String. Font name.
//    weight — String. Font weight (normal, bold).
//    style — String. Font style (normal, italics).
//    bevelEnabled — Boolean. Turn on bevel. Default is False.
//    bevelThickness — Float. How deep into text bevel goes. Default is 10.
//    bevelSize — Float. How far from text outline is bevel. Default is 8.
// TODO: HOW TO LOAD FONTS?
return Text("Hello world!", {
	size: 4,
	height: 1,
	font: 'courier',
	curveSegments: 12,
	weight: "normal", // or "bold"
	style: "normal", // or "italic"
	bevelEnabled: true,
	bevelThickness: 0.5,
	bevelSize: 0.2
} ).toGeometry();

//return Polyhedron
return Dodecahedron(2,0).toGeometry();
return Icosahedron(2,0).toGeometry();
return Octahedron(2,0).toGeometry();
return Tetrahedron(2,0).toGeometry();


//
return Lathe( [
	[ 1, 0 ],
	[ 2, 1 ],
	[ 1, 2 ],
	[ 2, 3 ],
	[ 0, 4 ]
], 12, 0, Math.PI*2 ).toGeometry();

var points = [];
for ( var i = 0; i < 10; i ++ ){
	points.push( [
		Math.sin(i*0.2)*2, (i-5)/2 
	]);
}
return Lathe( points, 4, 0, Math.PI*2 ).toGeometry();

var points = [];
for ( var i = 0; i<=16; i ++ ){
	points.push( [
		Math.sin(i*2*Math.PI/16), (i-8)/2 
	]);
}
return Lathe( points, 12, 0, Math.PI*2 ).toGeometry();


// Shape
var shape = Shape(); // From http://blog.burlock.org/html5/130-paths
shape.moveTo( x + 25, y + 25 );
shape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
shape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
shape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
shape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
shape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
shape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
var extrudeSettings = {
	amount: 8,
	bevelEnabled: true,
	bevelSegments: 2,
	steps: 2,
	bevelSize: 1,
	bevelThickness: 1
};
return Extrude( shape, extrudeSettings ).toGeometry();

// Square
var shape = Shape();
shape.moveTo( -1, -1 );
shape.lineTo(  1, -1 );
shape.lineTo(  1,  1 );
shape.lineTo( -1,  1 );
var extrudeSettings = {
	amount: 1,
	bevelEnabled: true,
	bevelSegments: 1,
	bevelSize: 0.5,
	bevelThickness: 0.5
};
return Extrude( shape, extrudeSettings ).toGeometry();

// Rupee
var shape = Shape();
shape.moveTo( -1, -1 );
shape.lineTo(  0, -1.8 );
shape.lineTo(  1,  -1 );
shape.lineTo(  1,  1 );
shape.lineTo(  0,  1.8 );
shape.lineTo( -1,  1 );
var extrudeSettings = {
	amount: 0,
	bevelEnabled: true,
	bevelSegments: 1,
	bevelSize: 0.5,
	bevelThickness: 0.5
};
return Extrude( shape, extrudeSettings ).toGeometry();

var shape = Shape();
shape.moveTo( -1, -1 );
shape.lineTo(  1, -1 );
shape.lineTo(  1,  1 );
shape.lineTo( -1,  1 );
var closedSpline = Spline( [
	[ -2, -2, 0 ],
	[  2, -2, 0 ],
	[  2,  2, 0 ],
	[ -2,  2, 0 ]
], true );
var extrudeSettings = {
	steps: 8,
	extrudePath: closedSpline
};
return Extrude( shape, extrudeSettings ).toGeometry();


// TUBES

var closedSpline = new THREE.ClosedSplineCurve3( [
	new THREE.Vector3( -4, -4, 0 ),
	new THREE.Vector3(  4, -4, 0 ),
	new THREE.Vector3(  4,  4, 0 ),
	new THREE.Vector3( -4,  4, 0 )
] );

return Tube(closedSpline, 32, 1, 8, true).toGeometry();

var closedSpline = Spline( [
	[ -2, -2, 0 ],
	[  2, -2, 0 ],
	[  2,  2, 0 ],
	[  0,  4, 0 ],
	[ -2,  2, 0 ]
], true );
return Tube(closedSpline, 24, 1, 4, true).toGeometry();

//
var x=0,y=0;
var shape = Shape3();
shape.moveTo( x + 25, y + 25, 0 );
shape.bezierCurveTo(
	x + 25, y + 25, 0,
	x + 20, y     , 0,
	x     , y     , 0
);
shape.bezierCurveTo(
	x - 30, y     , 0,
	x - 30, y + 35, 0,
	x - 30, y + 35, 0
);
shape.bezierCurveTo(
	x - 30, y + 55, 0,
	x - 10, y + 77, 0,
	x + 25, y + 95, 0
);
shape.bezierCurveTo(
	x + 60, y + 77, 0,
	x + 80, y + 55, 0,
	x + 80, y + 35, 0
);
shape.bezierCurveTo(
	x + 80, y + 35, 0,
	x + 80, y     , 0,
	x + 50, y     , 0
);
shape.bezierCurveTo(
	x + 35, y     , 0,
	x + 25, y + 25, 0,
	x + 25, y + 25, 0
);
return Tube(p, 24, 1, 4, true).toGeometry();

var shape = Shape3();
var x=0, y=0;
shape.moveTo( x + 25, y + 25, 0 );
shape.bezierCurveTo(
	x + 25, y + 25, 0,
	x + 20, y     , 0,
	x     , y     , 0
);
shape.bezierCurveTo(
	x - 30, y     , 0,
	x - 30, y + 35, 0,
	x - 30, y + 35, 0
);
shape.bezierCurveTo(
	x - 30, y + 55, 0,
	x - 10, y + 77, 0,
	x + 25, y + 95, 0
);
shape.bezierCurveTo(
	x + 60, y + 77, 0,
	x + 80, y + 55, 0,
	x + 80, y + 35, 0
);
shape.bezierCurveTo(
	x + 80, y + 35, 0,
	x + 80, y     , 0,
	x + 50, y     , 0
);
shape.bezierCurveTo(
	x + 25, y     , 0,
	x + 30, y + 50, 0,
	x + 25, y + 25, 0
);
return Tube(shape.path, 24, 1, 8, true).rotateDeg([90,90,0]).scale([0.2,0.2,0.2]).toGeometry();

var x = 0, y=0;
var shape = Shape();
shape.moveTo( -10, -10 );
shape.lineTo(  10, -10 );
shape.lineTo(  10,  10 );
shape.lineTo( -10,  10 );
shape.lineTo( -10, -10 );
shape.lineTo(  10, -10 );
var shape3 = Shape3().fromShape(shape,0);

var shape = Shape();
shape.moveTo( -1, -1 );
shape.lineTo(  1, -1 );
shape.lineTo(  1,  1 );
shape.lineTo( -1,  1 );

var extrudeSettings = {
    steps: 5,
    extrudePath: shape3.path
};
return Extrude( shape, extrudeSettings ).toGeometry();

var p = new THREE.CurvePath();
p.add( new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
) );
p.add( new THREE.LineCurve3(
	new THREE.Vector3( 10, 0, 0 ),
	new THREE.Vector3( 10, -10, 0 )
) );
p.add( new THREE.SplineCurve3( [
	new THREE.Vector3( 10, -10, 0 ),
	new THREE.Vector3( 0, -10, 0 ),
	new THREE.Vector3( -10, 0, 0 )
] ) );
return Tube(p, 24, 1, 4, true).toGeometry();

// Parameteric Curved Surface
return ParametricGeometry( function(u,v){
	var x = u;
	var y = v;
	var z = Math.abs(Math.cos(x*5)) * Math.abs(Math.sin(y*5));
	return new THREE.Vector3(x, y, z);
}, 10, 10 ).scale([10,10,1]).toGeometry();

// Parameteric ripple
return ParametricGeometry( function(u,v){
	var a = 6;
	var b = 5;
	var x = Math.PI*4*u-Math.PI*2;
	var y = Math.PI*4*v-Math.PI*2;
	var z = Math.sin(Math.sqrt(a*x*x  + b*y*y))
	return new THREE.Vector3(x, y, z);
}, 30, 30 ).scale([10,10,3]).toGeometry();

// Parametric Donut
return ParametricGeometry( function(u,v){
	var a = 1.5;
	var b = 1;
	var u = 2*Math.PI*u;
	var v = 2*Math.PI*v;
	var x = Math.cos(u)*(a + b*Math.cos(v))
	var y = Math.sin(u)*(a + b*Math.cos(v));
	var z = b*Math.sin(v);
	return new THREE.Vector3(x, y, z);
}, 20, 20 ).scale([10,10,10]).toGeometry();


// fillet, work in progress
function main( progress ){

    var x=0,y=0,w=5,h=5;
    // Square
    var shape = Shape();
    shape.moveTo( x-w, y );
    shape.bezierCurveTo(  x-w, y-h, x-w, y-h, x, y-h );
    shape.bezierCurveTo(  x+w, y-h, x+w, y-h, x+w, y );
    shape.bezierCurveTo(  x+w, y+h, x+w, y+h, x, y+h );
    shape.bezierCurveTo(  x-w, y+h, x-w, y+h, x-w, y );
    var extrudeSettings = {
        amount: w*2,
        bevelEnabled: false
    };
    var a = Extrude( shape, extrudeSettings );
    a.translate([0,0,-h]);
    var b = a.clone();
    b.rotate([0,90,0]);
    //return a.toGeometry();
    /*
    //Sphere(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    var box = Cube(5, 5, 5, 1, 1, 1);
    var corner = Cube(1,1,1,1,1,1);
    var sphere = Sphere(1, 8, 6, 0, Math.PI*2, 0, Math.PI)
    var filletCornerCut = corner.subtract( sphere );
    //return box.subtract(filletCornerCut)
    
    */
    var box = Cube(5, 5, 5, 1, 1, 1);
    var corner = Cube(1,1,1,1,1,1);
    var sphere = Sphere(1, 16, 16, 0, Math.PI*2, 0, Math.PI).translate([0.5,0.5,0.5]);
    var filletCornerCut = corner.subtract( sphere );
    corner.translate([-2.0,-2.0,-2.0]);
	// only works for squares
    var cornerCutouts = [
        corner.clone().rotate([ 90,0,0]),
        corner.clone().rotate([ 90,90,0]),
        corner.clone().rotate([0, 90,0]),
        corner.clone().rotate([0, 90,90]),
        corner.clone().rotate([0,0, 90]),
        corner.clone().rotate([90,0,-90]),
        corner.clone().rotate([0,0,0]),
        corner.clone().rotate([-90,90,90])
    ];
    var rounding = cornerCutouts[0];
    rounding.union( cornerCutouts[1] );
    rounding.union( cornerCutouts[2] );
    rounding.union( cornerCutouts[3] );
    rounding.union( cornerCutouts[4] );
    rounding.union( cornerCutouts[5] );
    rounding.union( cornerCutouts[6] );
    rounding.union( cornerCutouts[7] );
    box.subtract(rounding);
    
    return box.toGeometry();
    return Cube(5, 5, 5, 1, 1, 1).toGeometry();
    //return a.intersect(b).toGeometry();
}

/*
	function makeFilletCorner( r, x, y, z ){
		var corner = Cube( r, r, r, 1, 1, 1 );
		var sphere = Sphere(r, 8, 8, 0, Math.PI*2, 0, Math.PI).translate([r*x,r*y,r*z]);
		return corner.subtract( sphere );
	}
	var corners = [
		makeFilletCorner( 1,  1, 1, 1 ).translate([ 2.5,2.5,2.5]),
		makeFilletCorner( 1, -1, 1, 1 ).translate([-2.5,2.5,2.5])
	];
	return corners[0].union( corners[1] ).toGeometry();
*/

function main(p){
	var box = Box( 5,5,5, 1,1,1 );
	var corners = makeFilletCorners( 1, 5,5,5 );
	//return corners.toGeometry();
    return box.subtract( corners ).toGeometry()
}

function main(p){
	var shape = Shape();
	shape.moveTo(  0, 0 );
	shape.lineTo( 10, 0 );
	var edge = Shape3().fromShape(shape,0);

	var filletEdge = makeFilletEdge( 1, edge );
	return filletEdge.toGeometry();
}

function main(p){
	var fillets = makeFilletBoxEdges( 1, 5, 5, 5 );
	return fillets.toGeometry();
}

function main(p){
	var fillets = makeFilletBoxEdges( 1, 5, 5, 5 );
	var box = Box(5,5,5, 1,1,1);
	box.subtract( fillets );
	return box.toGeometry();
}
function main(p){
	var fillets = makeFilletBoxEdges( 1, 6, 7, 8 );
	var box = Box(6,7,8, 1,1,1);
	//box.subtract( fillets );
	return fillets.toGeometry();
}

function main(p){
	var w = 6;
	var h = 5;
	var d = 2;
	var r = 0.5;
	var filletEdgeGroup = makeFilletBoxEdges( r, w,h,d );
	var filletCornerGroup = makeFilletCorners( r, w,h,d );
	var box = Box(w,h,d, 1,1,1);
	box.subtract( filletEdgeGroup );
	box.subtract( filletCornerGroup );
	//return fillets.toGeometry();
	return box.toGeometry();
}