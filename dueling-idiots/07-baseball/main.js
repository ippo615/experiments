function factorial( end, start ){
	if( ! start ){ start = 1; }
	var total = 1;
	for( var i=start+1; i<=end; i+=1 ){
		total *= i;
	}
	return total;
}

function combinations( nTotal, kThings ){
	var nk = nTotal - kThings;
	if( nk > kThings ){
		return factorial( nTotal, nk ) / factorial( kThings );
	}else{
		return factorial( nTotal, kThings ) / factorial( nk );
	}
}

// Probabilty of winning exactly k games after playing n
function pWin( k, n, p ){
	return combinations( n, k ) * Math.pow( p, k ) * Math.pow( 1-p, n-k );
}

// Probability of winning at least w games after playing n
function pWinAtLeast( w, n, p ){
	var total = 0;
	for( var k=w; k<n; k+=1 ){
		total += pWin( k, n, p );
	}
	return total;
}

console.info( pWinAtLeast(81, 162, 0.5) );

// TODO: plot pWinAtLeast( w, 81, p ) / pWinAtLeast( w, 162, p ) vs p
