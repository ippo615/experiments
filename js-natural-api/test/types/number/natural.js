describe('Natural Type', function() {
	var name_type = 'a natural number';
	it('Converts strings to integers', function(){
		var example = '12';

		var result = Types.Numbers.Natural.is( example );
		assert( result === true, 'Failed to identify "'+example+'" as '+name_type );

		var result = Types.Numbers.Natural.parse( example );
		assert( result === 12, 'Failed to convert "'+example+'" to '+name_type );
	});
	it('Supports an optional plus sign', function(){
		var example = '+123';

		var result = Types.Numbers.Natural.is( example );
		assert( result === true, 'Failed to identify "'+example+'" as '+name_type );

		var result = Types.Numbers.Natural.parse( example );
		assert( result === 123, 'Failed to convert "'+example+'" to '+name_type);
	});
	it('Rejects negative numbers', function(){
		var example = '-456';

		var result = Types.Numbers.Natural.is( example );
		assert( result === false, 'Failed to reject "'+example+'" as '+name_type );

	});
	it('Rejects fractions/decimals', function(){
		var example = '0.01';

		var result = Types.Numbers.Natural.is( example );
		assert( result === false, 'Failed to reject "'+example+'" as '+name_type );
	});

});