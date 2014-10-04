/** Number spiral diagonals
 * 
 * Starting with the number 1 and moving to the right in a clockwise
 * direction a 5 by 5 spiral is formed as follows:
 * 
 *     21 22 23 24 25
 *     20  7  8  9 10
 *     19  6  1  2 11
 *     18  5  4  3 12
 *     17 16 15 14 13
 * 
 * It can be verified that the sum of the numbers on the diagonals is 101.
 * 
 * What is the sum of the numbers on the diagonals in a 1001 by 1001
 * spiral formed in the same way?
 */

// The sum follows a pattern.
// The first location is 1 then 3,5,7,9 (thing to add increases by 2)
// then it moves to 13,17,21,25 (thing to add increases by 4).

function solve( size ){
	var total = 1;
	var step = 2;
	var index = 1;
	while( index < size*size ){
		for( var i=0; i<4; i+=1 ){
			index += step;
			total += index;
		}
		step += 2;
	}

	return total;
}

console.info( solve( 5 ) );
console.info( solve( 1001 ) );

/** 669171001
 * Congratulations, the answer you gave to problem 28 is correct.
 * 
 * You are the 60049th person to have solved this problem.
 */
