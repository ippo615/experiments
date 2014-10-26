
// The most general form of a number

Types.Numbers.Abstract = (function(){
	var possibleTypes = [];
	for( var t in Types.Numbers ){
		if( Types.Numbers.hasOwnProperty(t) ){
			possibleTypes.push( Types.Numbers[t] );
		}
	}

	var Abstract = Type(function( str ){
		var t, i, l = possibleTypes.length;
		for( i=0; i<l; i+=1 ){
			t = possibleTypes[i];
			if( t.is( str ) ){
				return t.parse( str );
			}
		}
	}, function( data ){
		return ''+data;
	}, function( str ){
		var t, i, l = possibleTypes.length;
		for( i=0; i<l; i+=1 ){
			t = possibleTypes[i];
			if( t.is( str ) ){
				return true
			}
		}
		return false
	} );

	return Abstract;

})();
