/** Multiples of 3 and 5
 * If we list all the natural numbers below 10 that are multiples of 3 or 5,
 * we get 3, 5, 6 and 9. The sum of these multiples is 23.
 *
 * Find the sum of all the multiples of 3 or 5 below 1000.
 */

// The obvious way
function naive(upperLimit){
	var i;
	var sum = 0;
	for( i=0; i<upperLimit; i+=1 ){
		if( i%3 === 0 ){
			sum += i;
		}else if( i%5 === 0 ){
			sum += i;
		}
	}
	return sum;
}

console.info( naive(10) );
console.info( naive(1000) );

// More generic way
function generic( lowerLimit, upperLimit, conditions ){

	// For checking the conditions
	var j, nConditions = conditions.length;
	var isAllowed = false;

	// for iterating through all possible values
	var i;
	var sum = 0;
	for( i=lowerLimit; i<upperLimit; i+=1 ){

		// Check if this number is allowed
		isAllowed = false;
		for( j=0; j<nConditions; j+=1 ){
			if( conditions[j]( i ) ){
				isAllowed = true;
				break;
			}
		}

		// Add it if it is allowed
		if( isAllowed ){
			sum += i;
		}

	}

	return sum;
}

console.info( generic( 0, 10, [
	function(n){ return n % 3 === 0; },
	function(n){ return n % 5 === 0; }
]) );
console.info( generic( 0, 1000, [
	function(n){ return n % 3 === 0; },
	function(n){ return n % 5 === 0; }
]) );

// only iterates through the numbers being summed
function iterative( lowerLimit, upperLimit ){

	// n3 and n5 are the numbers that are the next multiples of 3 and 5
	var n3 = lowerLimit % 3 + 3;
	var n5 = lowerLimit % 5 + 5;

	var i, sum = 0;
	for( i=lowerLimit; i<upperLimit; /* blank */ ){

		// Always add i because i will always be an appropriate multiple
		sum += i;

		// Use and shift the smaller (because it is the next number 
		// in the list we care about).
		if( n3 < n5 ){
			i = n3;
			n3 += 3;
		}else if( n5 < n3 ){
			i = n5;
			n5 += 5;
		}else{
			i = n5;
			n3 += 3;
			n5 += 5;
		}
	}
	
	return sum;
}

console.info( iterative( 0, 10 ) );
console.info( iterative( 0, 1000 ) );

// only iterates through the numbers being summed (but allow custom factors)
function iterative_generic( lowerLimit, upperLimit, factors ){

	// Create the list of possible next values
	var f, nexts = [];
	var nFactors = factors.length;
	for( f=0; f<nFactors; f+=1 ){
		nexts.push( lowerLimit % factors[f] + factors[f] );
	}

	var i, nextMin,  sum = 0;
	for( i=lowerLimit; i<upperLimit; /* blank */ ){

		// Always add i because i will always be an appropriate multiple
		sum += i;

		// Update all of the nexts that are lowest
		nextMin = Math.min.apply( Math, nexts );
		for( f=0; f<nFactors; f+=1 ){
			if( nexts[f] === nextMin ){
				nexts[f] += factors[f];
			}
		}

		// Update the iterator
		i = nextMin;

	}
	
	return sum;
}

console.info( iterative_generic( 0, 10, [3,5] ) );
console.info( iterative_generic( 0, 1000, [3,5] ) );

/** 233168
 * Congratulations, the answer you gave to problem 1 is correct.

 * You are the 387100th person to have solved this problem.

 * Return to Problems page.
 */
// 387100 <- what a nice number!
