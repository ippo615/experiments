/** Largest palindrome product
 * A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
 * 
 * Find the largest palindrome made from the product of two 3-digit numbers.
 */

// Let's think about long it will take to run:
// 1) Generate all palindromes -> then factor
//    There are less than 7 digits in the palindrome (1000*1000 = 1000000)
//    There are more than 4 digits in the palindrome (100*100 = 10000)
//    So generating all palindromes requires 990000 iterations (1000000-10000)
//    Generating the factors naively requires n**2 iterations per number 

// 2) Generate all 3 digit numbers -> then find palindromes (shown below)

function cartesian_product(sets, callback, prefix) {
	// Recursive algorithm to generate all the combinations of sets of things
	// also know as a Cartesian product.
	if( sets.length === 0) {
		return callback(prefix);
	}

	// For every choice in the current set treat the choise as a prefix
	// and the remaining sets as combinable stuff
	var remainder = sets.slice(1);
	for(var i = 0; i < sets[0].length; i+=1) {
		cartesian_product( remainder, callback, (prefix || []).concat(sets[0][i]));
	}
}
function is_palindrome(n){
	var str = ''+n;
	var i, l = str.length;
	var half = Math.floor(l/2);
	for( i=0; i<half; i+=1 ){
		if( str.charAt(i) !== str.charAt(l-i-1) ){
			return false;
		}
	}
	return true;
}

function solve( lowerLimit, upperLimit ){

	var numbers = [];
	var i;
	for( i=lowerLimit; i<upperLimit; i+=1 ){
		numbers.push( i );
	}

	var palindromes = [];	

	cartesian_product( [numbers,numbers], function(x){
		var product = x[0]*x[1];
		if( is_palindrome( product ) ){
			palindromes.push( product )
			//console.info( '[ '+x[0]+', '+x[1]+' ] -- '+product );
		}
	} );

	// find the largest palindrome
	var l=palindromes.length;
	var bestPalindrome = 0;
	for( i=0; i<l; i+=1 ){
		if( palindromes[i] > bestPalindrome ){
			bestPalindrome = palindromes[i];
		}
	}

	return bestPalindrome;
}


function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

time_it( function(){
	console.info( solve(90,100) );
});
time_it( function(){
	console.info( solve(100,1000) );
});

/** 906609
 * Congratulations, the answer you gave to problem 4 is correct.
 *
 * You are the 212600th person to have solved this problem.
 */
