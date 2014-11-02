
function Command( options ){
	// format, action, description 
	if( ! (this instanceof Command) ){
		return new Command( options );
	}

	this.canonical = options.format;
	this.action = options.action;
	this.description = options.description;

	this.formats = [];
	this.regexps = [];
	this.could_regexps = [];

	// For extracting variable from the format
	this._prefix = options.hasOwnProperty('prefix')?options.prefix:'\\$';
	this._postfix = options.hasOwnProperty('postfix')?options.postfix:'\\b';
	this.should_guess_types = options.hasOwnProperty('should_guess_types')?options.should_guess_types:true;

	this.add_format( this.canonical );
	this.add_format( this.format_short( this.canonical ) );
	this.add_format( this.format_long_under( this.canonical ) );

	this.parameters_by_index = this.get_parameters();

}

Command.prototype.add_format = function( format ){
	this.formats.push( format );
	this.regexps.push( this.format_to_regexp( format, this._prefix, this._postfix ) );
	this.could_regexps.push( this.format_to_could_regexp( format, this._prefix, this._postfix ) );
};
Command.prototype.format_short = function( format ){
	var lower = format.toLowerCase();
	var args = lower.split('$');

	for( var i=0, l=args.length; i<l; i+=1 ){
		args[i] = args[i].replace(/\s+$/,'').replace(/^\s+/,'');
	}
	var functionName = args[0];

	var namedParts = functionName.split(' ');

	var shortName = '';
	for( var i=0, l=namedParts.length; i<l; i+=1 ){ 
		shortName += namedParts[i].charAt(0);
	}	

	var parts = [ shortName ];
	parts.push.apply( parts, args.slice(1) );

	return parts.join( ' $' );
};
Command.prototype.format_long_under = function( format ){
	var lower = format.toLowerCase();
	var args = lower.split('$');
	for( var i=0, l=args.length; i<l; i+=1 ){
		args[i] = args[i].replace(/\s+$/,'').replace(/^\s+/,'');
	}
	var functionName = args[0];

	var parts = [ functionName.replace(/\s+/g, '_') ];
	parts.push.apply( parts, args.slice(1) );

	return parts.join( ' $' );
};
Command.prototype.format_to_regexp = function( format, prefix, postfix ){
	return new RegExp(
		'^'+format.replace(
				new RegExp(prefix+'(.+?)'+postfix,'g'),
				'(.+?)'
			)
			.replace( /\s+/g, '\\s+' )+'$',
		'ig'
	);
};
Command.prototype.format_to_could_regexp = function( format, prefix, postfix ){
	return new RegExp(
		'^'+format.replace(
				new RegExp(prefix+'(.+?)'+postfix,'g'),
				'(.+?)?'
			)
			.replace( /\s+/g, '\\s*' )+'$',
		'ig'
	);
};
Command.prototype._match_prefix = function( text, prefix, postfix ){
	var template = new RegExp( prefix+'(.+?)'+postfix, 'g' );
	var matches;
	var results = [];
	while( matches = template.exec(text) ){
		results.push( matches[1] );
	}
	return results;
};
Command.prototype.get_parameters = function( text ){
	if( text ){
		return this.match( text );
	}
	return this._match_prefix( this.canonical, this._prefix, this._postfix );
};
Command.prototype.match = function( text ){
	var nParms = this.parameters_by_index.length;
	var results = [];
	for( var i=0, l=this.formats.length; i<l; i+=1 ){
		var m = new RegExp(this.regexps[i]).exec(text);
		if( m ){
			for( var j=0; j<nParms; j+=1 ){
				results.push( m[j+1] );
			}
			return results;
		}
	}
	return results;
};
function firstCharactersMatch( needle, haystack ){
	var nNeedle = needle.length;
	var nHaystack = haystack.length;
	for( var i=0; i<nNeedle; i+=1 ){
		if( needle.charAt( i ) !== haystack.charAt( i ) ){
			return true;
		}
	}
	return false;
}
Command.prototype.could_match = function( text ){
	for( var i=0,l=this.formats.length; i<l; i+=1 ){
		var funcName = this.formats[i].split('$')[0];
		if( firstCharactersMatch( funcName, text ) ){
			return true;
		}
		/*
		if( new RegExp( this.could_regexps[i] ).test(text) ){
			return true;
		}
		*/
	}
	return false;
};
Command.prototype.guess_types = function( values ){
	var results = [];
	for( var i=0, l = values.length; i<l; i+=1 ){
		var v = values[i];
		if( ''+parseFloat( v ) === v ){
			results.push( parseFloat( v ) );
		}else if( ''+parseInt( v, 10 ) === v ){
			results.push( parseInt( v, 10 ) );
		}
	}
	return results;
};
Command.prototype.exec = function( text ){
	var args = this.match( text );
	if( this.should_guess_types ){
		args = this.guess_types( args );
	}
	return this.action.apply(null,args);
};
Command.prototype.toString = function(){
	return this.canonical;
};
console.info( Command({
	format: 'move x $x',
	action: function(x){},
	description: ''
}) );

var c = new Command({
	format: 'move all $x $y $z',
	action: function(x,y,z){
		return x+y+z;
	},
	description: '',
	should_guess_types: true
});

console.info( c );
console.info( c.get_parameters() );
console.info( c.match( 'move all 10 10 10' ) );
console.info( c.match( 'ma 10 10 10' ) );
console.info( c.match( 'move_all 10 10 10' ) );
console.info( c.exec( 'move all 10 10 10' ) );
console.info( c.could_match( 'move all 10 10 10' ) );
console.info( c.could_match( 'move all' ) );
console.info( c.could_match( 'ma10 10 10' ) );

module.exports.Command = Command;
