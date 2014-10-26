
Types.Numbers.Integer = Type( function( str ){
	return parseInt( str, 10 );
}, function( data ){
	return ''+data;
}, function( str ){
	return (/^[+-]?[0-9]+$/).test(str);
} );
