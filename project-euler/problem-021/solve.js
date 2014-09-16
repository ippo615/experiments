/** Amicable numbers
 * 
 * Let d(n) be defined as the sum of proper divisors of n (numbers
 * less than n which divide evenly into n).
 * If d(a) = b and d(b) = a, where a != b, then a and b are an
 * amicable pair and each of a and b are called amicable numbers.
 * 
 * For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11,
 * 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper
 * divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
 * 
 * Evaluate the sum of all the amicable numbers under 10000.
 */


function proper_divisors(n) {

	// 1 and n are always factors BUT n is not a proper divisor
    var factors = [1];

	// There will never be a factor higher than sqrt(n)
    var upperLimit = Math.sqrt(n);

	// Computing
    for( var i = 2; i < upperLimit; i+=1 ){
        if ( n % i === 0 ) {
			upperLimit = n/i;
			factors.push( i );
			factors.push( upperLimit );
        }
    }

	// If the last factor was a perfect square - it was added twice 
	// so remove one
	if( upperLimit*upperLimit === n && factors.length > 2 ){
		factors.pop();
	}

    return factors;
}

function sum( digits ){
	var total = 0;
	var nDigits = digits.length;
	for( var i=0; i<nDigits; i+=1 ){
		total += digits[i];
	}
	return total;
}

function sum_of_divisors( n ){
	return sum( proper_divisors(n) );
}

function is_amicable( a ){
	var b = sum_of_divisors(a);
	var c = sum_of_divisors(b);
	return c === a && a !== b;
}

console.info( is_amicable( 220 ) );
console.info( is_amicable( 284 ) );

function solve( lowerLimit, upperLimit ){
	var total = 0;
	for( var i=lowerLimit; i<upperLimit; i+=1 ){
		if( is_amicable( i ) ){
			total += i;
		}
	}
	return total;
}

console.info( solve( 0, 10000 ) );

/** 31626
 * Congratulations, the answer you gave to problem 21 is correct.
 * 
 * You are the 74366th person to have solved this problem.
 */
