/** 1000-digit Fibonacci number
 * 
 * The Fibonacci sequence is defined by the recurrence relation:
 * 
 *     Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
 * 
 * Hence the first 12 terms will be:
 * 
 *     F1 = 1
 *     F2 = 1
 *     F3 = 2
 *     F4 = 3
 *     F5 = 5
 *     F6 = 8
 *     F7 = 13
 *     F8 = 21
 *     F9 = 34
 *     F10 = 55
 *     F11 = 89
 *     F12 = 144
 * 
 * The 12th term, F12, is the first term to contain three digits.
 * 
 * What is the first term in the Fibonacci sequence to contain
 * 1000 digits?
 * 
 */


// BIG NUMBERS (from problem 20)

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

function big_num_copy( big_num ){
	var copy = [];
	var i,l=big_num.length;
	for( var i=0; i<l; i+=1 ){
		copy.push( big_num[i] );
	}
	return copy;
}

function solve( nDigits ){
	var base = 10;
	var num = big_num_from_string( '1', base );
	var n1 = big_num_copy( num );
	var n2 = big_num_copy( num );
	for( var i=3; i<10000; i+=1 ){
		n1 = n2;
		n2 = num;
		num = big_num_add( n1, n2, base );
		if( num.length >= nDigits ){
			console.info( big_num_print( num, base ) );
			return i;
		}
	}
}

console.info( solve(3) );
console.info( solve(1000) );

/** 4782
 * 
 * Congratulations, the answer you gave to problem 25 is correct.
 * 
 * You are the 81665th person to have solved this problem.
 * 
 * Nice work, ippo615, you've just advanced to Level 1 .
 * 64621 members (15.58%) have made it this far.
 * 
 * You have earned 1 new award:
 * 
 *     The Journey Begins: Progress to Level 1 by solving twenty-five
 *     problems
 *
 */
