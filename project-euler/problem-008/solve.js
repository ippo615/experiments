/** Largest product in a series
 * The four adjacent digits in the 1000-digit number that have the
 * greatest product are 9 × 9 × 8 × 9 = 5832.
 * 
 * 73167176531330624919225119674426574742355349194934
 * 96983520312774506326239578318016984801869478851843
 * 85861560789112949495459501737958331952853208805511
 * 12540698747158523863050715693290963295227443043557
 * 66896648950445244523161731856403098711121722383113
 * 62229893423380308135336276614282806444486645238749
 * 30358907296290491560440772390713810515859307960866
 * 70172427121883998797908792274921901699720888093776
 * 65727333001053367881220235421809751254540594752243
 * 52584907711670556013604839586446706324415722155397
 * 53697817977846174064955149290862569321978468622482
 * 83972241375657056057490261407972968652414535100474
 * 82166370484403199890008895243450658541227588666881
 * 16427171479924442928230863465674813919123162824586
 * 17866458359124566529476545682848912883142607690042
 * 24219022671055626321111109370544217506941658960408
 * 07198403850962455444362981230987879927244284909188
 * 84580156166097919133875499200524063689912560717606
 * 05886116467109405077541002256983155200055935729725
 * 71636269561882670428252483600823257530420752963450
 * 
 * Find the thirteen adjacent digits in the 1000-digit number that
 * have the greatest product. What is the value of this product?
 */

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

var bigNumber = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";

function find_max_product_bad( bigNumber, nDigits ){

	// convert the big number string to an array of integera
	var i,l = bigNumber.length;
	var digits = [];
	for( i=0; i<l; i+=1 ){
		digits.push( parseInt(bigNumber.charAt(i),10) );
	}

	// Compute the product of the first n digits
	var product = 1;
	for( i=0; i<nDigits; i+=1 ){
		product *= digits[i];
	}
	console.info( product );

	// this will store the max product and its location
	var bestProduct = product;
	var bestIndex = 0;

	// We'll be lazy and will remove the last digit by dividing
	// and will multiply in the next digit.
	// THIS DOES NOT WORK BECAUSE OF DIVIDE BY 0 PROBLEMS!
	// So - add/subtract instead
	for( i=nDigits; i<l; i+=1 ){
		product /= digits[i-nDigits];
		product *= digits[i];
		if( product > bestProduct ){
			bestProduct = product;
			bestIndex = i-nDigits+1;
		}
		if( i === nDigits+2 ){break;}
	}

	console.info( digits.slice( bestIndex, bestIndex+nDigits ) );

	return bestProduct;
}

function find_max_product_bad2( bigNumber, nDigits ){
	// THIS ALSO DOES NOT WORK BECAUSE YOU CAN STILL HAVE A 0 IN
	// THE MAX SUM WHICH MEANS 0 PRODUCT

	// convert the big number string to an array of integera
	var i,l = bigNumber.length;
	var digits = [];
	for( i=0; i<l; i+=1 ){
		digits.push( parseInt(bigNumber.charAt(i),10) );
	}

	// Compute the sum of the first n digits
	var sum = 0;
	for( i=0; i<nDigits; i+=1 ){
		sum += digits[i];
	}
	console.info( sum );
	// this will store the max product and its location
	var bestSum = sum;
	var bestIndex = 0;

	// We'll be lazy and will remove the last digit by subtracting
	// and will add in the next digit.
	for( i=nDigits; i<l; i+=1 ){
		sum -= digits[i-nDigits];
		sum += digits[i];
		if( sum > bestSum ){
			bestSum = sum;
			bestIndex = i-nDigits+1;
		}
	}

	console.info( digits.slice( bestIndex, bestIndex+nDigits ) );

	// Compute the actual product from the results
	var product = 1;
	for( i=bestIndex; i<bestIndex+nDigits; i+=1 ){
		product *= digits[i];
	}

	return product;
}

function find_max_product_bad3( bigNumber, nDigits ){

	// convert the big number string to an array of integera
	var i,l = bigNumber.length;
	var digits = [];
	for( i=0; i<l; i+=1 ){
		digits.push( parseInt(bigNumber.charAt(i),10) );
	}

	// Compute the product of the first n digits
	var product = 1;
	for( i=0; i<nDigits; i+=1 ){
		product *= digits[i];
	}

	// this will store the max product and its location
	var bestProduct = product;
	var bestIndex = 0;

	// We'll be lazy and will remove the last digit by dividing
	// and will multiply in the next digit.
	// So - add/subtract instead
	var dOld, dNew;
	for( i=nDigits; i<l; i+=1 ){
		dOld = digits[i-nDigits];
		dNew = digits[i];


		// if we find a 0 - skip the next section
		// and reset the product
		if( dOld === 0 ){
			// this is the wrong product - it should be computed
			// from the numbers
			product = 1;

		}else if( dNew === 0 ){
			// I should look for a another max here but I don't
			// want to duplicate those 4 lines of code
			product = 1;

		// otherwise, remove the oldest digit and add the newest
		}else{
			product /= dOld;
			product *= dNew;
			if( product > bestProduct ){
				bestProduct = product;
				bestIndex = i-nDigits+1;
			}
		}

	}

	console.info( digits.slice( bestIndex, bestIndex+nDigits ) );

	return bestProduct;
}

function find_max_product( bigNumber, nDigits ){

	// convert the big number string to an array of integera
	var i,l = bigNumber.length;
	var digits = [];
	for( i=0; i<l; i+=1 ){
		digits.push( parseInt(bigNumber.charAt(i),10) );
	}

	// Compute the product of the first n digits
	var product = 1;
	for( d=0; d<nDigits; d+=1 ){
		product *= digits[d];
	}

	// this will store the max product and its location
	var bestProduct = product;
	var bestIndex = 0;

	for( i=nDigits; i<l; i+=1 ){

		// Compute a product for each iteration
		product = 1;
		for( d=0; d<nDigits; d+=1 ){
			product *= digits[i+d];
		}

		if( product > bestProduct ){
			bestProduct = product;
			bestIndex = i;
		}

	}

	console.info( digits.slice( bestIndex, bestIndex+nDigits ) );

	return bestProduct;
}

time_it( function(){
	console.info( find_max_product( bigNumber, 4 ) );
} );

time_it( function(){
	console.info( find_max_product( bigNumber, 13 ) );
} );

/** 23514624000
 * Congratulations, the answer you gave to problem 8 is correct.
 *
 * You are the 172713th person to have solved this problem.
 */
