#!/usr/bin/nodejs

function SymbolChar( char ){
	this.symbol = char;
	this.data = [char];
}
Symbol.prototype.isEqualStrict = function( other ){
	return this.symbol === other.symbol;
};
Symbol.prototype.isEqualLoose = function( other ){
	if( this.isEqualStrict(other) ){
		return true;
	}
	for( var i=0, l=this.data.length; i<l; i+=1 ){
		if( this.data[i].isEqualLoose( other ) ){
			return true;
		}
	}
	return false;
}

function Symbol(symbol){
	this.symbol = symbol;
	this.data = [symbol];
}
Symbol.prototype.isEqualStrict = function( other ){
	return this.symbol === other.symbol;
};
Symbol.prototype.isEqualLoose = function( other ){
	if( this.isEqualStrict(other) ){
		return true;
	}
	for( var i=0, l=this.data.length; i<l; i+=1 ){
		if( this.data[i].isEqualLoose( other ) ){
			return true;
		}
	}
	return false;
}
Symbol.prototype.link = function( symbol ){
	this.data.push( link );
}
Symbol.prototype.toString = function(){
	return this.symbol;
}

function make_symbols( symbols ){
	var converted = [];
	for( var i=0, l=symbols.length; i<l; i+=1 ){
		converted.push( new Symbol( symbols[i] ) );
	}
	return converted;
}

var alphabet = make_symbols( 'abcdefghijklmnopqrstuvwxyz'.split('') );
console.info( alphabet[0].isEqualLoose(alphabet[0]) );
console.info( alphabet[0].isEqualLoose(alphabet[1]) );
console.info( alphabet[0].isEqualStrict(alphabet[0]) );
console.info( alphabet[0].isEqualStrict(alphabet[1]) );

console.info( ''+new Symbol('hello world') );
