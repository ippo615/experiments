describe('SysNumber', function() {
	describe( 'Basic Functionality', function(){
		it('can be converted to a string', function(){
			var x = new SysNumber( 89 );
			assert( x.print() === '89' );
		});
		it('can be copied', function(){
			var x = new SysNumber( 77 );
			var y = new SysNumber( 55 );
			var z = x.copy();
			x.sub(y);
			assert( z.print() === '77' );
			assert( x.print() === '22' );
			assert( x.isNot(z) === true );
		});
		it('can be set to zero (the additive identity)', function(){
			var x = new SysNumber(5);
			x.zero();
			assert( x.print() === '0' );
			var y = new SysNumber(3);
			assert( y.isSame( y.copy().add(x) ) === true );
		});
		it('can be set to one (the multiplicative identity)', function(){
			var x = new SysNumber(5);
			x.one();
			assert( x.print() === '1' );
			var y = new SysNumber(3);
			assert( y.isSame( y.copy().mul(x) ) === true );
		});
		describe('supports several operators', function(){
			it( 'addition (add)', function(){
				var x = new SysNumber( 13 );
				var y = new SysNumber( 78 );
				x.add(y);
				assert( x.print() === '91' );
			});
			it( 'subtraction (sub)', function(){
				var x = new SysNumber( 55 );
				var y = new SysNumber( 33 );
				x.sub(y);
				assert( x.print() === '22' );
			});
			it( 'multiplication (mul)', function(){
				var x = new SysNumber( 3 );
				var y = new SysNumber( 4 );
				x.mul(y);
				assert( x.print() === '12' );
			});
		});
		describe('operators can be chained', function(){
			it( 'x*y+z', function(){
				var x = new SysNumber( 1 );
				var y = new SysNumber( 2 );
				var z = new SysNumber( 3 );
				x.mul(y).add(z);
				assert( x.print() === '5' );
			});
			it( '(x+y-y+z-z)*z/z', function(){
				var x = new SysNumber( 4 );
				var y = new SysNumber( 5 );
				var z = new SysNumber( 6 );
				x.add(y).sub(y).add(z).sub(z).mul(z).div(z);
				assert( x.print() === '4' );
			});
		});
		describe('has logic functions', function(){
			it( 'equal to (isSame)', function(){
				var x = new SysNumber( 999 );
				var y = new SysNumber( 100 );
				var z = new SysNumber( 100 );
				assert( x.isSame(y) === false );
				assert( z.isSame(y) === true );
			});
			it( 'not equal to (isNot)', function(){
				var x = new SysNumber( 999 );
				var y = new SysNumber( 100 );
				var z = new SysNumber( 100 );
				assert( x.isNot(y) === true );
				assert( z.isNot(y) === false );
			});
		});
	});
	describe( 'Special Functionality', function(){
		it('can be created with a built-in number', function(){
			var x = new SysNumber( 5 );
			assert( x );
		});
		describe('supports several operators', function(){
			it( 'differentiation (dif)', function(){
				var x = new SysNumber( 12 );
				x.dif();
				assert( x.print() === '0' );
			});
			it( 'division (div)', function(){
				var x = new SysNumber( 18 );
				var y = new SysNumber( 6 );
				x.div(y);
				assert( x.print() === '3' );
			});
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
		});
		describe('has logic functions', function(){
			it( 'greater than (isMore)', function(){
				var x = new SysNumber( 999 );
				var y = new SysNumber( 100 );
				assert( x.isMore(y) === true );
				assert( y.isMore(x) === false );
			});
			it( 'less than (isLess)', function(){
				var x = new SysNumber( 999 );
				var y = new SysNumber( 100 );
				assert( x.isLess(y) === false );
				assert( y.isLess(x) === true );
			});
			it( 'is positive (isPos)', function(){
				var x = new SysNumber( 1 );
				var y = new SysNumber( -1 );
				assert( x.isPos() === true );
				assert( y.isPos() === false );
			});
			it( 'is negative (isNeg)', function(){
				var x = new SysNumber( 1 );
				var y = new SysNumber( -1 );
				assert( x.isNeg() === false );
				assert( y.isNeg() === true );
			});
		});
	});
});

