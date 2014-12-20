
var points = [
	new Point( new Vector(0,0,0), 0.5, new Vector(0,0,0) ),
	new Point( new Vector(2,0,0), 0.5, new Vector(0,0,0) )
];

var GRAVITY = new Vector(0,0.98,0);
var DAMPING = 0.02;
var DT = 0.016;
for( var i=0; i<10; i+=1 ){
	for( var j=0,l=points.length; j<l; j+=1 ){
		points[j].force.add( GRAVITY );
	}
	verletStep( points, DT, 1.0-DAMPING );
	for( var j=0,l=points.length; j<l; j+=1 ){
		console.info( points[j].position );
	}
}
