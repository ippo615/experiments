/** 
 * Using the data from Fig. 3.4, add to the signatures of the
 * columns the values of the following hash functions:
 * 
 *     (a) h3(x) = 2x + 4
 *     (b) h4(x) = 3x - 1
 * 
 * Columns:
 * 
 *     Elements = [0,1,2,3,4,5]
 *     S1       = [0,0,1,0,0,1]
 *     S2       = [1,1,0,0,0,0]
 *     S3       = [0,0,0,1,1,0]
 *     S4       = [1,0,1,0,1,0]
 */

// Note: I'm computed the entire signature the first 2 hashes are:
//
//     h1(x) = (x+1)  % 5
//     h2(x) = (3x+1) % 5
//
// I acutally think h3 and h4 are wrong, they aren't `mod 5` so
// we'll have values above 5. I've added the `mod 5` below.
//

var hashes = [
	function(x){ return (x+1) % 5; },
	function(x){ return (3*x+1) % 5; },
	function(x){ return (2*x+4) % 5; },
	function(x){ return Math.abs((3*x-1) % 5); }
];

var sets = [
	[1,0,0,1,0],
	[0,0,1,0,0],
	[0,1,0,1,1],
	[1,0,1,1,0]
];

function fixed_string( string, total_chars ){
	var str = ''+string;
	var diff = total_chars-str.length;
	if( diff > 0  ){
		var result = '';
		var l = diff/2;
		for( var i=0; i<l; i+=1 ){
			result += ' ';
		}

		result += str;

		l = Math.floor( l );
		for( var i=0; i<l; i+=1 ){
			result += ' ';
		}

		return result;
	}else if( diff < 0 ){
		return str.slice( 0, total_chars );
	}else{
		return str;
	}
}

function show_characteristic_matrix_with_hashes( elements, columns, hashes ){
	var result = '\n';
	var printSize = 8;

	// Generate the headers
	result += fixed_string( 'elements', printSize );
	for( var i=0, l=columns.length; i<l; i+=1 ){
		result += fixed_string( 'S'+i, printSize );
	}
	for( var i=0, l=hashes.length; i<l; i+=1 ){
		result += fixed_string( 'h'+i, printSize );
	}
	result += '\n';

	for( var e=0, el=elements.length; e<el; e+=1 ){
		result += fixed_string( elements[e], printSize );
		for( var s=0, sl=columns.length; s<sl; s+=1 ){
			result += fixed_string( columns[s][e], printSize );
		}
		for( var h=0, hl=hashes.length; h<hl; h+=1 ){
			result += fixed_string( hashes[h](elements[e]), printSize );
		}
		result += '\n';
	}

	return result;
}

console.info(
	show_characteristic_matrix_with_hashes( [0,1,2,3,4], sets, hashes )
);

// The question doesn't ask about the characteristic matrix. It asks
// about the signature matrix. That's computed below

function compute_signature_matrix( elements, columns, hashes ){
	// there is 1 row per hash function and 1 column per column
	// start by filling the signature matrix with infinity 
	var sig = [];
	var nHashes = hashes.length;
	var nColumns = columns.length;
	for( var i=0; i<nHashes; i+=1 ){
		var row = [];
		for( var j=0; j<nColumns; j+=1 ){
			row.push( 9e99 );
		}
		sig.push( row );
	}

	// NOTE: these are the rows of the characteristic matrix NOT the
	// signaure matrix
	var nRows = elements.length;

	// I should add an explaination here
	for( var r=0; r<nRows; r+=1 ){
		for( var c=0; c<nColumns; c+=1 ){

			if( columns[c][r] === 0 ){
				continue;
			}

			for( var i=0; i<nHashes; i+=1 ){
				var h = hashes[i](elements[r]);
				if( h < sig[i][c] ){
					sig[i][c] = h;
				}
			}
		}
	}

	return sig;
}

// Here's example 3.8
console.info( 'Example 3.8 Signature Matrix:' );
console.info( compute_signature_matrix(
	[
		0,1,2,3,4
	], [
		[1,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,1],
		[1,0,1,1,0]
	], [
		function(x){ return (x+1) % 5; },
		function(x){ return (3*x+1) % 5; }
	]
).join('\n') );

// Note that the first 2 rows are the same are the same as that for
// example 3.8. That's because they're using the same hash functions.
console.info( '' );
console.info( 'Problem 3.3.2 Signature Matrix:' );
console.info( compute_signature_matrix( [0,1,2,3,4], sets, hashes ).join('\n') );
