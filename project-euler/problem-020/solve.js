/** Factorial digit sum
 * 
 * n! means n × (n − 1) × ... × 3 × 2 × 1
 * 
 * For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
 * and the sum of the digits in the number 10! is
 * 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
 * 
 * Find the sum of the digits in the number 100!
 */

function factorial(n){
	var i = n+1;
	var total = 1;
	while( --i ){
		total *= i;
	}
	return total;
}

console.info( factorial( 10 ) );
console.info( factorial( 100 ) );

// Use big numbers

function big_num_reverse( digits ){
	var nDigits = digits.length;
	var half = Math.floor(nDigits/2);
	var s,i,j;
	for( i=0, j=nDigits-1; i<half; i+=1,j-=1 ){
		s = digits[i];
		digits[i] = digits[j];
		digits[j] = s;
	}
	return digits;
}

function big_num_add( self, other, base ){
	var nSelf = self.length;
	var nOther = other.length;

	// Create A and B the result will always be in A
	// which is a copy of the bigger one
	if( nSelf >= nOther ){
		var a = self;
		var b = other;
	}else{
		var a = other;
		var b = self;
	}
	var al = a.length;
	var bl = b.length;

	var sum = [];
	for( var i=0; i<al; i+=1 ){
		sum.push( a[i] );
	}

	for( var i=0; i<bl; i+=1 ){
		sum[i] += b[i];
	}

	return big_num_flatten_carries( sum, base );

}

function big_num_flatten_carries( digits, base ){
	if( ! base ){ base = 10; }
	var maxDigit = base-1;

	for( var i=0; i<digits.length; i+=1 ){
		var d = digits[i];
		// pad with 0's when needed
		if( d > maxDigit && i+1 === digits.length ){
			digits.push(0);
		}
		while( d > maxDigit ){
			d -= base;
			digits[i+1] += 1;
		}
		digits[i] = d;
	}

	return digits;
}

function big_num_print( digits, base ){
	var print_digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	var str = '';
	var d,i=digits.length;
	while( i-- ){
		str += print_digits[ digits[i] ];
	}
	return str.replace(/^0+/,'');
}
function big_num_from_string( str, base ){
	if( ! base ){ base = 10; }
	var big_num = [];
	var digits = str.split('');
	var i, nDigits = digits.length;
	for( i=0; i<nDigits; i+=1 ){
		big_num.push( parseInt(str[i],base) );
	}
	return big_num_reverse( big_num );
}

function big_num_mul_little( big, little, base ){
	var nDigits = big.length;
	for( var i=0; i<nDigits; i+=1 ){
		big[i] *= little;
	}
	return big_num_flatten_carries( big, base );
}

function big_num_factorial( n, base ){
	var num = big_num_from_string( '1', base );
	var i = n+1;
	while( --i ){
		num = big_num_mul_little( num, i, base );
	}
	return num;
}

console.info( big_num_print(big_num_factorial( 10, 10 ),10) );
console.info( big_num_print(big_num_factorial( 100, 10 ),10) );

function sum_digits( digits ){
	var total = 0;
	var nDigits = digits.length;
	for( var i=0; i<nDigits; i+=1 ){
		total += digits[i];
	}
	return total;
}

console.info( sum_digits( big_num_factorial( 10, 10 ) ) );
console.info( sum_digits( big_num_factorial( 100, 10 ) ) );

/** 648
 * Congratulations, the answer you gave to problem 20 is correct.
 * 
 * You are the 105774th person to have solved this problem.
 */
