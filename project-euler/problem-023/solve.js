/** Non-abundant sums
 *
 * A perfect number is a number for which the sum of its proper
 * divisors is exactly equal to the number. For example, the sum of
 * the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which
 * means that 28 is a perfect number.
 * 
 * A number n is called deficient if the sum of its proper divisors
 * is less than n and it is called abundant if this sum exceeds n.
 * 
 * As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the
 * smallest number that can be written as the sum of two abundant
 * numbers is 24. By mathematical analysis, it can be shown that all
 * integers greater than 28123 can be written as the sum of two
 * abundant numbers. However, this upper limit cannot be reduced any
 * further by analysis even though it is known that the greatest number
 * that cannot be expressed as the sum of two abundant numbers is less
 * than this limit.
 * 
 * Find the sum of all the positive integers which cannot be written as
 * the sum of two abundant numbers.
 * 
 */

// This is mostly an english (ie grammar/wording) problem.
// +integers which cannot be written as the sum of two abundant numbers
// is limited to positive integers between 28123 

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

function sum( numbers ){
	var total = 0;
	var nNumbers = numbers.length;
	for( var i=0; i<nNumbers; i+=1 ){
		total += numbers[i];
	}
	return total;
}

function _number_proper_divisor_difference( n ){
	return sum( proper_divisors(n) ) - n;
}
function is_abundant( n ){
	return _number_proper_divisor_difference( n ) > 0;
}
function is_deficient( n ){
	return _number_proper_divisor_difference( n ) < 0;
}
function is_prefect( n ){
	return _number_proper_divisor_difference( n ) === 0;
}

function solve( lowerLimit, upperLimit ){

	// get all abundant numbers
	var abundants = [];
	for( var i=0; i<upperLimit; i+=1 ){
		abundants.push( is_abundant(i) );
	}

	// Compute the sum of all numbers that can be written as
	// the sum of 2 abundant numbers
	var total = 0;
	for( var i=lowerLimit; i<=upperLimit; i+=1 ){

		// We only care about 2 number sums, this lets us look
		// through half of the abundant numbers we generated.
		var canBeSumOfAbundants = false;
		for( var j=Math.floor(i/2); j>0; j-=1 ){
			if( abundants[j] && abundants[i-j] ){
				canBeSumOfAbundants = true;
				break;
			}
		}
		if( ! canBeSumOfAbundants ){
			total += i;
		}

	}

	return total;
}

console.info( solve( 0, 28123 ) );

/** 4179871
 * Congratulations, the answer you gave to problem 23 is correct.
 * 
 * You are the 52611th person to have solved this problem.
 */
