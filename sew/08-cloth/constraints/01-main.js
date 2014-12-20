
function printPoints( points ){
	for( var i=0, l=points.length; i<l; i+=1 ){
		console.info( points[i].position );
	}
}

function testPoints( msg, points ){
	console.info( msg );

	var constraints = [
		new Constraint( points[0], points[1], 9 ),
		new Constraint( points[1], points[2], 9 ),
		new Constraint( points[2], points[3], 9 ),
		new Constraint( points[3], points[0], 9 )
	];

	for( var i=0; i<10; i+=1 ){
		resolveConstraints( constraints );
	}
	printPoints( points );
}

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

