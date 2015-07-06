
// ------------------------------------------------------- [ Part 1 ] -

function eEstimate( n ){
	
	// Initialize all bins to 0
	var bins = [];
	for( var i=0; i<n; i+=1 ){
		bins.push( 0 );
	}
	
	// Generate n random numbers and put each into it's bin
	for( var i=0; i<n; i+=1 ){
		var r = Math.random();
		var bin = Math.floor(r * n);
		bins[bin] += 1;
	}
	
	// Count the number of empty bins
	var z = 0;
	for( var i=0; i<n; i+=1 ){
		if( bins[i] === 0 ){
			z += 1;
		}
	}
	
	return n / z;
}

console.info( Math.exp( 1 ) );
console.info( eEstimate( 100 ) );
console.info( eEstimate( 1000 ) );
console.info( eEstimate( 5000 ) );

// ------------------------------------------------------- [ Part 2 ] -

function sSum( ){
	// n is the first number of terms such that S >= 1
	var s = 0;
	var n = 0;
	while( s < 1 ){
		s += Math.random();
		n += 1;
	}
	return n;
}

var nAvg = 0;
var nSamples = 10000;
for( var i=0; i<nSamples; i+=1 ){
	nAvg += sSum();
}
nAvg /= nSamples;
console.info( nAvg );
