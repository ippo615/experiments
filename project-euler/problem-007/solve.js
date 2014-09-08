/** 10001st prime
 * By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can
 * see that the 6th prime is 13.
 *
 * What is the 10 001st prime number?
 */

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

function is_prime(n){
	var half = Math.floor(n/2);
	var i;
	for( i=2; i<half; i+=1 ){
		if( n % i === 0 ){
			return false;
		}
	}
	return true;
}

// returns the nth prime number (naive way)
function naive(n){
	var primeCount = -1;
	var i = 1;
	while( primeCount !== n ){
		if( is_prime(++i) ){
			primeCount += 1;
		}
	}
	return i;
}

time_it( function(){
	console.info( naive(6) );
} );

time_it( function(){
	console.info( naive(10001) );
} );

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

function solve(n){
	return sieve_of_eratosthenes( 1000000 )[n-1];
}

time_it(function(){
	console.info( solve( 6 ) );
});

time_it(function(){
	console.info( solve( 10001 ) );
});

// The sieve_of_eratosthenes runs much faster for large primes, the
// naive way took ~1630ms while the sieve took ~155ms (for 10001th prime)
// Project Euler's solution is just as fast as the seive (and has less
// memory requirements).

// project euler suggests the following:
function is_prime_euler(n){

	// 1 is not considered prime
	if( n===1 ){return false;} else

	// 2 and 3 are prime
	if( n<4 ){return true;} else

	// multiples of 2 are not prime
	if( n%2===0 ){return false;}else

	//we have already excluded 4,6 and 8.
	if( n<9 ){return true;}else

	// multiples of 3 are not prime
	if( n%3===0 ){return false;}

	// All primes greater than 3 can be written in the form 6k+/-1.
	// Any number n can have only one primefactor greater than n .
	// The consequence for primality testing of a number n is: if we
	// cannot find a number f less than or equal n that divides n then
	// n is prime: the only primefactor of n is n itself
	else{
		// n rounded to the greatest integer r so that r*r<=n
		var r=Math.floor( Math.sqrt(n) );
		var f=5;
		while( f<=r ){
			if( n%f===0 ){ return false; }
			if( n%(f+2)===0 ){ return false; }
			f=f+6;
		}
	}
	return true;
}

function solve_euler(n){
	var nPrimes = 0;
	var i = 0;
	while( nPrimes < n ){
		i+=1;
		if( is_prime_euler(i) ){
			nPrimes += 1;
		}
	}
	return i;
}

time_it(function(){
	console.info( solve_euler( 6 ) );
});

time_it(function(){
	console.info( solve( 10001 ) );
});


/** 104743
 * Congratulations, the answer you gave to problem 7 is correct.
 *
 * You are the 195150th person to have solved this problem.
 */
