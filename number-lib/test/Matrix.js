describe('Matrix', function() {
	describe( 'Basic Functionality', function(){
		it('can be converted to a string');
		it('can be copied');
		describe('supports several operators', function(){
			it( 'addition (add)');
			it( 'subtraction (sub)');
			it( 'multiplication (mul)');
		});
		describe('operators can be chained', function(){
			it( 'x*y+z');
			it( '(x+y-y+z-z)*z');
		});
		describe('has logic functions', function(){
			it( 'equal to (isSame)');
			it( 'not equal to (isNot)');
		});
	});
	describe( 'Special Functionality', function(){
		describe('has operators', function(){
			it( 'division (div)' );
		});
	});
});

