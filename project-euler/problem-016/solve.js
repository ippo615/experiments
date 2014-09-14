/** Power digit sum
 * 2**15 = 32768 and the sum of its digits is
 * 3 + 2 + 7 + 6 + 8 = 26.
 * 
 * What is the sum of the digits of the number 2**1000?
 */

// Won't work because we'll lose digits at high powers as floats
function solve_naive_bad( base, power ){
	var digits = (''+Math.pow( base, power )).split('');
	var nDigits = digits.length;
	var sum = 0;
	var d,i;
	for( i=0; i<nDigits; i+=1 ){
		sum += (digits[i]-'0');
	}
	return sum;
}

console.info( solve_naive_bad(2,2) );
console.info( solve_naive_bad(2,15) );
console.info( solve_naive_bad(2,32) );
console.info( solve_naive_bad(2,64) );
console.info( solve_naive_bad(2,70) );

// Slow brute force big nums!

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

function solve_big_num( start, power, base ){
	var number = big_num_from_string(''+start,base);

	// We compute start**power as a big number by repeatedly multiplying
	// we start at 2 because start**0 == 1, start**1 == start
	for( var i=2; i<=power; i+=1 ){
		big_num_mul_little( number, start, base );
		//console.info( '2**'+i+': '+ big_num_print(big_num_mul_little( number, 2, 10 ) ));
	}
	
	// We got the big number so just add the digits
	var sum = 0;
	for( var i=0; i<number.length; i+=1 ){
		sum += number[i];
	}

	return sum;
}

console.info( solve_big_num(2,2,10) );
console.info( solve_big_num(2,15,10) );
console.info( solve_big_num(2,32,10) );
console.info( solve_big_num(2,64,10) );
console.info( solve_big_num(2,70,10) );
console.info( solve_big_num(2,1000,10) );

/** 1366
 * Congratulations, the answer you gave to problem 16 is correct.
 * 
 * You are the 116322nd person to have solved this problem.
 */