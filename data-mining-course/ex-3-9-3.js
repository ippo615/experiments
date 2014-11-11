/**
 * Exercise 3.9.3 : Suppose we have a string s of length 15, and we
 * wish to index its prefix as in Section 3.9.4.
 *
 * (a) How many positions are in the prefix if J = 0.85?
 * (b) How many positions are in the prefix if J = 0.95?
 * (c) For what range of values of J will s be indexed under its
 *     first four symbols, but no more?
 */

function prefix_length( string_length, jaccard_similarity ){
	return Math.floor((1 - jaccard_similarity)*string_length)  + 1;
}

// Part A = 3
console.info( prefix_length( 15, 0.85 ) );

// Part B = 1
console.info( prefix_length( 15, 0.95 ) );

// Part C
// Lp = Math.floor( (1-J)*Ls ) + 1
// J > (Ls - Lp)/Ls
// J > (15 - 4) / 15
// J > 0.733

