var _cube = {
	parameters: [ {
			name: 'width',
			type: 'float',
			initial: 1.23,
			caption: 'Width of the thingy',
			description: 'A really long description that can span multiple lines'
		}, {
			name: 'height',
			type: 'float',
			initial: 0.9,
			caption: 'Height of the thingy',
			description: 'A really long description that can span multiple lines'
		}, {
			name: 'depth',
			type: 'int',
			initial: 1,
			caption: 'Depth of the thingy',
			description: 'A really long description that can span multiple lines'
		}, {
			name: 'quantity',
			type: 'choice',
			initial: 1,
			values: [1,2,3,4],
			captions: ['1','2','3','4'],
			caption: '',
			description: ''
		}
	],
	action: function(parms){
		
		
	}
};

function Cube(){
	parseOptions( _cube, arguments );
}

function parseArgumentsObject(definition,args,strict){
	var nDef = definition.length;
	var nArgs = args.length;

	if( strict ){
		if( nArgs.length !== nDef.length ){
			throw new Error("Arguments ("+args+") do not match the definition: "+definition);
		}
	}

	var result = {};
	for( var i=0; i<nDef; i+=1 ){
		var parm = definition[i];

		if( args[parm.name] ){
			result[parm.name] = args[parm.name];
		}else{
			result[parm.name] = definition[i].initial;
		}
	}

	return result;
}

function parseArgumentsArray(definition,args,strict){
	var nDef = definition.length;
	var nArgs = args.length;

	if( strict ){
		if( nArgs.length !== nDef.length ){
			throw new Error("Arguments ("+args+") do not match the definition: "+definition);
		}
	}

	var result = {};
	for( var i=0; i<nDef; i+=1 ){
		var parm = definition[i];

		if( i < nArgs ){
			result[parm.name] = args[i];
		}else{
			result[parm.name] = definition[i].initial;
		}
	}

	return result;
}

console.info( parseArgumentsArray( _cube.parameters, [ 0.4, 0.5, 1, 2 ] ) );
console.info( parseArgumentsObject( _cube.parameters, {
	width: 0.4, 
	height: 0.5
} ) );
console.info( parseArgumentsArray( _cube.parameters, [] ) );
console.info( parseArgumentsObject( _cube.parameters, [] ) );

function Factory(){

	if ( !(this instanceof Factory) ){
		return new Factory(arguments);
	}

	this.parameters = [];
	this.action = null;

}

Factory.prototype.add_parameter = function( name, type, initial, caption, description ){
	this.parameters.push( {

	} );
}

function Parameter(){}
Parameter.prototype.can_be = function( value ){
	return this.validate( this.coerce(value) );
};
Parameter.prototype.get = function( value ){
	var mod = this.coerce(value);
	if( this.validate( mod ) ){
		return mod;
	}else{
		return this.initial;
	}
}

function ParameterInt( name, initial, caption, description, validate, coerce ){
	if ( !(this instanceof ParameterInt) ){
		return new ParameterInt(name, initial, caption, description, validate, coerce);
	}

	this.name = name;
	this.initial = initial;
	this.caption = caption || '';
	this.description = description || '';
	this.validate = validate || function(x){ return true; };
	this.coerce = coerce || function(x){ return parseInt(''+x,10); };

	return this;
}
ParameterInt.prototype = Parameter.prototype;

function ParameterFloat( name, initial, caption, description, validate, coerce ){
	if ( !(this instanceof ParameterFloat) ){
		return new ParameterFloat(name, initial, caption, description, validate, coerce);
	}

	this.name = name;
	this.initial = initial;
	this.caption = caption || this.name;
	this.description = description || '';
	this.validate = validate || function(x){ return true; };
	this.coerce = coerce || function(x){ return parseFloat(''+x); };

	return this;
}
ParameterFloat.prototype = Parameter.prototype;

var pWidth = ParameterFloat( 'width', 0.5 );
var pHeight = ParameterFloat( 'height', 0.5, 'Height', 'The height of the cube', function(x){
	return x > 0;
} );

console.info( pWidth.can_be( 10 ) );
console.info( pHeight.can_be( -4 ) );
console.info( pHeight.get( -4 ) );
console.info( pHeight.get(2.0) );

function ParameterSet( parameters ){
	if ( !(this instanceof ParameterSet) ){
		return new ParameterSet(parameters);
	}

	this.parameters = [];
	this.values = {};
	var nParms = parameters.length;
	for( var i=0; i<nParms; i+=1 ){
		this.add_parameter( parameters[i] );
	}
	this.defaults();

	return this;
}

ParameterSet.prototype.add_parameter = function( parameter ){
	this.parameters.push( parameter );
	this[parameter.name] = (function(that,parameter){
		return function(x){
			that.values[parameter.name] = parameter.get( x );
			return that;
		}
	})(this,parameter);
};
ParameterSet.prototype.defaults = function(){
	var nParms = this.parameters.length;
	for(var i=0; i<nParms; i+=1 ){
		this.values[ this.parameters[i].name ] = this.parameters[i].initial;
	}
	return this;
};
ParameterSet.prototype.valueArguments = function(){
	var nValues = arguments.length;
	var nParms = this.parameters.length;
	if( nValues > this.parameters.length ){
		throw new Error( 'Too many arguments. Expected '+nParms+ ' ('+this.names()+') but got '+nValues+' ('+arguments+').' );
	}
	for( var i=0; i<nValues; i+=1 ){
		this.values[ this.parameters[i].name ] = arguments[i];
	}
	return this;
};
ParameterSet.prototype.valueArray = function(values){
	var nValues = values.length;
	var nParms = this.parameters.length;
	if( nValues > this.parameters.length ){
		throw new Error( 'Too many arguments. Expected '+nParms+ ' ('+this.names()+') but got '+nValues+' ('+','.join(values)+').' );
	}
	for( var i=0; i<nValues; i+=1 ){
		this.values[ this.parameters[i].name ] = values[i];
	}
	return this;
};
ParameterSet.prototype.valueObject = function(object){
	var nParms = this.parameters.length;
	for( var i=0; i<nParms; i+=1 ){
		var n = this.parameters[i].name;
		if( object.hasOwnProperty( n ) ){
			this.values[ n ] = object[n];
		}
	}
	return this;
};
var pSet1 = ParameterSet( [pWidth,pHeight] );
console.info( pSet1.values );
console.info( pSet1.width(10).height(10).values );
console.info( pSet1.width(10).defaults().values );
console.info( pSet1.valueArguments(1,2).values );
console.info( pSet1.valueArray([3,4]).values );
console.info( pSet1.valueObject({
	width:  5,
	height: 6
}).values );

