/**
 * Exercise 3.1.1 : Compute the Jaccard similarities of each pair of
 * the following three sets: {1, 2, 3, 4}, {2, 3, 5, 7}, and {2, 4, 6}.
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

	var unionTotal = bCopy.length + a.length;
	var intersectionTotal = intersection.length;

	return intersectionTotal / unionTotal;

}

console.info( jaccard_similarity( [1,2,3,4], [2,3,5,7] ) ); // 1/3
console.info( jaccard_similarity( [1,2,3,4], [2,4,6] ) );   // 4/10
console.info( jaccard_similarity( [2,3,5,7], [2,4,6] ) );   // 1/7
