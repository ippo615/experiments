/** Largest prime factor
 * 
 * The prime factors of 13195 are 5, 7, 13 and 29.
 *
 * What is the largest prime factor of the number 600851475143 ?
 */

// determines if a number is prime or not
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

function largest_prime_factor(n){
	// start at the squareroot of n
	var i = Math.floor( Math.sqrt(n) );
	while( i-- ){
		if( n % i === 0 ){
			if( is_prime( i ) ){
				return i;
			}
		}
	}

	return -1;
}

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

time_it( function(){
	console.info( largest_prime_factor( 13195 ) );
});

time_it( function(){
	console.info( largest_prime_factor( 600851475143 ) );
});

// These ran pretty fast - 7ms and 14ms respectively
// I honestly thought it would take longer and that I would need a more
// complex factoring agorithm but this was fast enough.

/** 6857
 * Congratulations, the answer you gave to problem 3 is correct.
 * You are the 233776th person to have solved this problem.
 * You have earned 1 new award:
 *    Baby Steps: Solve three problems
 */