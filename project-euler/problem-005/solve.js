/** Smallest multiple
 * 2520 is the smallest number that can be divided by each of the numbers
 * from 1 to 10 without any remainder.
 *
 * What is the smallest positive number that is evenly divisible (divisible
 * with no remainder) by all of the numbers from 1 to 20?
 */

function is_evenly_divisible_by( n, numbers ){
	var i=numbers.length;
	while( i-- ){
		if( n % numbers[i] !== 0 ){
			return false;
		}
	}
	return true;
}

function solve( lowerLimit, upperLimit, divisors ){
	var i;
	for( i=lowerLimit; i<upperLimit; i+=1 ){
		if( is_evenly_divisible_by( i, divisors ) ){
			return i;
		}
	}
	return null;
}

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

time_it( function(){
	console.info( solve(1,3000,[2,3,4,5,6,7,8,9,10]) );
});

time_it( function(){
	console.info( solve(1,10000000000,[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) );
});

/** 232792560
 * Congratulations, the answer you gave to problem 5 is correct.
 *
 * You are the 225887th person to have solved this problem.
 */
