describe('Abstract Number Type', function() {
	var name_type = 'a general number';

	function should_convert( str, num ){
		var result = Types.Numbers.Abstract.is( str );
		assert( result === true, 'Failed to identify "'+str+'" as '+name_type );
		var result = Types.Numbers.Abstract.parse( str );
		assert( result === num, 'Failed to convert "'+str+'" to '+name_type );
	}

	function should_reject( str ){
		var result = Types.Numbers.Abstract.is( str );
		assert( result === false, 'Failed to reject "'+str+'" as '+name_type );
	}

	it('Converts integer strings to floats', function(){
		should_convert( '12', 12 );
		should_convert( '+12', 12 );
		should_convert( '-12', -12 );
	});
	it('Can contain leading and/or trailing 0s', function(){
		should_convert( '0001', 1 );
		should_convert( '00.00', 0 );
		should_convert( '1.0000', 1 );
	});
	it('Can start or end with a decimal dot', function(){
		should_convert( '.9', 0.9 );
		should_convert( '8.', 8.0 );
	});
	it('Can contain an optional leading sign', function(){
		should_convert( '-2', -2 );
		should_convert( '+2', 2 );
		should_convert( '2', 2 );
	});
	it('Can be written in `E notation`', function(){
		should_convert( '5e4', 50000 );
		should_convert( '5E4', 50000 );
		should_convert( '1.2e3', 1200 );
		should_convert( '-1.2e3', -1200 );
	});
	it('Can have a sign in `E notation`', function(){
		should_convert( '5e+4', 50000 );
		should_convert( '5E-4', 0.0005 );
		should_convert( '1.2e+3', 1200 );
		should_convert( '-1.2e-3', -0.001200 );
	});
	it('Can support combinations of the above', function(){
		should_convert( '+9.9e9', 9900000000 );
		should_convert( '-9.9e9', -9900000000 );
		should_convert( '+9.9E9', 9900000000 );
		should_convert( '-9.9E9', -9900000000 );

		should_convert( '+.1e2', 10 );
		should_convert( '-.1e2', -10 );
		should_convert( '.1e2', 10 );

		should_convert( '+.1e+2', 10 );
		should_convert( '-.1e+2', -10 );
		should_convert( '.1e+2', 10 );

		should_convert( '+.1e-2', 0.0010 );
		should_convert( '-.1e-2', -0.0010 );
		should_convert( '.1e-2', 0.0010 );

		should_convert( '+3.e2', 300 );
		should_convert( '-3.e2', -300 );
		should_convert( '3.e2', 300 );

		should_convert( '+3.e+2', 300 );
		should_convert( '-3.e+2', -300 );
		should_convert( '3.e+2', 300 );

		should_convert( '+3.e-2', 0.03 );
		should_convert( '-3.e-2', -0.03 );
		should_convert( '3.e-2', 0.03 );

		should_convert( '+.1E2', 10 );
		should_convert( '-.1E2', -10 );
		should_convert( '.1E2', 10 );

		should_convert( '+.1E+2', 10 );
		should_convert( '-.1E+2', -10 );
		should_convert( '.1E+2', 10 );

		should_convert( '+.1E-2', 0.0010 );
		should_convert( '-.1E-2', -0.0010 );
		should_convert( '.1E-2', 0.0010 );

		should_convert( '+3.E2', 300 );
		should_convert( '-3.E2', -300 );
		should_convert( '3.E2', 300 );

		should_convert( '+3.E+2', 300 );
		should_convert( '-3.E+2', -300 );
		should_convert( '3.E+2', 300 );

		should_convert( '+3.E-2', 0.03 );
		should_convert( '-3.E-2', -0.03 );
		should_convert( '3.E-2', 0.03 );
	});

});