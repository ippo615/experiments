/**
 * Exercise 1.3.3 : Suppose hash-keys are drawn from the population of all non-
 * negative integers that are multiples of some constant c, and hash function h(x)
 * is x mod 15. For what values of c will h be a suitable hash function, i.e., a
 * large random choice of hash-keys will be divided roughly equally into buckets?
 */

// We want to avoid c's that are multiples of 3,5, and 15. For example:
// 3,5,6,9,10,12,15,18,20,21,24,25,27,30 ...
// You'll see by runnin the simulation below that if c is one of those
// then it will have several empty buckets.

function hash( x ){
	return x % 15;
}

// Random simulation
function get_hash_key( c ){
	return Math.round( Math.random()*100 )*c;
}

function test_hash_key( c, hash, n ){
	var hashCounts = [];
	for( var i=0; i<n; i+=1 ){
		hashCounts.push( 0 );
	}

	for( var i=0; i<n*10; i+=1 ){
		hashCounts[ hash( get_hash_key(c) ) ] += 1;
	}

	return hashCounts;
}

function score_hash( hashCounts ){
	var l = hashCounts.length;
	var score = 0;
	for( var i=0; i<l; i+=1 ){
		if( hashCounts[i] !== 0 ){
			score += 1;
		}
	}
	return score / l;
}

for( var c=0; c<100; c+=1 ){
	var hashCounts = test_hash_key( c, hash, 15 );
	console.info( c +': '+ score_hash( hashCounts ) + ' -- '+ hashCounts  );
}

