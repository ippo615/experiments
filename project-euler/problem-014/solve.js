/** Longest Collatz sequence
 * 
 * The following iterative sequence is defined for the set of positive
 * integers:
 * 
 *     n -> n/2 (n is even)
 *     n -> 3n + 1 (n is odd)
 * 
 * Using the rule above and starting with 13, we generate the following
 * sequence:
 * 
 *     13 , 40 , 20 , 10 , 5 , 16 , 8 , 4 , 2 , 1
 * 
 * It can be seen that this sequence (starting at 13 and finishing at 1)
 * contains 10 terms. Although it has not been proved yet (Collatz
 * Problem), it is thought that all starting numbers finish at 1.
 * 
 * Which starting number, under one million, produces the longest chain?
 * 
 * NOTE: Once the chain starts the terms are allowed to go above one million.
 */

function list_collatz( n ){
	var numbers = [];
	var i = n;
	while( i !== 1 ){
		numbers.push( i );
		var isEven = (i % 2 === 0);
		if( isEven ){
			i = i / 2;
		}else{
			i = 3*i + 1;
		}
	}
	numbers.push( i );
	return numbers;
}

function list_collatz_length( n ){
	var cLength = 1;
	var i = n;
	while( i !== 1 ){
		cLength += 1;
		var isEven = (i % 2 === 0);
		if( isEven ){
			i = i / 2;
		}else{
			i = 3*i + 1;
		}
	}
	return cLength;
}

console.info( list_collatz( 13 ) );
console.info( list_collatz( 13 ).length );
console.info( list_collatz_length( 13 ) );

function solve_naive( lowerLimit, upperLimit ){
	var bestLength = 0;
	var bestIndex = 0;
	for( var i=lowerLimit; i<=upperLimit; i+=1 ){
		var cl = list_collatz_length( i );
		var isBest = cl > bestLength;
		if( isBest ){
			bestLength = cl;
			bestIndex = i;
			//console.info( i+': '+cl+' <- NEW BEST ' );
		}else{
			//console.info( i+': '+cl );
		}

	}
	return [bestIndex,bestLength];
}

console.info( solve_naive( 1, 1000000 ) );

/** 837799, length 525
 * Congratulations, the answer you gave to problem 14 is correct.
 *
 * You are the 111347th person to have solved this problem.
 */
