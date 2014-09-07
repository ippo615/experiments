/** Sum square difference
 * The sum of the squares of the first ten natural numbers is,
 *     1**2 + 2**2 + ... + 10**2 = 385
 *
 * The square of the sum of the first ten natural numbers is,
 *     (1 + 2 + ... + 10)**2 = 55**2 = 3025
 * 
 * Hence the difference between the sum of the squares of the first ten
 * natural numbers and the square of the sum is 3025 - 385 = 2640.
 *
 * Find the difference between the sum of the squares of the first one
 * hundred natural numbers and the square of the sum.
 */

function sum_of_squares_general( numbers ){
	var sum = 0;
	var i = numbers.length;
	while( i-- ){
		sum += Math.pow( numbers[i], 2 );
	}
	return sum;
}

function sum_of_numbers_general( numbers ){
	var sum = 0;
	var i = numbers.length;
	while( i-- ){
		sum += numbers[i];
	}
	return sum;
}

function sum_of_numbers_trick( highest ){
	var h = highest-1;
	return h*h/2 + h/2;
}

function generate_number_array( lower, upper, step ){
	if( ! step ){ step = 1; }

	var numbers = [];
	var i;
	for( i=lower; i<=upper; i+=step ){
		numbers.push( i );
	}

	return numbers;
}

function solve(lower,upper){
	var numbers = generate_number_array(lower,upper);
	var sum = sum_of_numbers_general( numbers );
	var squared_sum = sum*sum;
	return squared_sum - sum_of_squares_general( numbers );
}

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

// WEIRD: no matter which order you run these 2 functions in, the 1st one
// supposedly takes 6 or 7ms while the 2nd takes 0ms...

time_it( function(){
	console.info( solve(1,10) );
});

time_it( function(){
	console.info( solve(1,100) );
});

/** 25164150
 * Congratulations, the answer you gave to problem 6 is correct.
 *
 * You are the 227601st person to have solved this problem.
 *
 */
