describe('Polynomial', function() {
	describe( 'Basic Functionality', function(){
		it('can be set to zero (the additive identity)', function(){
			var x = new Polynomial([ N(2), N(3), N(4) ]);
			x.zero();
			assert( x.print() === '' );
			var y = new Vector([ N(5), N(6), N(7) ]);
			assert( y.isSame( y.copy().add(x) ) === true );
		});
		it('can be set to one (the multiplicative identity)', function(){
			var x = new Polynomial([ N(2), N(3), N(4) ]);
			x.one();
			assert( x.print() === '(1)' );
			var y = new Vector([ N(5), N(6), N(7) ]);
			assert( y.isSame( y.copy().mul(x) ) === true );
		});
		describe('can be converted to a string',function(){
			it('without any options',function(){
				var x = new Polynomial( [
					N(1),
					N(2),
					N(3)
				] );
				assert( x.print() === '(1)+(2)*x+(3)*(x^2)' );
			});
			it('hides 0s by default',function(){
				var x = new Polynomial( [
					N(2),
					N(0),
					N(0),
					N(4)
				] );
				assert( x.print() === '(2)+(4)*(x^3)' );
			});
			it('can explicitly show everything (polyExplicit=true)',function(){
				var x = new Polynomial( [
					N(9),
					N(0),
					N(2),
					N(1),
					N(0),
				] );
				var polyPrintout = x.print({
					polyExplicit: true
				});
				assert( polyPrintout === '(9)*(x^0)+(0)*(x^1)+(2)*(x^2)+(1)*(x^3)+(0)*(x^4)' );
			});
			it('can use a symbol besides x (polySymbol=\'t\')',function(){
				var x = new Polynomial( [
					N(1),
					N(2),
					N(3)
				] );
				var polyPrintout = x.print({
					polySymbol: 't'
				});
				assert( polyPrintout === '(1)+(2)*t+(3)*(t^2)' );
			});
			it('can use different bracketing (polyParen=\'[]\')',function(){
				var x = new Polynomial( [
					N(1),
					N(2),
					N(3)
				] );

				var polyPrintout = x.print({
					polyParen: ' '
				});
				assert( polyPrintout === ' 1+ 2*x+ 3* x^2' );

				var polyPrintout2 = x.print({
					polyParen: '[]'
				});
				assert( polyPrintout2 === '[1]+[2]*x+[3]*[x^2]' );
			});
		});
		it('can be copied',function(){
			var x = new Polynomial( [
				N(1),
				N(2),
				N(3)
			] );
			var y = new Polynomial( [
				N(4),
				N(5),
				N(6)
			] );
			z = x.copy();
			assert( x.isSame(z) );
			x.add(y);
			assert( x.isNot(z) );
		});
		describe('supports several operators', function(){
			describe( 'addition (add)', function(){
				it('supports same order polynomials', function(){
					var x = new Polynomial( [
						N(1),
						N(2),
						N(3)
					] );
					var y = new Polynomial( [
						N(4),
						N(5),
						N(6)
					] );
					x.add(y);
					assert( x.print() === '(5)+(7)*x+(9)*(x^2)' );
				});
				it('supports adding a higher order polynomial to a lower order polynomial', function(){
					var x = new Polynomial( [
						N(1)
					] );
					var y = new Polynomial( [
						N(4),
						N(5),
						N(5)
					] );
					x.add(y);
					assert( x.print() === '(5)+(5)*x+(5)*(x^2)' );
				});
				it('supports adding a lower order polynomial to a higher order polynomial', function(){
					var x = new Polynomial( [
						N(1),
						N(2),
						N(3)
					] );
					var y = new Polynomial( [
						N(2)
					] );
					x.add(y);
					assert( x.print() === '(3)+(2)*x+(3)*(x^2)' );
				});
			});
			describe( 'subtraction (sub)', function(){
				it('supports same order polynomials', function(){
					var x = new Polynomial( [
						N(6),
						N(5),
						N(4)
					] );
					var y = new Polynomial( [
						N(3),
						N(2),
						N(1)
					] );
					x.sub(y);
					assert( x.print() === '(3)+(3)*x+(3)*(x^2)' );
				});
				it('supports subtracting a higher order polynomial from a lower order polynomial', function(){
					var x = new Polynomial( [
						N(1)
					] );
					var y = new Polynomial( [
						N(2),
						N(1),
						N(1)
					] );
					x.sub(y);
					assert( x.print() === '(-1)+(-1)*x+(-1)*(x^2)' );
				});
				it('supports subtracting a lower order polynomial from a higher order polynomial', function(){
					var x = new Polynomial( [
						N(3),
						N(2),
						N(3)
					] );
					var y = new Polynomial( [
						N(2)
					] );
					x.sub(y);
					assert( x.print() === '(1)+(2)*x+(3)*(x^2)' );
				});
			});
			describe( 'multiplication (mul)', function(){
				it('supports same order polynomials easy', function(){
					var x = new Polynomial( [
						N(0),
						N(1),
						N(0)
					] );
					var y = new Polynomial( [
						N(0),
						N(1),
						N(0)
					] );
					x.mul(y);
					assert( x.print() === '(1)*(x^2)' );
				});
				it('supports same order polynomials hard', function(){
					var x = new Polynomial( [
						N(1),
						N(2),
						N(3)
					] );
					var y = new Polynomial( [
						N(4),
						N(5),
						N(6)
					] );
					x.mul(y);
					assert( x.print() === '(4)+(13)*x+(28)*(x^2)+(27)*(x^3)+(18)*(x^4)' );
				});
				it('supports multiplying a higher order polynomial with a lower order polynomial', function(){
					var x = new Polynomial( [
						N(1)
					] );
					var y = new Polynomial( [
						N(2),
						N(1),
						N(1)
					] );
					x.mul(y);
					assert( x.print() === '(2)+(1)*x+(1)*(x^2)' );
				});
				it('supports multiplying a lower order polynomial with a higher order polynomial', function(){
					var x = new Polynomial( [
						N(3),
						N(2),
						N(3)
					] );
					var y = new Polynomial( [
						N(2)
					] );
					x.mul(y);
					assert( x.print() === '(6)+(4)*x+(6)*(x^2)' );
				});
			});
		});
		describe('operators can be chained', function(){
			it( 'x*y+z', function(){
				var x = new Polynomial( [
					N(9),
					N(7),
					N(5)
				] );
				var y = new Polynomial( [
					N(1)
				] );
				var z = new Polynomial( [
					N(2)
				] );
				x.mul(y).add(z);
				assert( x.print() === '(11)+(7)*x+(5)*(x^2)' );
			});
			it( '(x+y-y+z-z)*z', function(){
				var x = new Polynomial( [
					N(9),
					N(7),
					N(5)
				] );
				var y = new Polynomial( [
					N(1)
				] );
				var z = new Polynomial( [
					N(2)
				] );
				x.add(y).sub(y).add(z).sub(z).mul(z);
				assert( x.print() === '(18)+(14)*x+(10)*(x^2)' );
			});
		});
		describe('has logic functions', function(){
			describe('equal to (isSame)', function(){
				it( 'can compare to a polynomial of the same order', function(){
					var x = new Polynomial( [
						N(9),
						N(8),
						N(7)
					] );
					var y = new Polynomial( [
						N(9),
						N(8),
						N(7)
					] );
					assert( x.isSame(y) === true);
				});
				it( 'can compare to a polynomial of higher order', function(){
					var x = new Polynomial( [
						N(1),
						N(2)
					] );
					var y = new Polynomial( [
						N(1),
						N(2),
						N(0),
						N(0)
					] );
					assert( x.isSame(y) === true);
				});
				it( 'can compare to a polynomial of lower order', function(){
					var x = new Polynomial( [
						N(1),
						N(2),
						N(0),
						N(0)
					] );
					var y = new Polynomial( [
						N(1),
						N(2)

					] );
					assert( x.isSame(y) === true);
				});
			});
			describe( 'not equal to (isNot)', function(){
				it( 'can compare to a polynomial of the same order', function(){
					var x = new Polynomial( [
						N(1),
						N(2),
						N(3)
					] );
					var y = new Polynomial( [
						N(9),
						N(8),
						N(7)
					] );
					assert( x.isNot(y) === true);
				});
				it( 'can compare to a polynomial of a higher order', function(){
					var x = new Polynomial( [
						N(1),
						N(2)
					] );
					var y = new Polynomial( [
						N(1),
						N(2),
						N(0),
						N(9)
					] );
					assert( x.isNot(y) === true);
				});
				it( 'can compare to a polynomial of a lower order', function(){
					var x = new Polynomial( [
						N(1),
						N(2),
						N(0),
						N(9)
					] );
					var y = new Polynomial( [
						N(1),
						N(2)

					] );
					assert( x.isNot(y) === true);
				});
			});
		});
	});
	describe( 'Special Functionality', function(){
		describe('has operators', function(){
			it( 'can evaluated for a specific value of x (eval)', function(){
				var x = new Polynomial( [
					N(1),
					N(2),
					N(3),
					N(4)
				] );
				var result = x.eval(N(1));
				assert( result.print() === '10' );
			});
			it( 'can evaluated for a specific value of x (eval)', function(){
				var x = new Polynomial( [
					N(1), // 1*(-2)^0 =  1
					N(2), // 2*(-2)^1 = -4 ->  -3
					N(3), // 3*(-2)^2 = 12 ->   9
					N(4)  // 4*(-2)^3 =-32 -> -23 <- answer
				] );
				var result = x.eval(N(-2));
				assert( result.print() === '-23' );
			});
			it( 'differentiation (dif)', function(){
				var x = new Polynomial( [
					N(1), // (d/dx) 1*(x)^0 =  0
					N(2), // (d/dx) 2*(x)^1 =  2
					N(3), // (d/dx) 3*(x)^2 = 6x
					N(4)  // (d/dx) 4*(x)^3 =12x^2
				] );
				x.dif();
				assert( x.print() === '(2)+(6)*x+(12)*(x^2)' );
			});
			it( 'scalar multiplication (sca) aka element-by-element multiplication', function(){
				var x = new Polynomial( [
					N(1),
					N(2),
					N(3),
					N(4)
				] );
				x.sca( N(2) );
				assert( x.print() === '(2)+(4)*x+(6)*(x^2)+(8)*(x^3)' );
			});
		});
	});
});

