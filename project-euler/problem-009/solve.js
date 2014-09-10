/** Special Pythagorean triplet
 * A Pythagorean triplet is a set of three natural numbers, a < b < c,
 * for which, a**2 + b**2 = c**2
 *
 * For example, 3**2 + 4**2 = 9 + 16 = 25 = 5**2.
 *
 * There exists exactly one Pythagorean triplet for which a + b + c = 1000.
 * Find the product abc.
 */

// First generate the list of a's, b's, and c's that satisfy a+b+c = sum
function generate_abcs(sum){
	var c,b,a;
	var triplets = [];
	for( c=0; c<sum; c+=1 ){
		for( b=0; b<c; b+=1 ){
			for( a=0; a<b; a+=1 ){
				if( a+b+c === sum ){
					triplets.push([a,b,c]);
				}
			}
		}
	}
	return triplets;
}


function is_pythagorean_triplet( a, b, c ){
	return a*a+b*b === c*c;
}

//
function find_pythagorean_triplet( sum ){
	var triplets = generate_abcs( sum );

	var i, tri, l=triplets.length;
	for( i=0; i<l; i+=1 ){
		tri = triplets[i];
		if( is_pythagorean_triplet( tri[0], tri[1], tri[2] ) ){
			return tri;
		}
	}
	return null;
}

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

time_it( function(){
	console.info( find_pythagorean_triplet(3+4+5) );
} );

time_it( function(){
	var triplet = find_pythagorean_triplet(1000);
	console.info( triplet );
	console.info( triplet[0]*triplet[1]*triplet[2] );
} );

/**
 * Congratulations, the answer you gave to problem 9 is correct.
 *
 * You are the 170925th person to have solved this problem.
 */
