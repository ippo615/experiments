/**
 * Exercise 3.6.3 : Any function of probability p, such as that of
 * Fig. 3.10, has a slope given by the derivative of the function. The
 * maximum slope is where that derivative is a maximum. Find the value
 * of p that gives a maximum slope for the S-curves given by Fig. 3.10
 * and Fig. 3.11. What are the values of these maximum slopes?
 * 
 */

// I was even lazier - i just asked wolframalpha:
// max slope (1-(1-p)^4)^4 => p=0.33126, slope=2.44998
// max slope (1-(1-p^4)^4) => p=0.66871, slope=2.55998

// Ok, I wasn't entirely lazy - numerical approximate to the derivative
// and a max-finding function are below and used to find the solutions.

function and( p, n ){
	return 'Math.pow('+p+','+n+')';
}
function or( p, n ){
	return '1-Math.pow(1-('+p+'),'+n+')';
}

function compile( expression, variable ){
	eval( 'var run = function('+variable+'){ return '+expression+'; };' );
	return run;
}

function diff( f, x, delta ){
	return (f(x+delta)-f(x-delta)) / (2.0*delta);
}

function max_slope( f, start, end, delta ){
	var xMax = start;
	var slopeMax = diff( f, start, delta );
	for( var i=start+delta; i<end; i+=delta ){
		var val = diff( f, i, delta );
		//console.info( f(i) +': '+ val );
		if( val > slopeMax ){
			xMax = i;
			slopeMax = val;
		}
	}

	return {
		index: xMax,
		slope: slopeMax
	};
}

var f310 = compile( or( and('p',4), 4 ), 'p' );
var f311 = compile( and( or('p',4), 4 ), 'p' );
var a = compile( or( and('p',2), 3 ), 'p' );
var b = compile( and( or('p',3), 2 ), 'p' );
var c = compile( and(or(and('p',2),2),2), 'p' );
var d = compile( and(or(and(or('p',2),2),2),2), 'p' );

var start = 0.0;
var end = 1.0;
var delta = 0.0001;

console.info( max_slope( f310, start, end, delta ) );
console.info( max_slope( f311, start, end, delta ) );
console.info( max_slope( a, start, end, delta ) );
console.info( max_slope( b, start, end, delta ) );
console.info( max_slope( c, start, end, delta ) );
console.info( max_slope( d, start, end, delta ) );

// Output (note: it agrees with Wolframalpha):
// { index: 0.6686999999999427, slope: 2.4499792394766517 }
// { index: 0.33129999999997983, slope: 2.4499792394766517 }
// { index: 0.44719999999996707, slope: 1.7173001689591016 }
// { index: 0.26319999999998733, slope: 1.9543806232361072 }
// { index: 0.729499999999936, slope: 2.1326980963620734 }
// { index: 0.41269999999997087, slope: 2.368862415194628 }
