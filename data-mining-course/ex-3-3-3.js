/** 
 * Exercise 3.3.3 : In Fig. 3.5 is a matrix with six rows.
 * 
 * (a) Compute the minhash signature for each column if we use
 *     the following three hash functions:
 * 
 *     h1 (x) = 2x + 1 mod 6;
 *     h2 (x) = 3x + 2 mod 6;
 *     h3 (x) = 5x + 2 mod 6;
 * 
 * (b) Which of these hash functions are true permutations?
 * 
 * (c) How close are the estimated Jaccard similarities for the
 *     six pairs of columns to the true Jaccard similarities?
 */

elements = [0,1,2,3,4,5];
S1 = [0,0,1,0,0,1];
S2 = [1,1,0,0,0,0];
S3 = [0,0,0,1,1,0];
S4 = [1,0,1,0,1,0];

var hashes = [
	function(x){ return (2*x+1) % 6; },
	function(x){ return (3*x+2) % 6; },
	function(x){ return (5*x+2) % 6; }
];

var sets = [ S1, S2, S3, S4 ];

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
	show_characteristic_matrix_with_hashes( elements, sets, hashes )
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

// Part (a) 
var signature = compute_signature_matrix( elements, sets, hashes );
console.info( 'Problem 3.3.3 Part A:' );
console.info( signature.join('\n') );

// Part (b)
// Which of these hash functions are true permutations?
//
// Looking at the augmented characteristic matrix (I acutally don't
// need the entire matrix just the hash results):
//
// elements   S0      S1      S2      S3      h0      h1      h2   
//     0       0       1       0       1       1       2       2   
//     1       0       1       0       0       3       5       1   
//     2       1       0       0       1       5       2       0   
//     3       0       0       1       0       1       5       5   
//     4       0       0       1       1       3       2       4   
//     5       1       0       0       0       5       5       3 
// 
// h0 maps [0,1,2,3,4,5] -> [1,3,5,1,3,5] ==> not a true permutation
// h1 maps [0,1,2,3,4,5] -> [2,5,2,5,2,5] ==> not a true permutation
// h2 maps [0,1,2,3,4,5] -> [2,1,0,5,4,3] ==> is a true permutation
// 
// So it's only h2

// Part (c)
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

function extract_cols( mtx ){
	var cols = [];
	var nCols = mtx[0].length;
	var nRows = mtx.length;
	for( var c=0; c<nCols; c+=1 ){
		var col = [];
		for( var r=0; r<nRows; r+=1 ){
			col.push( mtx[r][c] );
		}
		cols.push( col );
	}
	return cols;
}

var actuals = [
	jaccard_similarity( sets[0], sets[1] ),
	jaccard_similarity( sets[0], sets[2] ),
	jaccard_similarity( sets[0], sets[3] ),
	jaccard_similarity( sets[1], sets[2] ),
	jaccard_similarity( sets[1], sets[3] ),
	jaccard_similarity( sets[2], sets[3] )
];

var sig_sets = extract_cols( signature );
var estimates = [
	jaccard_similarity( sig_sets[0], sig_sets[1] ),
	jaccard_similarity( sig_sets[0], sig_sets[2] ),
	jaccard_similarity( sig_sets[0], sig_sets[3] ),
	jaccard_similarity( sig_sets[1], sig_sets[2] ),
	jaccard_similarity( sig_sets[1], sig_sets[3] ),
	jaccard_similarity( sig_sets[2], sig_sets[3] )
];

console.info( '' );
console.info( 'Problem 3.3.3 C:' );
console.info( fixed_string("Actual",20) +' vs '+ fixed_string("Estimate",20) );
for( var i=0, l=actuals.length; i<l; i+=1 ){
	console.info( ''+
		fixed_string(actuals[i],20)+' vs '+
		fixed_string(estimates[i],20)
	);
}
