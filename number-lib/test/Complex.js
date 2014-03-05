describe('Complex', function() {
	describe( 'Basic Functionality', function(){
		it('can be converted to a string', function(){
			var real = new Complex( new SysNumber(1), new SysNumber(0) );
			assert( real.print() === '1', 'Failed to print a real number' );

			var imaginary = new Complex( new SysNumber(0), new SysNumber(1) );
			assert( imaginary.print() === '0+j1', 'Failed to print an imaginary number' );

			var complex = new Complex( new SysNumber(2), new SysNumber(3) );
			assert( complex.print() === '2+j3', 'Failed to print a complex number' );
			assert( complex.print({imaginarySymbol:'i'}) === '2+i3', 'Failed to print a complex number with a custom symbol' );
		});
		it('can be copied', function(){
			var x = new Complex( new SysNumber(2), new SysNumber(3) );
			var y = new Complex( new SysNumber(4), new SysNumber(5) );
			var z = x.copy();
			x.sub(y);
			assert( z.print() === '2+j3' );
			assert( x.print() === '-2-j2' );
			assert( x.isNot(z) === true, 'Failed to copy x' );
		});
		describe('supports several operators', function(){
			it( 'addition (add)', function(){
				var x = new Complex( new SysNumber(1), new SysNumber(2) );
				var y = new Complex( new SysNumber(3), new SysNumber(4) );
				x.add(y);
				assert( x.print() === '4+j6', 'Failed to add' );
			});
			it( 'subtraction (sub)', function(){
				var x = new Complex( new SysNumber(9), new SysNumber(8) );
				var y = new Complex( new SysNumber(7), new SysNumber(6) );
				x.sub(y);
				assert( x.print() === '2+j2', 'Failed to subtract' );
			});
			it( 'multiplication (mul), real*real', function(){
				var x = new Complex( new SysNumber(2), new SysNumber(0) );
				var y = new Complex( new SysNumber(2), new SysNumber(0) );
				x.mul(y);
				assert( x.print() === '4', 'Failed to multiply 2 real numbers' );
			});
			it( 'multiplication (mul), real*imaginary', function(){
				var x = new Complex( new SysNumber(3), new SysNumber(0) );
				var y = new Complex( new SysNumber(0), new SysNumber(4) );
				x.mul(y);
				assert( x.print() === '0+j12', 'Failed to multiply a real and imaginary number' );
			});
			it( 'multiplication (mul), imaginary*imaginary', function(){
				var x = new Complex( new SysNumber(0), new SysNumber(1) );
				var y = new Complex( new SysNumber(0), new SysNumber(5) );
				x.mul(y);
				assert( x.print() === '-5', 'Failed to multiply 2 imaginary numbers');
			});
			it( 'multiplication (mul), complex*complex', function(){
				var x = new Complex( new SysNumber(1), new SysNumber(2) );
				var y = new Complex( new SysNumber(3), new SysNumber(4) );
				x.mul(y);
				assert( x.print() === '-5+j10', 'Failed to multiply 2 complex numbers' );
			});
		});
		describe('operators can be chained', function(){
			it( 'x*y+z', function(){
				var x = new Complex( new SysNumber(1), new SysNumber(0) );
				var y = new Complex( new SysNumber(0), new SysNumber(2) );
				var z = new Complex( new SysNumber(6), new SysNumber(7) );
				x.mul(y).add(z);
				assert( x.print() === '6+j9', 'Failed to chain the operators' );
			});
			it( '(x+y-y+z-z)*z', function(){
				var x = new Complex( new SysNumber(1), new SysNumber(0) );
				var y = new Complex( new SysNumber(0), new SysNumber(2) );
				var z = new Complex( new SysNumber(6), new SysNumber(7) );
				x.add(y).sub(y).add(z).sub(z).mul(z);
				assert( x.print() === '6+j7', 'Failed to chain the operators' );
			});
		});
		describe('has logic functions', function(){
			it( 'equal to (isSame)', function(){
				var a = new Complex( new SysNumber( 100 ), new SysNumber( 888 ) );
				var b = new Complex( new SysNumber( 222 ), new SysNumber( 333 ) );
				var x = new Complex( new SysNumber( 999 ), new SysNumber( 888 ) );
				var y = new Complex( new SysNumber( 999 ), new SysNumber( 100 ) ) ;
				var z = new Complex( new SysNumber( 999 ), new SysNumber( 100 ) ) ;
				assert( a.isSame(x) === false );
				assert( a.isSame(b) === false );
				assert( x.isSame(y) === false );
				assert( z.isSame(y) === true );
			});
			it( 'not equal to (isNot)', function(){
				var a = new Complex( new SysNumber( 100 ), new SysNumber( 888 ) );
				var b = new Complex( new SysNumber( 222 ), new SysNumber( 333 ) );
				var x = new Complex( new SysNumber( 999 ), new SysNumber( 888 ) );
				var y = new Complex( new SysNumber( 999 ), new SysNumber( 100 ) ) ;
				var z = new Complex( new SysNumber( 999 ), new SysNumber( 100 ) ) ;
				assert( a.isNot(x) === true );
				assert( a.isNot(b) === true );
				assert( x.isNot(y) === true );
				assert( z.isNot(y) === false );
			});
		});
	});
	describe( 'Special Functionality', function(){
		describe('has operators', function(){
			it( 'differentiation (dif)', function(){
				var x = new Complex( new SysNumber( 12 ), new SysNumber( 3 ) );
				x.dif();
				assert( x.print() === '0' );
			});
			it( 'division (div)', function(){
				var x = new Complex( new SysNumber(4), new SysNumber(6) );
				var y = new Complex( new SysNumber(1), new SysNumber(1) );
				x.div(y);
				assert( x.print() === '5+j1' );
			});
			/* Think about how to conert to current real/imag type (ie SysNum)
			 * for magnitude and phase calculation.
			it( 'exponentiation (pow)', function(){
				var x = new SysNumber( 4 );
				var y = new SysNumber( 3 );
				x.pow(y);
				assert( x.print() === '64' );
			});
			it( 'make positive (pos)', function(){
				var x = new SysNumber( -4 );
				x.pos();
				assert( x.print() === '4' );
			});
			it( 'make negative (neg)', function(){
				var x = new SysNumber( 7 );
				x.neg();
				assert( x.print() === '-7' );
			});
			it( 'absolute value (abs)', function(){
				var x = new SysNumber( -5 );
				x.abs();
				assert( x.print() === '5' );
			});
			*/
		});
	});
});

