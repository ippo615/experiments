// Factorial functions that takes an optional 2nd parameter
// ie factorial( 10 ) = 10!
//    factorial( 10, 8 ) = 10! / 8! <- this can be optomized
function factorial( end, start ){
	if( ! start ){ start = 1; }
	var total = 1;
	for( var i=start+1; i<=end; i+=1 ){
		total *= i;
	}
	return total;
}

// This stuff: https://en.wikipedia.org/wiki/Binomial_coefficient
function combinations( nTotal, kThings ){
	// The obvious way is to use:
	//     factorial( nTotal ) / ( factorial(kThings)*factorial(nk) )
	// but my factorial let's us simplify things a little.
	var nk = nTotal - kThings;
	if( nk > kThings ){
		return factorial( nTotal, nk ) / factorial( kThings );
	}else{
		return factorial( nTotal, kThings ) / factorial( nk );
	}
}

// `N` people independently flip their own fair coins.
// What is the probability that everyone gets exactly `n` heads?
// for N = 2,3,4 and n = 10,50,100,150

function computeCoin(N,n){
	var total = 0;
	for( var k=0; k<n; k+=1 ){
		total += Math.pow( combinations( n, k ), N );
	}
	return total / Math.pow( 2, n*N );
}

console.info( computeCoin( 2, 10 ) );
console.info( computeCoin( 2, 50 ) );
console.info( computeCoin( 2, 100 ) );
console.info( computeCoin( 2, 150 ) );
console.info( computeCoin( 3, 10 ) );
console.info( computeCoin( 3, 50 ) );
console.info( computeCoin( 3, 100 ) );
console.info( computeCoin( 3, 150 ) );
console.info( computeCoin( 4, 10 ) );
console.info( computeCoin( 4, 50 ) );
console.info( computeCoin( 4, 100 ) );
console.info( computeCoin( 4, 150 ) );
