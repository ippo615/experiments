
function printPoints( points ){
	for( var i=0, l=points.length; i<l; i+=1 ){
		console.info( points[i].position );
	}
}

function testPoints( msg, points ){
	console.info( msg );

	var constraints = [
		new Constraint( points[0], points[1], 1.0, 9 ),
		new Constraint( points[1], points[2], 0.5, 9 ),
		new Constraint( points[2], points[3], 0.4, 9 ),
		new Constraint( points[3], points[0], 0.2, 9 )
	];

	for( var i=0; i<15; i+=1 ){
		resolveConstraints( constraints, 0.012 );
		printPoints( points );
	}
	printPoints( points );
}

testPoints( 'Correct initial positions', [
	new Point( new Vector(0,0,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(8,0,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(8,8,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(0,8,0), 1.0, new Vector(0,0,0) )
] );

/*
testPoints( 'Correct initial positions', [
	new Point( new Vector(0,0,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(9,0,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(9,9,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(0,9,0), 1.0, new Vector(0,0,0) )
] );

testPoints( 'Same initial position', [
	new Point( new Vector(0,0,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(0,0,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(0,0,0), 1.0, new Vector(0,0,0) ),
	new Point( new Vector(0,0,0), 1.0, new Vector(0,0,0) )
] );
*/