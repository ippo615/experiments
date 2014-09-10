/** Summation of primes
 *
 * The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
 *
 * Find the sum of all the primes below two million.
 */

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

// I'm using my seive from problem 007
function sieve_of_eratosthenes( upperLimit ){
	// create 2 lists - one of the actual number, the other of prime status
	var numbers = [];
	var isPrime = [];
	var i;
	for( i=0; i<upperLimit; i+=1 ){
		numbers.push( i );
		isPrime.push( true );
	}

	isPrime[0] = false;
	isPrime[1] = false;

	var p = 0;
	while( p < upperLimit ){

		// Find the first number greater than p in the list that is not
		// marked. This is the next prime.
		p += 1;
		while( isPrime[p] === false ){
			p +=1;
		}

		// Starting at p mark every multiple (2p,3p,...) of p in the list
		// but don't include p
		for( i=p*2; i<upperLimit; i+=p ){
			isPrime[ i ] = false;
		}
	}

	// extract the list of primes
	var primes = [];
	for( i=0; i<upperLimit; i+=1 ){
		if( isPrime[i] ){
			primes.push( i );
		}
	}

	return primes;	
}

function sum( numbers ){
	var total = 0;
	var i, l=numbers.length;
	for( i=0; i<l; i+=1 ){
		total += numbers[i];
	}
	return total;
}

time_it( function(){
	console.info( sum( sieve_of_eratosthenes( 10 ) ) );
} );
time_it( function(){
	console.info( sum( sieve_of_eratosthenes( 2000000 ) ) );
} );

/** 142913828922
 * Congratulations, the answer you gave to problem 10 is correct.
 *
 * You are the 156626th person to have solved this problem.
 */
