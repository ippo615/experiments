// A single function that adds 2 arrays

function addArray( arr1, arr2 ){
	var result = [];

	var i,l=arr1.length;
	for( i=0; i<l; i+=1 ){
		result.push( arr1[i] + arr2[i] );
	}

	return result;
}
