describe('Vector', function() {
	describe( 'Basic Functionality', function(){
		describe('can be converted to a string',function(){
			it('without any options',function(){
				var x = new Vector( [
					new SysNumber(1),
					new SysNumber(2),
					new SysNumber(3)
				] );
				assert( x.print() === '[1, 2, 3]' );
			});
			it('can have custom brackets (vectorBracket=\'{}\')',function(){
				var x = new Vector( [
					new SysNumber(1),
					new SysNumber(2),
					new SysNumber(3),
					new SysNumber(4),
					new SysNumber(5)
				] );
				var printout = x.print({
					vectorBracket: '{}'
				});
				assert( printout === '{1, 2, 3, 4, 5}' );
			});
			it('can use a custom separator (vectorSeparator=\' \')',function(){
				var x = new Vector( [
					new SysNumber(1),
					new SysNumber(2),
					new SysNumber(3)
				] );
				var printout = x.print({
					vectorSeparator: ' '
				});
				assert( printout === '[1 2 3]' );
			});
		});
		it('can be copied',function(){
			var x = new Vector( [
				new SysNumber(1),
				new SysNumber(2),
				new SysNumber(3)
			] );
			var y = new Vector( [
				new SysNumber(4),
				new SysNumber(5),
				new SysNumber(6)
			] );
			z = x.copy();
			assert( x.isSame(z) );
			x.add(y);
			assert( x.isNot(z) );
		});
		describe('supports several operators', function(){
			describe( 'addition (add)', function(){
				it('supports same order Vectors', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3)
					] );
					var y = new Vector( [
						new SysNumber(4),
						new SysNumber(5),
						new SysNumber(6)
					] );
					x.add(y);
					assert( x.print() === '[5, 7, 9]' );
				});
				it('optionally, supports adding a larger vector to a smaller vector', function(){
					var x = new Vector( [
						new SysNumber(1)
					] );
					var y = new Vector( [
						new SysNumber(4),
						new SysNumber(5),
						new SysNumber(5)
					] );
					x.add(y);
					assert( x.print() === '[5, 5, 5]' );
				});
				it('optionally, supports adding smaller vector to a larger vector', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3)
					] );
					var y = new Vector( [
						new SysNumber(2)
					] );
					x.add(y);
					assert( x.print() === '[3, 2, 3]' );
				});
			});
			describe( 'subtraction (sub)', function(){
				it('supports same order Vectors', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3)
					] );
					var y = new Vector( [
						new SysNumber(4),
						new SysNumber(5),
						new SysNumber(6)
					] );
					x.sub(y);
					assert( x.print() === '[-3, -3, -3]' );
				});
				it('optionally, supports subtracting a larger vector from a smaller vector', function(){
					var x = new Vector( [
						new SysNumber(1)
					] );
					var y = new Vector( [
						new SysNumber(4),
						new SysNumber(5),
						new SysNumber(5)
					] );
					x.sub(y);
					assert( x.print() === '[-3, -5, -5]' );
				});
				it('optionally, supports subtracting a smaller vector from a larger vector', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3)
					] );
					var y = new Vector( [
						new SysNumber(1)
					] );
					x.sub(y);
					assert( x.print() === '[0, 2, 3]' );
				});
			});



			describe( 'multiplication (mul)', function(){
				it('supports same order Vectors easy', function(){
					var x = new Vector( [
						new SysNumber(0),
						new SysNumber(1),
						new SysNumber(0)
					] );
					var y = new Vector( [
						new SysNumber(0),
						new SysNumber(1),
						new SysNumber(0)
					] );
					x.mul(y);
					assert( x.print() === '(1)*(x^2)' );
				});
				it('supports same order Vectors hard', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3)
					] );
					var y = new Vector( [
						new SysNumber(4),
						new SysNumber(5),
						new SysNumber(6)
					] );
					x.mul(y);
					assert( x.print() === '(4)+(13)*x+(28)*(x^2)+(27)*(x^3)+(18)*(x^4)' );
				});
				it('supports multiplying a higher order Vector with a lower order Vector', function(){
					var x = new Vector( [
						new SysNumber(1)
					] );
					var y = new Vector( [
						new SysNumber(2),
						new SysNumber(1),
						new SysNumber(1)
					] );
					x.mul(y);
					assert( x.print() === '(2)+(1)*x+(1)*(x^2)' );
				});
				it('supports multiplying a lower order Vector with a higher order Vector', function(){
					var x = new Vector( [
						new SysNumber(3),
						new SysNumber(2),
						new SysNumber(3)
					] );
					var y = new Vector( [
						new SysNumber(2)
					] );
					x.mul(y);
					assert( x.print() === '(6)+(4)*x+(6)*(x^2)' );
				});
			});
		});
		describe('operators can be chained', function(){
			it( 'x*y+z', function(){
				var x = new Vector( [
					new SysNumber(9),
					new SysNumber(7),
					new SysNumber(5)
				] );
				var y = new Vector( [
					new SysNumber(1)
				] );
				var z = new Vector( [
					new SysNumber(2)
				] );
				x.mul(y).add(z);
				assert( x.print() === '(11)+(7)*x+(5)*(x^2)' );
			});
			it( '(x+y-y+z-z)*z', function(){
				var x = new Vector( [
					new SysNumber(9),
					new SysNumber(7),
					new SysNumber(5)
				] );
				var y = new Vector( [
					new SysNumber(1)
				] );
				var z = new Vector( [
					new SysNumber(2)
				] );
				x.add(y).sub(y).add(z).sub(z).mul(z);
				assert( x.print() === '(18)+(14)*x+(10)*(x^2)' );
			});
		});
		describe('has logic functions', function(){
			describe('equal to (isSame)', function(){
				it( 'can compare to a Vector of the same order', function(){
					var x = new Vector( [
						new SysNumber(9),
						new SysNumber(8),
						new SysNumber(7)
					] );
					var y = new Vector( [
						new SysNumber(9),
						new SysNumber(8),
						new SysNumber(7)
					] );
					assert( x.isSame(y) === true);
				});
				it( 'can compare to a Vector of higher order', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2)
					] );
					var y = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(0),
						new SysNumber(0)
					] );
					assert( x.isSame(y) === true);
				});
				it( 'can compare to a Vector of lower order', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(0),
						new SysNumber(0)
					] );
					var y = new Vector( [
						new SysNumber(1),
						new SysNumber(2)

					] );
					assert( x.isSame(y) === true);
				});
			});
			describe( 'not equal to (isNot)', function(){
				it( 'can compare to a Vector of the same order', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3)
					] );
					var y = new Vector( [
						new SysNumber(9),
						new SysNumber(8),
						new SysNumber(7)
					] );
					assert( x.isNot(y) === true);
				});
				it( 'can compare to a Vector of a higher order', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2)
					] );
					var y = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(0),
						new SysNumber(9)
					] );
					assert( x.isNot(y) === true);
				});
				it( 'can compare to a Vector of a lower order', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(0),
						new SysNumber(9)
					] );
					var y = new Vector( [
						new SysNumber(1),
						new SysNumber(2)

					] );
					assert( x.isNot(y) === true);
				});
			});
		});
	});
	describe( 'Special Functionality', function(){
		describe('has operators', function(){
			it( 'scalar multiplication (sca) aka element-by-element multiplication', function(){
				var x = new Vector( [
					new SysNumber(9),
					new SysNumber(8),
					new SysNumber(7),
					new SysNumber(6)
				] );
				x.sca( new SysNumber(2) );
				assert( x.print() === '[18, 16, 14, 12]' );
			});
			describe( 'dot product (dot) aka inner product', function(){
				it( 'works on vectors of the same size', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3),
						new SysNumber(4)
					] );
					var y = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3),
						new SysNumber(4)
					] );
					x.dot( y );
					assert( x.print() === '[1, 4, 9, 16]' );
				});
				it( 'optionally, multiplies a smaller vector with a bigger vector', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2)
					] );
					var y = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3),
						new SysNumber(4)
					] );
					x.dot( y );
					assert( x.print() === '[1, 4]' );
				});
				it( 'optionally, multiplies a smaller vector with a bigger vector', function(){
					var x = new Vector( [
						new SysNumber(1),
						new SysNumber(2),
						new SysNumber(3),
						new SysNumber(4)
					] );
					var y = new Vector( [
						new SysNumber(1),
						new SysNumber(2)
					] );
					x.dot( y );
					assert( x.print() === '[1, 4, 0, 0]' );
				});
			});
			it( 'differentiation (dif)', function(){
				var x = new Vector( [
					new SysNumber(1),
					new SysNumber(2),
					new SysNumber(3),
					new SysNumber(4)
				] );
				x.dif();
				assert( x.print() === '[0, 0, 0, 0]' );
			});
		});
	});
});

