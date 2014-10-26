
Types.Numbers.Float = Type( function( str ){
	return parseFloat( str );
}, function( data ){
	return ''+data;
}, function( str ){
	var trailingDot = /[-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?/;
	var leadingDot = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
	var regexStr = '^('+ trailingDot.source +')|('+ leadingDot.source +')$';
	return (new RegExp(regexStr)).test(str);
} );
