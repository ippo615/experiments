describe('Symbol', function() {
	describe( 'Basic Functionality', function(){
		it('can be converted to a string',function(){
			var x = new Symbol('x',[]);
			assert( x.print() === 'x' );
		});
		it('can be copied',function(){
			var x = new Symbol('x',[]);
			var y = x.copy();
			assert( x.isSame(y) === true );
			x.add(new Symbol('z',[]));
			assert( x.isNot(y) === true );
		});
		it('can be set to zero (the additive identity)', function(){
			var x = new Symbol('x',[]);
			x.zero();
			assert( x.print() === '0' );
			//var y = new Symbol('y',[]);
			//assert( y.isSame( y.copy().add(x) ) === true );
		});
		it('can be set to one (the multiplicative identity)', function(){
			var x = new Symbol('x',[]);
			x.one();
			assert( x.print() === '1' );
			//var y = new Symbol('y',[]);
			//assert( y.isSame( y.copy().mul(x) ) === true );
		});
		describe('supports several operators', function(){
			it( 'addition (add)', function(){
				var x = new Symbol('x',[]);
				var y = new Symbol('y',[]);
				assert( x.add(y).print() === '(x+y)' );
			});
			it( 'subtraction (sub)', function(){
				var x = new Symbol('x',[]);
				var y = new Symbol('y',[]);
				assert( x.sub(y).print() === '(x-y)' );
			});
			it( 'multiplication (mul)',function(){
				var x = new Symbol('x',[]);
				var y = new Symbol('y',[]);
				assert( x.mul(y).print() === '(x*y)' );
			});
		});
		describe('operators can be chained', function(){
			it( 'x*y+z');
			it( '(x+y-y+z-z)*z');
		});
		describe('has logic functions', function(){
			it( 'equal to (isSame)', function(){
				var x = new Symbol('x',[]);
				var y = new Symbol('y',[]);
				var z = new Symbol('z',[]);
				x.add(y).sub(z).mul(y).mul(z);
				var a = new Symbol('a',[]);
				var b = new Symbol('b',[]);
				var c = new Symbol('c',[]);
				a.add(b).sub(c).mul(b).mul(c);
				assert( x.isSame(a) === true );
			});
			it( 'not equal to (isNot)', function(){
				var x = new Symbol('x',[]);
				var y = new Symbol('y',[]);
				var z = new Symbol('z',[]);
				x.add(y).sub(z).mul(y).mul(z);
				var a = new Symbol('a',[]);
				var b = new Symbol('b',[]);
				var c = new Symbol('c',[]);
				a.add(b).sub(c).mul(b).mul(c);
				assert( x.isNot(b) === true );
			});
		});
	});
	describe( 'Special Functionality', function(){
		describe('can be evaluated (eval)', function(){
			it( 'at a specific value', function(){
				var x = new Symbol('x');
				var y = N(5);
				x.add(y);
				assert( x.eval({
					x: N(3)
				}).print() === '8' );
			});
			it( 'with different symbols', function(){
				var x = new Symbol('x');
				var y = new Symbol('y');
				x.add(y);

				assert( x.eval({
					x: N(3),
					y: N(7)
				}).print() === '10' );
			});
		});
	});
});

