/**
 * Exercise 3.1.2 : Compute the Jaccard bag similarity of each pair 
 * of the following three bags: {1, 1, 1, 2}, {1, 1, 2, 2, 3}, and
 * {1, 2, 3, 4}.
 */

function jaccard_similarity( a, b ){
	var bCopy = [];
	for( var i=0, l=b.length; i<l; i+=1 ){
		bCopy.push( b[i] );
	}

	var union = [];
	var intersection = [];
	
	for( var i=0, l=a.length; i<l; i+=1 ){
		var index = bCopy.indexOf( a[i] );
		if( index > -1 ){
			intersection.push( a[i] );
			bCopy.splice( index, 1 );
		}
	}

	var unionTotal = b.length + a.length;
	var intersectionTotal = intersection.length;

	return intersectionTotal / unionTotal;

}

// Example 3.2 - should be 1/3 (running code agrees)
console.info( jaccard_similarity(
	'a a a b'.split(' '),
	'a a b b c'.split(' ')
) );

console.info( jaccard_similarity( [1,1,1,2], [1,1,2,2,3] ) ); // 1/3
console.info( jaccard_similarity( [1,1,1,2], [1,2,3,4] ) );   // 1/4
console.info( jaccard_similarity( [1,1,2,2,3], [1,2,3,4] ) ); // 1/3
