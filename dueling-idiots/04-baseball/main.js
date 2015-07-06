// ---------------------------------------------------------------------
// 
// ---------------------------------------------------------------------

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

/*
console.info( factorial( 0 ) === 1 );
console.info( factorial( 1 ) === 1 );
console.info( factorial( 2 ) === 2 );
console.info( factorial( 3 ) === 6 );
console.info( factorial( 7, 6 ) === 7 );
console.info( combinations( 7, 5 ) === 21 );
*/

function pWin( bestOfCount, p ){
	var winThreshold = Math.ceil( bestOfCount / 2 );
	var result = 0;
	for( var i=0; i<winThreshold; i+=1 ){
		result += combinations( winThreshold-1+i, winThreshold-1 ) * Math.pow(p,winThreshold) * Math.pow(1-p,i);
	}
	return result;
}

function expectedNumberOfGames( bestOfCount, p ){
	var winThreshold = Math.ceil( bestOfCount / 2 );
	var result = 0;
	for( var i=0; i<winThreshold; i+=1 ){
		result += (winThreshold+i)*combinations( winThreshold-1+i, winThreshold-1 ) * Math.pow(p,winThreshold) * Math.pow(1-p,i);
		result += (winThreshold+i)*combinations( winThreshold-1+i, winThreshold-1 ) * Math.pow(1-p,winThreshold) * Math.pow(p,i);
	}
	return result;
}

var maxGames = 7;
console.info( pWin( maxGames, 0.5 ) );
console.info( pWin( maxGames, 0.4 ) );
console.info( pWin( maxGames, 0.3 ) );
console.info( pWin( maxGames, 0.2 ) );
console.info( pWin( maxGames, 0.1 ) );
console.info( pWin( maxGames, 0.05 ) );

console.info( expectedNumberOfGames( maxGames, 0.5 ) );
console.info( expectedNumberOfGames( maxGames, 0.4 ) );
console.info( expectedNumberOfGames( maxGames, 0.3 ) );
console.info( expectedNumberOfGames( maxGames, 0.2 ) );
console.info( expectedNumberOfGames( maxGames, 0.1 ) );
console.info( expectedNumberOfGames( maxGames, 0.05 ) );
