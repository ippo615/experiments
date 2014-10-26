// # Simple Types
// 
// Our first goal is to create an object which can parse a string and
// return a usable data structure. It also should be able to identify
// if a string can correctly be converted/parsed. To help reduce code
// we will let the string testing be optional (devs can override that
// with a custom function if they want to). The parser/converter will
// be used to test string validity for the undefined cases.

var Type = (function(){
	function Type( parse, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, is );
		}
		this.parse = parse;
		if( is ){
			this.is = is;
		}
	}

	Type.prototype.is = function( str ){
		// When no 'is' check is provided we just check that the parser
		// does not raise any errors
		try {
			var result = this.parse( str );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

var TBase10 = Type( function( str ){
	return parseInt( str, 10 );
} );

console.info( TBase10.is('123') );
console.info( TBase10.is('ab123') );
console.info( TBase10.parse('123') );

console.info( parseFloat('1.2e-5') );
console.info( parseFloat('.2e-5') );
console.info( parseFloat('.9') );
console.info( parseFloat('8') );
console.info( parseFloat('9e99') );
console.info( parseFloat('-12.1') );
console.info( parseFloat('+.9e+1') );

// # Separator Parsing
//
// Perhaps things would be faster if we knew how many separators could 
// be found in each type's source string. For example:
// 123 -> 0 separators
// My name is andrew -> 3 separators
// 45 km -> 1 separator
// 1 2 3 4 5 6 7 8 9 ... -> N separators
//
// By having that info we can create 1,2,3...n-word phrases that get
// passed to matching type parsers. For example:
//
//     The building is 25 km tall.
//
// The following would be passed to things that allow 0 separators:
//     ['The', 'building', 'is', '25', 'km', 'tall']
//
// The following would only be passed to things that allow 1 separator:
//     ['The building', 'building is', 'is 25', '25 km', 'km tall']
// 
// The following would only be passed to things that allow 2 separators:
//     [
//         'The building is',
//         'building is 25',
//         'is 25 km',
//         '25 km tall'
//     ]
//

var Type2 = (function(){
	function Type( parse, separators, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, is );
		}
		if( parse ){
			this.parse = parse;
		}
		if( separators ){
			this.separators = separators;
		}
		if( is ){
			this.is = is;
		}
	}

	Type.prototype.parse = function( str ){
		return str;
	};

	Type.prototype.separators = function(){
		return 0;
	};

	Type.prototype.is = function( str ){
		// When no 'is' check is provided we just check that the parser
		// does not raise any errors
		try {
			var result = this.parse( str );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

var Type = Type2;

var TBase10 = Type( function( str ){
	return parseInt( str, 10 );
} );
var TFloat = Type( function( str ){
	return parseFloat( str );
} );

var TNum = Type( function(str){
	if( TBase10.is( str ) ){
		return TBase10.parse( str );
	}
	if( TFloat.is( str ) ){
		return TFloat.parse( str );
	}
} );

var TUnit = Type();

var TNumUnit = Type( function(str){
	var parts = str.split(/\s+/g);
	return {
		number: TNum.parse( parts[0] ),
		unit: TUnit.parse( parts[1] )
	}
}, function(){
	return 1 + TNum.separators() + TUnit.separators();
} );

console.info( TNumUnit.parse( '10 millimeters' ) );
console.info( TNumUnit.parse( '5e-2 km' ) );

// # Separator Moving
//
// Should the type know how to split a string into its parts?
// By not forcing the type to split its input we can separate the phrase
// generating logic from each type. Having a global 'phase maker' could
// be a good idea. Consider the following examples:
//
//     10km
//     10 kilometer
//     10-kilometers
// 
// Those are 3 different strings but they all should be interperted the
// same way. It would be a lot of extra work if each compound type had
// to know how to split data in 3 different ways.
//
// This would require the parser/checker to accept an array of strings
// instead of a single string.
//

var Type3 = (function(){
	function Type( parse, separators, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, is );
		}
		if( parse ){
			this.parse = parse;
		}
		if( separators ){
			this.separators = separators;
		}
		if( is ){
			this.is = is;
		}
	}

	Type.prototype.parse = function( strs ){
		return strs[0];
	};

	Type.prototype.separators = function(){
		return 0;
	};

	Type.prototype.is = function( strs ){
		// When no 'is' check is provided we just check that the parser
		// does not raise any errors
		try {
			var result = this.parse( strs );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

var Type = Type3;

var TBase10 = Type( function( strs ){
	return parseInt( strs[0], 10 );
} );
var TFloat = Type( function( strs ){
	return parseFloat( strs[0] );
} );

var TNum = Type( function(strs){
	if( TBase10.is( strs[0] ) ){
		return TBase10.parse( [strs[0]] );
	}
	if( TFloat.is( strs[0] ) ){
		return TFloat.parse( [strs[0]] );
	}
} );

var TUnit = Type();

var TNumUnit = Type( function( strs ){
	return {
		number: TNum.parse( [strs[0]] ),
		unit: TUnit.parse( [strs[1]] )
	}
}, function(){
	return 1 + TNum.separators() + TUnit.separators();
} );

console.info( TNumUnit.parse( '10 millimeters'.split(' ') ) );
console.info( TNumUnit.parse( '5e-2 km'.split(' ') ) );

// The problem is that this can become error-prone. Consider the example
// below (actual code) where there is the following type heirarchy:
//
//    TNumUnit
//       + TNum
//          + TFloat
//          + TBase10
//       + TUnit
// 
// TNumUnit needs to ensure that it is passing an array to TNum and 
// TUnit; TNum also needs to ensure that it is passing an array to
// TFloat and TBase10. 
// 
// I had to re-write the code 3 times before I got it working as
// expected. Writing `strs[0]` can also obscure nice-looking code.
// Automatically wrapping those functions so they are passed an array
// or a single string may improve the readibility and make it less 
// error prone.

var Type4 = (function(){
	function Type( parse, separators, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, is );
		}
		
		this._parse = null;
		if( parse ){
			this._parse = parse;
		}

		if( separators ){
			this.separators = separators;
		}
		if( is ){
			this.is = is;
		}
	}

	Type.prototype.parse = function( str ){

		// If it only expects a single argument
		// then it should be coded to accept only 1
		// string (not an array of strings).
		var isPassedString = (typeof str === 'string' || typeof str === 'object');
		var isExpectingString = (this.separators() === 0);

		// Convert the passed argument to the appropriate type
		// For top two cases do nothing: we got what we wanted
		// For bottom 2 convert to the desired input
		// if( isExpectingArray && isPassedArray ){ }
		// if( isExpectingString && isPassedString ){ }
		var arg = str;
		if( isExpectingString && ! isPassedString ){
			arg = str[0];
		}
		if( ! isExpectingString && isPassedString ){
			// there was a problem with the word-splitting or phrasing
			throw new Exception( ' Was expecting an array but got a string ' );
		}

		// If we have a parse function available use it
		// otherwise just return the expected data
		if( this._parse ){
			return this._parse( arg );
		}
		return arg;

	};

	Type.prototype.separators = function(){
		return 0;
	};

	Type.prototype.is = function( str ){
		// When no 'is' check is provided we just check that the parser
		// does not raise any errors
		try {
			var result = this.parse( str );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

var Type = Type4;

var TBase10 = Type( function( str ){
	return parseInt( str, 10 );
} );
var TFloat = Type( function( str ){
	return parseFloat( str );
} );

var TNum = Type( function(str){
	if( TBase10.is( str ) ){
		return TBase10.parse( str );
	}
	if( TFloat.is( str ) ){
		return TFloat.parse( str );
	}
} );

var TUnit = Type();

var TNumUnit = Type( function( strs ){
	return {
		number: TNum.parse( strs[0] ),
		unit: TUnit.parse( strs[1] )
	}
}, function(){
	return 1 + TNum.separators() + TUnit.separators();
} );

console.info( TNumUnit.parse( '10 millimeters'.split(' ') ) );
console.info( TNumUnit.parse( '5e-2 km'.split(' ') ) );
console.info( TNumUnit.parse( '5e-2 km north'.split(' ') ) );

// Maybe we don't care about separators, we can just use introspection
// to determine the arguments to the parsing function and wrap stuff
// appropriately.

var Type5 = (function(){

	function get_arguments( func ){
		var text = func.toString();
		// Match the 1st parentical expression.
		// Then take that match and remove all the spaces in it - js identifiers
		// cannot have spaces in them so it's easier to remove all the spaces.
		// Then split that text at the commas.
		return text.match(/\(([^)]*)\)/)[1].replace(/\s+/g,'').split(',');
	}

	function Type( parse, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, is );
		}
		
		this._parse = null;
		this.parse_arguments = ['str'];
		if( parse ){
			this._parse = parse;
			this.parse_arguments = get_arguments( this._parse );
		}

		if( is ){
			this.is = is;
		}
	}

	Type.prototype.parse = function( str ){

		// If it only expects a single argument
		// then it should be coded to accept only 1
		// string (not an array of strings).
		var isPassedString = (typeof str === 'string');
		var isExpectingString = (this.separators() === 0);

		// Convert the passed argument to the appropriate type
		// For top two cases do nothing: we got what we wanted
		// For bottom 2 convert to the desired input
		// if( isExpectingArray && isPassedArray ){ }
		// if( isExpectingString && isPassedString ){ }
		var arg = str;
		if( isExpectingString && ! isPassedString ){
			arg = str[0];
		}
		if( ! isExpectingString && isPassedString ){
			// there was a problem with the word-splitting or phrasing
			throw new Error( ' Was expecting an array but got a string ' );
		}

		// If we have a parse function available use it
		// otherwise just return the expected data
		if( this._parse ){
			if( typeof arg === 'string' ){
				return this._parse.apply( this, [arg] );
			}else{
				return this._parse.apply( this, arg );
			}
		}
		return arg;

	};

	Type.prototype.separators = function(){
		return this.parse_arguments.length-1;
	};

	Type.prototype.is = function( str ){
		// When no 'is' check is provided we just check that the parser
		// does not raise any errors
		try {
			var result = this.parse( str );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

var Type = Type5;

var TBase10 = Type( function( str ){
	return parseInt( str, 10 );
} );
var TFloat = Type( function( str ){
	return parseFloat( str );
} );

var TNum = Type( function(str){
	if( TBase10.is( str ) ){
		return TBase10.parse( str );
	}
	if( TFloat.is( str ) ){
		return TFloat.parse( str );
	}
} );

var TUnit = Type();

var TNumUnit = Type( function( num, unit ){
	return {
		number: TNum.parse( num ),
		unit: TUnit.parse( unit )
	}
});

//console.info( typeof '1 2' );
//console.info( typeof ['1','2'][0] );
//console.info( typeof '1 2'.split(' ')[0] );
//console.info( typeof '1 2'.split(' ') );
//console.info( typeof ['1','2'] );

console.info( TNumUnit.parse( '10 millimeters'.split(' ') ) );
console.info( TNumUnit.parse( '5e-2 km'.split(' ') ) );
console.info( TNumUnit.parse( '5e-2 km north'.split(' ') ) );
console.info( TNumUnit.parse( ['5', 'mm'] ) );

// Maybe you don't want to pass the arguments as an array (maybe you do)
// or maybe you want to pass them as an object, for example:
//
//     parse( num, unit )
//     parse( [num, unit] )
//     parse( {num: , unit:} )
//
// Wow, I'm really off on a tangent, how did I get here? I think it
// started with not wanting to force the developer to split a string
// into sub-types.
// 

var Type6 = (function(){

	function Type( parse, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, is );
		}
		
		this._parse = null;
		this.parse_arguments = ['str'];
		if( parse ){
			this._parse = parse;
			this.parse_arguments = get_arguments( this._parse );
		}

		if( is ){
			this.is = is;
		}
	}

	Type.prototype.parse = function( str ){

		// If it only expects a single argument
		// then it should be coded to accept only 1
		// string (not an array of strings).
		var isPassedString = (typeof str === 'string');
		var isExpectingString = (this.separators() === 0);

		// Convert the passed argument to the appropriate type
		// For top two cases do nothing: we got what we wanted
		// For bottom 2 convert to the desired input
		// if( isExpectingArray && isPassedArray ){ }
		// if( isExpectingString && isPassedString ){ }
		var arg = str;
		if( isExpectingString && ! isPassedString ){
			arg = str[0];
		}
		if( ! isExpectingString && isPassedString ){
			// there was a problem with the word-splitting or phrasing
			throw new Error( ' Was expecting an array but got a string ' );
		}

		// If we have a parse function available use it
		// otherwise just return the expected data
		if( this._parse ){
			if( typeof arg === 'string' ){
				return this._parse.apply( this, [arg] );
			}else{
				return this._parse.apply( this, arg );
			}
		}
		return arg;

	};

	Type.prototype.separators = function(){
		return this.parse_arguments.length-1;
	};

	Type.prototype.is = function( str ){
		// When no 'is' check is provided we just check that the parser
		// does not raise any errors
		try {
			var result = this.parse( str );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

function generalize_function( func ){
	function get_arguments( func ){
		var text = func.toString();
		// Match the 1st parentical expression.
		// Then take that match and remove all the spaces in it - js identifiers
		// cannot have spaces in them so it's easier to remove all the spaces.
		// Then split that text at the commas.
		return text.match(/\(([^)]*)\)/)[1].replace(/\s+/g,'').split(',');
	}
	function object_to_arguments( args, object, strict ){
		var results = [];
		var i, l=args.length;
		for( i=0; i<l; i+=1 ){
			if( object.hasOwnProperty( args[i] ) ){
				results.push( object[args[i]] );
			}else if( strict ){
				throw new Error( 'Required argument `'+args[i]+'` is missing' );
			}
		}
		return results;
	}
	return (function(func){
		var arg_names = get_arguments( func );
		var f = function(){
			var args = arguments;
			if( arguments.length === 1 ){
				args = object_to_arguments( arg_names, arguments[0] );
			}
			return func.apply( null, args );
		};
		return f;
	})(func);
}

var add = generalize_function( function(x,y){
	return x+y;
} );
console.info( add( 10,15 ) );
console.info( add( {
	x:10,
	y:15
}) );

// Getting back on track... It will be much easier to work with if every
// type has the same interface. That means every type parse/is function
// will accept only 1 argument (a string). To have more flexible parsing
// a separate parsing/splitting library can be used. 

var Type7 = (function(){
	function Type( parse, is ){
		if( ! (this instanceof Type) ){
			return new Type( parse, is );
		}

		if( parse ){
			this.parse = parse;
		}
		if( is ){
			this.is = is;
		}
	}

	Type.prototype.parse = function( str ){
		return str;
	};

	Type.prototype.is = function( str ){
		// When no 'is' check is provided we just check that the parser
		// does not raise any errors
		try {
			var result = this.parse( str );
		}catch( e ){
			return false;
		}

		return true;
	};

	return Type;
})();

var Type = Type7;

var TBase10 = Type( function( str ){
	return parseInt( str, 10 );
} );
var TFloat = Type( function( str ){
	return parseFloat( str );
} );

var TNum = Type( function(str){
	if( TBase10.is( str ) ){
		return TBase10.parse( str );
	}
	if( TFloat.is( str ) ){
		return TFloat.parse( str );
	}
} );

var TUnit = Type();

var TNumUnit = Type( function(str){
	var parts = str.split(/\s+/g);
	return {
		number: TNum.parse( parts[0] ),
		unit: TUnit.parse( parts[1] )
	};
});

console.info( TNumUnit.parse( '10 millimeters' ) );
console.info( TNumUnit.parse( '5e-2 km' ) );

// I've focused on string-to-data conversions but it is very important
// to have data-to-string conversions. The print method will handle 
// that.

var Type8 = (function(){
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

var Type = Type8;

var TBase10 = Type( function( str ){
	return parseInt( str, 10 );
} );
var TFloat = Type( function( str ){
	return parseFloat( str );
} );

var TNum = Type( function(str){
	if( TBase10.is( str ) ){
		return TBase10.parse( str );
	}
	if( TFloat.is( str ) ){
		return TFloat.parse( str );
	}
} );

var TUnit = Type();

var TNumUnit = Type( function(str){
	var parts = str.split(/\s+/g);
	return {
		number: TNum.parse( parts[0] ),
		unit: TUnit.parse( parts[1] )
	};
},
function(data){
	return ''+data.number + ' ' + data.unit;
});

console.info( TNumUnit.print(TNumUnit.parse( '10 millimeters' )) );
console.info( TNumUnit.print(TNumUnit.parse( '5e-2 km' )) );

// Perhaps I should bind these to the results that they return.
// For example, allowing the returned results to have a .print
// method would be very useful. 
//
// Even better, I should let the Type `mixin` a list of methods.
//

// Took me a while to figure this out, the following shows how to extend
// the Number prototype.
Number.prototype.add = function(y){
	return this+y;
}

var x = 5;
console.info( x.add(4) );

// Simple JS Caching Mixin

var asPoint = (function(){
	function offset(dx,dy){
		if( dx !== undefined ){ this.x += dx; }
		if( dy !== undefined ){ this.y += dy; }
		return this;
	}
	function scale(sx,sy){
		if( sx !== undefined ){ this.x *= sx; }
		if( sy !== undefined ){ this.y *= sy; }
		return this;
	}
	return function(){
		this.offset = offset;
		this.scale = scale;
	};
})();

function Point( x, y ){
	this.x = x;
	this.y = y;
}
asPoint.call( Point.prototype );

var p1 = new Point(0,0);
console.info( p1.offset( 10, 2 ) );

// Here's a completely different idea
// The type is entirely defined by 1 function. That function is
// resonsible for converting the input string to an *encapsulated*
// data type. For example:
//
//     Integer( '123' ) -> { data: 123, _source: '123', _type: Integer }
//
// That result's prototype will have class methods or should the data
// member have the class methods?
// 

function Integer( str ){
	if( ! (this instanceof Integer ) ){
		return new Integer( str );
	}

	// Raise errors here if you want
	if( ! /^[+-]?\d+$/.test( str ) ){
		throw new Error( '"'+str+'" is not an integer' );
	}

	this.data = parseInt(str,10);
}
Integer.prototype.add = function( other ){
	this.data += other.data;
	return this;
};
Integer.prototype.sub = function( other ){
	this.data -= other.data;
	return this;
};

console.info( Integer('2').add( Integer('4') ) );

function Text( str ){
	if( ! (this instanceof Text ) ){
		return new Text( str );
	}	

	this.data = str;
}

function DenominateNumber( str ){
	if( ! (this instanceof DenominateNumber ) ){
		return new DenominateNumber( str );
	}

	var parts = str.split(' ');
	this.data = {
		number: Integer( parts[0] ),
		unit: Text( parts[1] )
	};
}

console.info( DenominateNumber( '5 apples' ) );
console.info( DenominateNumber( '8 oranges' ) );

// I kinda like that approach but they will not use `data` to hold
// the data - the data will be attached directly to this as below:

function Integer( str ){
	if( ! (this instanceof Integer ) ){
		return new Integer( str );
	}

	// Raise errors here if you want
	if( ! /^[+-]?\d+$/.test( str ) ){
		throw new Error( '"'+str+'" is not an integer' );
	}

	this.value = parseInt(str,10);
}
Integer.prototype.add = function( other ){
	this.value += other.value;
	return this;
};
Integer.prototype.sub = function( other ){
	this.value -= other.value;
	return this;
};

console.info( Integer('2').add( Integer('4') ) );

function Text( str ){
	if( ! (this instanceof Text ) ){
		return new Text( str );
	}	

	this.data = str;
}
Text.prototype.equals = function( other ){
	return this.data === other.data;
};
Text.prototype.toString = function(){
	return this.data;
};

function DenominateNumber( str ){
	if( ! (this instanceof DenominateNumber ) ){
		return new DenominateNumber( str );
	}

	var parts = str.split(' ');
	this.number = Integer( parts[0] );
	this.unit = Text( parts[1] );
}

DenominateNumber.prototype.add = function( other ){
	if( ! other instanceof this.constructor ){
		throw new Error( 'Type mis-match' );
	}
	
	if( ! this.unit.equals(other.unit) ){
		throw new Error( 'Different units: "'+this.unit+'" and "'+other.unit+'"' );
	}

	this.number.add( other.number );
	return this;
}

console.info( DenominateNumber( '5 apples' ) );
console.info( DenominateNumber( '8 oranges' ) );
console.info( DenominateNumber( '5 apples' ).add( DenominateNumber( '5 apples' ) ) );
// console.info( DenominateNumber( '5 apples' ).add( DenominateNumber( '5 oranges' ) ) );

// Unfortunately, JavaScript does not allow operator overloading so we
// need to code all those operators as methods (+-/*><= etc). 
// Here is python's list of those special operators, I'll follow their
// guide for naming stuff and determining what's important.
// http://www.rafekettler.com/magicmethods.html

// More stuff to think about:
//
// - easy type combining; (ie an abstract number can be an integer, float,
//   irrational number, etc. do I want explicitly code how they are merged
//   or just specifiy the merge order and automatically handle the rest)
//
// - easy word combining; Consider categories (ie colors: red,green,blue,
//   yellow, etc...) they are made of several words and are just strings.
//   Should I make a easy class that takes a list of strings and converts
//   to a new category class?
//
// - automatic type checking; for all of the methods (ie add) I check
//   that the types of other matches the type of this. Should I create
//   a decorator to handle that automatically? What will I break?
//

