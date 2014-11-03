/**
 * Exercise 3.5.2 : Find the L1 and L2 distances between the points
 * (5, 6, 7) and (8, 2, 4).
 */

function lNorm( r, p1, p2 ){
	var dim = p1.length;
	if( p2.length !== dim ){
		throw new Error( 'Cannot compute the distance between a vector with '+dim+' elements and a vector with '+p2.length+' elements' );
	}

	var sum = 0.0;
	for( var i=0; i<dim; i+=1 ){
		sum += Math.pow( Math.abs( p1[i] - p2[i] ), r );
	}
	return Math.pow( sum, 1/r );
}

var p1 = [5,6,7];
var p2 = [8,2,4];
// console.info( lNorm( 0, p1, p2 ) ); There is no such thing as LO-Norm
console.info( lNorm( 1, p1, p2 ) ); // Manhattan Distance
console.info( lNorm( 2, p1, p2 ) ); // Euclidean Distance
console.info( lNorm( 3, p1, p2 ) ); // IDK Distance
