describe('Matrix', function() {
	describe( 'Basic Functionality', function(){
		it('can be converted to a string', function(){
			var x = new Matrix([
				[ N(1), N(2), N(3) ],
				[ N(4), N(5), N(6) ],
				[ N(7), N(8), N(9) ]
			]);
			assert( x.print() === '[[1,2,3]\n [4,5,6]\n [7,8,9]]' );
		});
		it('can be copied', function(){
			var x = new Matrix([
				[ N(1), N(2), N(3) ],
				[ N(4), N(5), N(6) ],
				[ N(7), N(8), N(9) ]
			]);
			var y = x.copy();
			assert( y.print() === '[[1,2,3]\n [4,5,6]\n [7,8,9]]' );
		});
		describe('supports several operators', function(){
			describe( 'addition (add)', function(){
				it( 'when x has the same number of elements as y', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					var y = new Matrix([
						[ N(9), N(8), N(7) ],
						[ N(6), N(5), N(4) ],
						[ N(3), N(2), N(1) ]
					]);
					x.add(y);
					assert( x.print() === '[[10,10,10]\n [10,10,10]\n [10,10,10]]' );
				});
				it( 'when x has more elements than y', function(){
					var x = new Matrix([
						[ N(1), N(2), N(10) ],
						[ N(4), N(5), N(10) ],
						[ N(10), N(10), N(10) ]
					]);
					var y = new Matrix([
						[ N(9), N(8) ],
						[ N(6), N(5) ]
					]);
					x.add(y);
					assert( x.print() === '[[10,10,10]\n [10,10,10]\n [10,10,10]]' );
				});
				it( 'when x has fewer elements as y', function(){
					var x = new Matrix([
						[ N(1), N(2) ],
						[ N(4), N(5) ]
					]);
					var y = new Matrix([
						[ N(9), N(8), N(10) ],
						[ N(6), N(5), N(10) ],
						[ N(10), N(10), N(10) ]
					]);
					x.add(y);
					assert( x.print() === '[[10,10,10]\n [10,10,10]\n [10,10,10]]' );
				});
			});
			describe( 'subtraction (sub)', function(){
				it( 'when x has the same number of elements as y', function(){
					var x = new Matrix([
						[ N(9), N(8), N(7) ],
						[ N(6), N(5), N(4) ],
						[ N(3), N(2), N(1) ]
					]);
					var y = new Matrix([
						[ N(9), N(8), N(7) ],
						[ N(6), N(5), N(4) ],
						[ N(3), N(2), N(1) ]
					]);
					x.sub(y);
					assert( x.print() === '[[0,0,0]\n [0,0,0]\n [0,0,0]]' );
				});
				it( 'when x has more elements than y', function(){
					var x = new Matrix([
						[ N(9), N(8), N(1) ],
						[ N(6), N(5), N(1) ],
						[ N(1), N(1), N(1) ]
					]);
					var y = new Matrix([
						[ N(9), N(8) ],
						[ N(6), N(5) ]
					]);
					x.sub(y);
					assert( x.print() === '[[0,0,1]\n [0,0,1]\n [1,1,1]]' );
				});
				it( 'when x has fewer elements as y', function(){
					var x = new Matrix([
						[ N(1), N(2) ],
						[ N(4), N(5) ]
					]);
					var y = new Matrix([
						[ N(1), N(2), N(1) ],
						[ N(4), N(5), N(1) ],
						[ N(1), N(1), N(1) ]
					]);
					x.sub(y);
					assert( x.print() === '[[0,0,-1]\n [0,0,-1]\n [-1,-1,-1]]' );
				});
			});
			it( 'multiplication (mul)');
		});
		describe('operators can be chained', function(){
			it( 'x*y+z');
			it( '(x+y-y+z-z)*z');
		});
		describe('has logic functions', function(){
			describe( 'equal to (isSame)', function(){
				it( 'when they are identical', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					var y = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					assert( x.isSame(y) === true );
				});
				it( 'y has different number of rows than x', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					var y = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ]
					]);
					assert( x.isSame(y) === false );
				});
				it( 'y has different number of columns than x', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					var y = new Matrix([
						[ N(1), N(2) ],
						[ N(4), N(5) ],
						[ N(7), N(8) ]
					]);
					assert( x.isSame(y) === false );
				});
			});
			it( 'not equal to (isNot)', function(){
				var x = new Matrix([
					[ N(1), N(2), N(3) ],
					[ N(4), N(5), N(6) ],
					[ N(7), N(8), N(9) ]
				]);
				var y = new Matrix([
					[ N(9), N(6), N(3) ],
					[ N(8), N(5), N(2) ],
					[ N(7), N(4), N(1) ]
				]);
				assert( x.isNot(y) === true );
			});
		});
	});
	describe( 'Special Functionality', function(){
		describe('has operators', function(){
			// For inversion I need to make an identity matrix (with 0's and 1's)
			// How can i define 1 in terms of the operators I have available?
			// with: x.div(x) but `div` isn't defined for everything
			// Can I do it in terms of addition/subtraction
			it('can be inverted (inv)');
			it('can be psuedo-inverted (psu)');
			it('can compute the determinant (det)');
			it('can be transposed (transpose)');
			it('can compute the trace (trace)');
			it( 'can be resized (resize) and filled with 0\'s by default', function(){
				var x = new Matrix([
					[ N(1) ]
				]);
				x.resize( {
					nRows: 3,
					nCols: 3
				} );
				assert( x.print() === '[[1,0,0]\n [0,0,0]\n [0,0,0]]' );
			});
			it( 'can be resized (resize) and filled with anything', function(){
				var x = new Matrix([
					[ N(5) ]
				]);
				x.resize( {
					nRows: 3,
					nCols: 3,
					fill: N(1)
				} );
				assert( x.print() === '[[5,1,1]\n [1,1,1]\n [1,1,1]]' );
			});
		});
	});
});	

