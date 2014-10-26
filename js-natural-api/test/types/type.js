describe('Type', function() {
	describe( 'Basic Functionality', function(){
		it('returns the same string when no parser is specified', function(){
			var t = new Type();
			assert( t.parse('Hello') === 'Hello', 'Failed to use default parsing' );
		});
		it('jsonifies the data when no printer is specified', function(){
			var t = new Type();
			var data = t.parse('Hello');
			assert( t.print(data) === '"Hello"', 'Failed to use default printing' );
		});
		it('uses the parser when no check function is specified', function(){
			var t = new Type();
			assert( t.is('Hello') === true, 'Failed to use default checker' );
		});
		it('works with a custom parse function', function(){
			var integer = new Type(function( str ){
				return parseInt( str, 10 );
			});
			var result = integer.parse( '32' );
			assert( result === 32, 'Failed to use the custom parse function' );
		});
		it('works with a custom print function', function(){
			var integer = new Type(function( str ){
				return parseInt( str, 10 );
			}, function( data ){
				return ''+data+' (int)';
			});
			var data = integer.parse( '32' );
			var result = integer.print( data );
			assert( result === '32 (int)', 'Failed to use the custom print function' );
		});
		it('works with a custom check function', function(){
			var integer = new Type(function( str ){
				return parseInt( str, 10 );
			}, function( data ){
				return ''+data+' (int)';
			}, function( str ){
				return /\d+/.test( str );
			});

			var result = integer.is( '32' );
			assert( result === true, 'Failed to see the input is of this type' );

			var result = integer.is( 'abcd' );
			assert( result === false, 'Failed to see the input is not of this type' );
		});
	});
});