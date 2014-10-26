describe('Integer Type', function() {
	it('Converts strings to integers', function(){
		var example = '12';

		var result = Types.Numbers.Integer.is( example );
		assert( result === true, 'Failed to identify "'+example+'" as an integer' );

		var result = Types.Numbers.Integer.parse( example );
		assert( result === 12, 'Failed to convert "'+example+'" to an integer' );
	});
	it('Supports an optional plus sign', function(){
		var example = '+123';

		var result = Types.Numbers.Integer.is( example );
		assert( result === true, 'Failed to identify "'+example+'" as an integer' );

		var result = Types.Numbers.Integer.parse( example );
		assert( result === 123, 'Failed to convert "'+example+'" to an integer' );
	});
	it('Supports an optional minus sign', function(){
		var example = '-456';

		var result = Types.Numbers.Integer.is( example );
		assert( result === true, 'Failed to identify "'+example+'" as an integer' );

		var result = Types.Numbers.Integer.parse( example );
		assert( result === -456, 'Failed to convert "'+example+'" to an integer' );
	});
	it('Rejects fractions/decimals', function(){
		var example = '0.01';

		var result = Types.Numbers.Integer.is( example );
		assert( result === false, 'Failed to reject "'+example+'" as an integer' );
	});

});