/** Lexicographic permutations
 * 
 * A permutation is an ordered arrangement of objects. For example,
 * 3124 is one possible permutation of the digits 1, 2, 3 and 4. If
 * all of the permutations are listed numerically or alphabetically,
 * we call it lexicographic order. The lexicographic permutations of
 * 0, 1 and 2 are:
 * 
 *     012   021   102   120   201   210
 * 
 * What is the millionth lexicographic permutation of the digits:
 * 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
 * 
 */

function permute_next_lex( things ){
	// https://en.wikipedia.org/wiki/Permutation

	var nThings = things.length;

	// Find the largest index k such that a[k] < a[k + 1].
	// If no such index exists, the permutation is the last permutation.
	var k=-1;
	for( var i=0; i<nThings-1; i+=1 ){
		if( things[i] < things[i+1] ){
			k = i;
		}
	}
	if( k === -1 ){
		return null;
	}

	// Find the largest index l greater than k such that a[k] < a[l].
	var l=0;
	for( var i=k; i<nThings; i+=1 ){
		if( things[k] < things[i] ){
			l = i;
		}
	}

	// Swap the value of a[k] with that of a[l].
	array_swap( things, k, l );
	//var swap = things[k];
	//things[k] = things[l];
	//things[l] = swap;

	// Reverse the sequence from a[k + 1] up to and including the
	// final element a[n].
	array_reverse( things, k+1, nThings-1 );

	return things;
}

function array_swap( array, i, j ){
	var swap = array[i];
	array[i] = array[j];
	array[j] = swap;
	return array;
}

function array_reverse( array, start, end ){
	var delta = Math.ceil((end - start)/2);
	for( var i=0; i<delta; i+=1 ){
		var swap = array[start+i];
		array[ start+i ] = array[end-i];
		array[ end-i ] = swap;
	}
	return array;
}

function array_copy( array ){
	var copy = [];
	var i, l = array.length;
	for( i=0; i<l; i+=1 ){
		copy.push( array[i] );
	}
	return copy;
}

function solve( index, digits ){
	// We subtract 1 from the index because the sorted digits
	// are the 1st perumation
	var i = index-1;
	digits.sort();

	// Convert it the remaining number of times
	while( i-- ){
		permute_next_lex( digits );
	}

	return digits;
}

console.info( solve( 1000000, '0123456789'.split('') ).join('') );

/** 2783915460
 * Congratulations, the answer you gave to problem 24 is correct.
 * 
 * You are the 60359th person to have solved this problem.
 */
