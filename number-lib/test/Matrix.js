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
		it('can be created with a conversion function', function(){
			var x = new Matrix([
				[ 1, 2, 3 ],
				[ 4, 5, 6 ],
				[ 7, 8, 9 ]
			], N);
			var y = x.copy();
			assert( y.print() === '[[1,2,3]\n [4,5,6]\n [7,8,9]]' );
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
		it('can be set to zero (the additive identity)', function(){
			var x = new Matrix([
				[ N(1), N(2), N(3) ],
				[ N(4), N(5), N(6) ],
				[ N(7), N(8), N(9) ]
			]);
			x.zero();
			assert( x.print() === '[[0,0,0]\n [0,0,0]\n [0,0,0]]' );
			var y = new Matrix([
				[ N(1), N(2), N(3) ],
				[ N(4), N(5), N(6) ],
				[ N(7), N(8), N(9) ]
			]);
			assert( y.isSame( y.copy().add(x) ) === true );
		});
		it('can be set to one (the multiplicative identity)', function(){
			var x = new Matrix([
				[ N(1), N(2), N(3) ],
				[ N(4), N(5), N(6) ],
				[ N(7), N(8), N(9) ]
			]);
			x.one();
			assert( x.print() === '[[1,0,0]\n [0,1,0]\n [0,0,1]]' );
			var y = new Matrix([
				[ N(1), N(2), N(3) ],
				[ N(4), N(5), N(6) ],
				[ N(7), N(8), N(9) ]
			]);
			assert( y.isSame( y.copy().mul(x) ) === true );
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
			describe( 'multiplication (mul)', function(){
				it( 'can multiply square matricies', function(){
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
					x.mul(y);
					// Cant do this one in my head:
					// 0,0 -> 1*1 + 2*4 + 3*7 =  1+ 8+21 =  30
					// 0,1 -> 1*2 + 2*5 + 3*8 =  2+10+24 =  36
					// 0,2 -> 1*3 + 2*6 + 3*9 =  3+12+27 =  42
					// 1,0 -> 4*1 + 5*4 + 6*7 =  4+20+42 =  66
					// 1,1 -> 4*2 + 5*5 + 6*8 =  8+25+48 =  81
					// 1,2 -> 4*3 + 5*6 + 6*9 = 12+30+54 =  96
					// 2,0 -> 7*1 + 8*4 + 9*7 =  7+32+63 = 102
					// 2,1 -> 7*2 + 8*5 + 9*8 = 14+40+72 = 126
					// 2,2 -> 7*3 + 8*6 + 9*9 = 21+48+81 = 150
					assert( x.print() === '[[30,36,42]\n [66,81,96]\n [102,126,150]]' );
				});
				it( 'can multiply non-square matricies', function(){
					// Note: x width must equal y height for this to work
					// in other words the number of columns in x must equal
					// the number of rows in y
					var x = new Matrix([
						[ N(1), N(2), N(3) ]
					]);
					var y = new Matrix([
						[ N(1), N(2), ],
						[ N(4), N(5), ],
						[ N(7), N(8), ]
					]);
					x.mul(y);
					assert( x.print() === '[[30,36]]' );
				});
			});
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
			describe('can be inverted (inv)', function(){
				it( 'the inverse of the identity is the identity', function(){
					var x = new Matrix([
						[ N(1), N(0), N(0) ],
						[ N(0), N(1), N(0) ],
						[ N(0), N(0), N(1) ]
					]);
					x.inv();
					assert( x.print() === '[[1,0,0]\n [0,1,0]\n [0,0,1]]' );
				});
				it( 'here is another inverse', function(){
					var x = new Matrix([
						[ N(1), N(3), N(3) ],
						[ N(1), N(4), N(3) ],
						[ N(1), N(3), N(4) ]
					]);
					x.inv();
					assert( x.print() === '[[7,-3,-3]\n [-1,1,0]\n [-1,0,1]]' );
				});
			});
			describe( 'can be converted to row reduced eschelon form (rref)', function(){
				it( 'example-1 4x3' , function(){
					var x = new Matrix([
						[ N(2) , N(3), N(-1), N(-11) ],
						[ N(1) , N(2), N(-1), N(-4) ],
						[ N(-2), N(0), N(-3), N(22) ]
					]);
					x.rref();
					assert( x.print() === '[[1,0,0,-8]\n [0,1,0,1]\n [0,0,1,-2]]' );
				});
				it( 'example-1 4x3 transposed' , function(){
					var x = new Matrix([
						[ N(2) , N(3), N(-1), N(-11) ],
						[ N(1) , N(2), N(-1), N(-4) ],
						[ N(-2), N(0), N(-3), N(22) ]
					]);
					x.transpose().rref();
					assert( x.print() === '[[1,0,0]\n [0,1,0]\n [0,0,1]\n [0,0,0]]' );
				});
				it( 'example-1 4x3 repeated' , function(){
					var x = new Matrix([
						[ N(2) , N(3), N(-1), N(-11) ],
						[ N(1) , N(2), N(-1), N(-4) ],
						[ N(-2), N(0), N(-3), N(22) ]
					]);
					x.rref().rref().rref();
					assert( x.print() === '[[1,0,0,-8]\n [0,1,0,1]\n [0,0,1,-2]]' );
				});
				it( 'example-2 6x5 (floating point test)' , function(){
					var x = new Matrix([
						[ N(1), N(2),  N(3),  N(4),  N(3),  N(1)  ],
						[ N(2), N(4),  N(6),  N(2),  N(6),  N(2)  ],
						[ N(3), N(6),  N(18), N(9),  N(9),  N(-6) ],
						[ N(4), N(8),  N(12), N(10), N(12), N(4)  ],
						[ N(5), N(10), N(24), N(11), N(15), N(-4) ]
					]);
					x.rref();
					assert( x.print() === '[[1,2,0,0,3,4]\n [0,0,1,0,0,-1]\n [0,0,0,1,0,0]\n [0,0,0,0,0,0]\n [0,0,0,0,0,0]]' );
				});
				it( 'example-3 4x3 (singluar matrix, not invertable)' , function(){
					var x = new Matrix([
						[ N(1), N(1), N(0), N(0) ],
						[ N(1), N(1), N(1), N(0) ],
						[ N(0), N(1), N(1), N(1) ]
					]);
					x.rref();
					assert( x.print() === '[[1,0,0,-1]\n [0,1,0,1]\n [0,0,1,0]]' );
				});
				it( 'example-4 2x3 (floating point test)' , function(){
					var x = new Matrix([
						[ N(0), N(1) ],
						[ N(1), N(2) ],
						[ N(0), N(5) ]
					]);
					x.rref();
					assert( x.print() === '[[1,0]\n [0,1]\n [0,0]]' );
				});

			});
			it('can be psuedo-inverted (psu)',function(){
				var x = new Matrix([
					[ N(1), N(0), N(3) ],
					[ N(4), N(5), N(0) ],
				]);
				x.psu();
				assert(x.print() === '[[0,1]\n [0,0]\n [0.3125,-0.25]]');
			});
			describe('can compute the determinant (det)',function(){
				it( 'the determinant of the identity is 1', function(){
					var x = new Matrix([
						[ N(1), N(0), N(0) ],
						[ N(0), N(1), N(0) ],
						[ N(0), N(0), N(1) ]
					]);
					var det = x.det();
					assert( det.print() === '1' );
				});
				it( 'the determinant of another matrix', function(){
					var x = new Matrix([
						[ N(-2), N(2), N(-3) ],
						[ N(-1), N(1), N(3) ],
						[ N(2), N(0), N(-1) ]
					]);
					var det = x.det();
					assert( det.print() === '18' );
				});
			});
			it('can compute the trace (trace)',function(){
				var x = new Matrix([
					[ N(1), N(2), N(3) ],
					[ N(4), N(5), N(6) ],
					[ N(7), N(8), N(9) ]
				]);
				var trace = x.trace();
				assert( trace.print() === '15' );
			});
			it('can be multiplied by something on the left (lmul)',function(){
				var x = new Matrix([
					[ N(1), N(2), N(3) ],
					[ N(4), N(5), N(6) ],
					[ N(7), N(8), N(9) ]
				]);
				var y = new Matrix([
					[ N(1), N(0), N(0) ],
					[ N(0), N(1), N(0) ],
					[ N(0), N(0), N(1) ]
				]);
				// `x.mul(y)` is x*y but `x.lmul(y)` is y*x -- this is
				// important because matrix multiplication is NOT communitive
				x.lmul(y);
				assert( x.print() === '[[1,2,3]\n [4,5,6]\n [7,8,9]]' );
			});
			describe('can be transposed (transpose)', function(){
				it('tranpose a square matrix', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					x.transpose();
					assert( x.print() === '[[1,4,7]\n [2,5,8]\n [3,6,9]]' );
				});
				it('tranpose a tall matrix', function(){
					var x = new Matrix([
						[ N(1), N(2) ],
						[ N(4), N(5) ],
						[ N(7), N(8) ]
					]);
					x.transpose();
					assert( x.print() === '[[1,4,7]\n [2,5,8]]' );
				});
				it('tranpose a wide matrix', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ]
					]);
					x.transpose();
					assert( x.print() === '[[1,4]\n [2,5]\n [3,6]]' );
				});
			});
			describe( 'can be resized (resize)', function(){
				it( 'can be enlarged (resize) and filled with 0\'s by default', function(){
					var x = new Matrix([
						[ N(1) ]
					]);
					x.resize( {
						nRows: 3,
						nCols: 3
					} );
					assert( x.print() === '[[1,0,0]\n [0,0,0]\n [0,0,0]]' );
				});
				it( 'can be enlarged (resize) and filled with anything', function(){
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
				it( 'can be shrunk (resize) horizontally', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					x.resize( {
						nCols: 2
					} );
					assert( x.print() === '[[1,2]\n [4,5]\n [7,8]]' );
				});
				it( 'can be shrunk (resize) vertically', function(){
					var x = new Matrix([
						[ N(1), N(2), N(3) ],
						[ N(4), N(5), N(6) ],
						[ N(7), N(8), N(9) ]
					]);
					x.resize( {
						nRows: 2
					} );
					assert( x.print() === '[[1,2,3]\n [4,5,6]]' );
				});
			});
		});
	});
});	

