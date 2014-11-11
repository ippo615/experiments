/**
 * Exercise 4.4.1 : Suppose our stream consists of the integers
 * 3, 1, 4, 1, 5, 9, 2, 6, 5. Our hash functions will all be of
 * the form h(x) = ax + b mod 32 for some a and b. You should
 * treat the result as a 5-bit binary integer. Determine the tail
 * length for each stream element and the resulting estimate of the
 * number of distinct elements if the hash function is:
 * 
 * (a) h(x) = 2x + 1 mod 32.
 * (b) h(x) = 3x + 7 mod 32.
 * (c) h(x) = 4x mod 32.
 * 
 */

// Haha, Pi!

function tail_length( n ){
	// Tail length is just the numbers of 0s at the least significant
	// edge (right edge) of a number.
	// Note: maxIter prevents an infinite loop when the number is 0
	// it returns maxIter when n=0
	var index = 0;
	var maxIter = 32;
	while( (n & (1<<index)) === 0 && maxIter-- ){
		index += 1;
	}
	return index;
}

//console.info( tail_length( parseInt('01000',2) ) );
//console.info( tail_length( parseInt('00100',2) ) );
//console.info( tail_length( parseInt('00010',2) ) );
//console.info( tail_length( parseInt('00001',2) ) );
//console.info( tail_length( parseInt('00000',2) ) );

function estimate_uniques( stream, hash ){
	var maxTail = 0;
	for( var i=0, l=stream.length; i<l; i+=1 ){
		var tail = tail_length( hash( stream[i] ) );
		if( tail > maxTail ){
			maxTail = tail;
		}
	}
	return Math.pow( 2, maxTail );
}

var stream = [3, 1, 4, 1, 5, 9, 2, 6, 5];

function print_tail_lengths( stream, hash ){
	for( var i=0, l=stream.length; i<l; i+=1 ){
		console.info( tail_length( hash( stream[i] ) ) );
	}
}

var h1 = function(x){ return (2*x + 1) % 32; };
var h2 = function(x){ return (3*x + 7) % 32; };
var h3 = function(x){ return (4*x + 0) % 32; };

//print_tail_lengths( stream, h1 );
//print_tail_lengths( stream, h2 );
//print_tail_lengths( stream, h3 );

console.info( estimate_uniques( stream, h1 ) ); // 1
console.info( estimate_uniques( stream, h2 ) ); // 16
console.info( estimate_uniques( stream, h3 ) ); // 16

// Well, that worked. A better way (for larger data sets) is to first,
// group the hash functions into small groups, and take their average.
// Then, take the median of the averages groups. Groups should be of
// size at least a small multiple of log_2( actual_unique_items )

function estimate_uniques_better( stream, hash, group_size ){
	var averages = [];
	for( var i=0, l=stream.length; i<l; i+=group_size ){
		var average = 0.0;
		for( var j=0; j<group_size; j+=1 ){
			average += tail_length( hash( stream[i+j] ) );
		}
		averages.push( Math.pow(2,average / group_size) );
	}

	// Be lazy, don't worry about the few extras

	// Get the median
	averages.sort();
	return averages[Math.floor(averages.length/2)];

}

console.info( estimate_uniques_better( stream, h1, 3 ) ); // 1
console.info( estimate_uniques_better( stream, h2, 3 ) ); // 2
console.info( estimate_uniques_better( stream, h3, 3 ) ); // 6.35
