/** Quadratic primes
 * 
 * Euler discovered the remarkable quadratic formula:
 * 
 *     n*n + n + 41
 * 
 * It turns out that the formula will produce 40 primes for the
 * consecutive values n = 0 to 39. However, when n = 40:
 * 40**2 + 40 + 41 = 40(40 + 1) + 41 is divisible by 41, and
 * certainly when n = 41, 41**2 + 41 + 41 is clearly divisible by 41.
 * 
 * The incredible formula  n**2 - 79n + 1601 was discovered, which
 * produces 80 primes for the consecutive values n = 0 to 79. The
 * product of the coefficients, -79 and 1601, is -126479.
 * 
 * Considering quadratics of the form:
 * 
 *     n**2 + an + b, where |a| < 1000 and |b| < 1000
 * 
 *     where |n| is the modulus/absolute value of n
 *     e.g. |11| = 11 and |-4| = 4
 * 
 * Find the product of the coefficients, a and b, for the quadratic
 * expression that produces the maximum number of primes for consecutive
 * values of n, starting with n = 0. 
 */

// I'm using my a slightly modified version of my seive from problem 007
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
	//var primes = [];
	//for( i=0; i<upperLimit; i+=1 ){
	//	if( isPrime[i] ){
	//		primes.push( i );
	//	}
	//}
	//return primes;

	return isPrime;
}

function how_many_primes( a, b, isPrime ){
	var isResultPrime = true;
	var n = 0;
	while( isResultPrime ){
		var result = n*n + a*n + b;
		isResultPrime = isPrime[result];
		n += 1;
	}
	return n-1;
}


function solve( aLimit, bLimit ){

	// The maximum result we can have is:
	//     n**2 + 1000*n + 1000
	// Assuming n is 1000 (which seems rather high) that's
	// 1000*1000 -> 1001000
	var isPrime = sieve_of_eratosthenes( 1001000 );

	// console.info( how_many_primes( 1, 41, isPrime ) );
	// console.info( how_many_primes( -79, 1601, isPrime ) );

	var best = {
		a: null,
		b: null,
		n: 0
	};

	for( var a=-aLimit; a<=aLimit; a+=1 ){
		for( var b=-bLimit; b<=bLimit; b+=1 ){
			var n = how_many_primes( a, b, isPrime );
			if( n > best.n ){
				best.a = a;
				best.b = b;
				best.n = n;
				console.info( 'n**2 + '+a+'n + '+b+' :: '+n+' primes' );
			}
		}
	}
	
	return best.a*best.b;
}

console.info( solve( 1000, 1000 ) );

/** -59231
 * Congratulations, the answer you gave to problem 27 is correct.
 * 
 * You are the 45573rd person to have solved this problem.
 * 
 */
