/**
 * Exercise 3.5.4 : Find the Jaccard distances between the following
 * pairs of sets:
 * 
 * (a) {1, 2, 3, 4} and {2, 3, 4, 5}.
 * (b) {1, 2, 3} and {4, 5, 6}.
 * 
 */

// Taken from ex-3-3-1.js
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

// The jaccard distance is 1-simlarity (simple)
function jaccard_distance( a, b ){
	return 1 - jaccard_similarity( a, b );
}

console.info( jaccard_distance([1, 2, 3, 4], [2, 3, 4, 5]) ); // 0.625
console.info( jaccard_distance([1, 2, 3], [4, 5, 6]) ); // 1
