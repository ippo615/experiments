/**
 * Exercise 3.4.1: Evaluate the S-curve `1 - (1 - s**r )**b` for
 * s = 0.1, 0.2, ... , 0.9, for the following values of r and b:
 * 
 *     r = 3 and b = 10
 *     r = 6 and b = 20
 *     r = 5 and b = 50
 */

function s_curve( s, r, b ){
	return 1 - Math.pow( 1- Math.pow(s,r), b );
}

function evaluate( start, stop, step, r, b ){
	console.info( 'r: '+r+', b: '+b );
	for( var i=start; i<stop; i+=step ){
		console.info( i.toPrecision(1)+'  '+s_curve( i, r, b ) );
	}
}

evaluate( 0.0, 1.0, 0.1, 3, 10 );
evaluate( 0.0, 1.0, 0.1, 6, 20 );
evaluate( 0.0, 1.0, 0.1, 5, 50 );
