
var points = [
	new Point( new Vector(0,0,0), 0.5, new Vector(0,0,0) ),
	new Point( new Vector(2,0,0), 0.5, new Vector(0,0,0) )
];

var GRAVITY = new Vector(0,0.98,0);
for( var i=0; i<10; i+=1 ){
	for( var j=0,l=points.length; j<l; j+=1 ){
		points[j].force.add( GRAVITY );
		points[j].step( 0.01, 0.01*0.01 );
		console.info( points[j].position );
	}
}
