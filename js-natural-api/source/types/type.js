
var Type = (function(){
	function Type( parse, print, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, print, is );
		}

		if( parse ){
			this.parse = parse;
		}
		if( print ){
			this.print = print;
		}
		if( is ){
			this.is = is;
		}
	}

	// Default parsing returns the string
	Type.prototype.parse = function( str ){
		return str;
	};

	// Default printing just jsonifies the data
	Type.prototype.print = function( data ){
		return JSON.stringify(data);
	};

	// When no 'is' check is provided we just check that the parser
	// does not raise any errors
	Type.prototype.is = function( str ){
		try {
			var result = this.parse( str );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

var Types = {};
