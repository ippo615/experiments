var actions = [];

function create_action( template, code ){
	var func;
	if( typeof code === 'string' ){
		eval( 'func = function(){ return '+code+'; };' );
	}else{
		func = code;
	}

	
}

create_action( '$x is less than $y', 'x < y' );

create_action( '$x is greater than $y', 'x > y' );
create_action( '$x is more than $y', 'x > y' );
create_action( '$x is above $y', 'x > y' );


console.info( 'hello'.split('\n') );

function Action( template, code, options ){
	this.template = template;
	this.code = code;

	options = options || {};
	this._prefix = options.hasOwnProperty('prefix')?options.prefix:'\\$';
	this._postfix = options.hasOwnProperty('postfix')?options.postfix:'\\b';
	this.should_guess_types = options.hasOwnProperty('should_guess_types')?options.should_guess_types:true;

	//this.parameters_by_name = {};
	this.parameters_by_index = this.get_parameters();
	this.run = this.get_function();
}
Action.prototype.get_function = function(){
	if( typeof this.code === 'string' ){
		var func;
		eval( 'func = function('+this.parameters_by_index.join(',')+'){ return '+this.code+'; };' );
		return func;
	}else{
		return this.code;
	}
};
Action.prototype.get_parameters = function( text ){
	if( text ){
		return this.match( text );
	}
	return match_prefix( this.template, this._prefix, this._postfix );
};
Action.prototype.get_regexp = function(){
	return new RegExp(
		'^'+this.template.replace(
				new RegExp(this._prefix+'(.+?)'+this._postfix,'g'),
				'(.+?)'
			)
			.replace( /\s+/g, '\\s+' )+'$',
		'ig'
	);
};
Action.prototype.match = function( text ){
	var nParms = this.parameters_by_index.length;
	var m = this.get_regexp().exec(text);
	var results = [];
	if( m ){
		for( var i=0; i<nParms; i+=1 ){
			results.push( m[i+1] );
		}
	}
	return results;
};
Action.prototype.guess_types = function( values ){
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
Action.prototype.exec = function( text ){
	var args = this.match( text );
	if( this.should_guess_types ){
		args = this.guess_types( args );
	}
	return this.run.apply(null,args);
};

function match_prefix( text, prefix, postfix ){
	var template = new RegExp( prefix+'(.+?)'+postfix, 'g' );
	var matches;
	var results = [];
	while( matches = template.exec(text) ){
		results.push( matches[1] );
	}
	return results;
}

var a = new Action( '$x is greater than $y', 'x > y' );
console.info( a.get_parameters() );
console.info( a.get_parameters('10 is greater than 17') );
console.info( a.match('10 is greater than 17') );
console.info( a.exec('10 is greater than 17') );
console.info( a.match('12 is greater than 3') );
console.info( a.exec('12 is greater than 3') );


var a = new Action( '$x is less than $y', function(x,y){
	return x < y;
} );
console.info( a.get_parameters() );
console.info( a.exec('10 is less than 17') );
console.info( a.exec('4 is less than -4') );

console.info( a.match('10 is greater than 17') );
