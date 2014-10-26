/*
'What is the ~distance from $x to $y'
'What is the !distance from $x to $y'
'What is the @distance from $x to $y'
'What is the =distance from $x to $y'
*/

function get_action( text ){
	var action = text.match(/=(.+?)\s/);
	if( action === null ){
		throw 'No action found. An action should start with an equal sign (ie =action). In text: '+text;
	}
	return action[1];
}

console.info( get_action( 'What is the =distance from $x to $y' ) );
//console.info( get_action( 'What is the distance from $x to $y' ) );

function get_parameters( text ){
	var template = /\$(.+?)/g;
	var matches;
	var results = [];
	while( matches = template.exec(text) ){
		results.push( matches[1] );
	}
	return results;
}

console.info( get_parameters( 'What is the =distance from $x to $y ' ) );

function match_prefix( text, prefix, postfix ){
	var template = new RegExp( prefix+'(.+?)'+postfix, 'g' );
	var matches;
	var results = [];
	while( matches = template.exec(text) ){
		results.push( matches[1] );
	}
	return results;
}

function get_actions(text){
	return match_prefix( text, '=', '\\b' );
}
function get_parameters(text){
	return match_prefix( text, '\\$', '\\b' );
}
function get_template( text ){
	return new RegExp(
		'^'+text.replace( /=(.+?)\b/g, '(.+?)' )
			.replace( /\$(.+?)\b/g, '(.+?)' )
			.replace( /\s+/g, '\\s+' )+'$',
		'ig'
	);
}

console.info( get_actions( 'What is the =distance from $x to $y' ) );
console.info( get_parameters( 'What is the =distance from $x to $y' ) );
console.info( get_template( 'What is the =distance from $x to $y' ) );

function get_arguments( func ){
	var text = func.toString();
	// Match the 1st parentical expression.
	// Then take that match and remove all the spaces in it - js identifiers
	// cannot have spaces in them so it's easier to remove all the spaces.
	// Then split that text at the commas.
	return text.match(/\(([^)]*)\)/)[1].replace(/\s+/g,'').split(',');
}

function add( x, y ){
	return x+y;
}

console.info( get_arguments( add ) );

console.info( get_actions( 'What is the =sum of $x and $y' ) );
console.info( get_parameters( 'What is the =sum of $x and $y' ) );
console.info( get_template( 'What is the =sum of $x and $y' ).exec(
	'What is the sum of 5,4,3,2,1 and 10'
) );

console.info( get_template('What is the =sum of $x and $y') );

function template( config ){
	this.types = config.types || [];
}
template.prototype.add_type = function( id, before, after ){
	this.types.push( {
		id: id,
		before: before,
		after:  after
	} );
};
template.prototype.exec = function(text){
	//var template = 
};


function parse_object_parms( template, text ){
	var parms = get_parameters( template );
	var reTemplate = get_template( template );
	var matches = reTemplate.exec( text );
	var result = {};
	var i, nMatches = matches.length;
	for( i=1; i<nMatches; i+=1 ){
		result[ parms[i-1] ] = matches[i];
	}
	return result
}

console.info( parse_object_parms(
	'What is the sum of $x and $y',
	'What is the sum of 5,4,3,2,1 and 10'
) );

function sum_simple(x,y){
	return x+y;
}
function handle_array( x,y, action ){
	var result = [];
	var i,l=x.length;
	if( l !== y.length ){ throw 'Arrays not same length'; }
	for( i=0; i<l; i+=1 ){
		result.push( action(x[i], y[i]) );
	}
	return result;
}
function handle_object( x,y, action ){
	var result = {};
	for( var prop in x ){
		if( x.hasOwnProperty(prop) && y.hasOwnProperty(prop) ){
			result[prop] = action(x[prop],y[prop]);
		}
	}
	return result;
}
function handle_reduce( x, action ){
	var i = x.length-1;
	var accumulation = x[i];
	while( i-- ){
		accumulation = action( accumulation, x[i] );
	}
	return accumulation;
}
function wrap_binary(action){
	return function(x,y){

		var isNullX = ! x;
		var isNullY = ! y;
		if( isNullX && isNullY ){
			return null;
		}

		var isArrayX = x.hasOwnProperty('length');
		if( isArrayX && isNullY ){
			return handle_reduce( x, action );
		}

		var isArrayY = y.hasOwnProperty('length');
		if( isArrayX && isArrayY ){
			return handle_array(x,y,action);
		}

		var isNumberX = typeof x === 'number' || x instanceof Number;
		var isNumberY = typeof y === 'number' || y instanceof Number;
		if( isNumberX && isNumberY ){
			return action(x,y);
		}

		return handle_object(x,y,action);

	}
}

var convert_string_to_array = function(str,sep,convert){
	var strValues = str
		.replace(/[[(){}\]]/g,'')
		.replace(/\s+/g,'')
		.replace(/,+/g,',').split(sep);
	var values = [];
	var i, nValues = strValues.length;
	for( i=0; i<nValues; i+=1 ){
		values.push( convert(strValues[i] ) );
	}
	return values;
}

function wrap_float_binary( action ){
	return function(x,y){

		var isNullX = ! x;
		var isNullY = ! y;
		if( isNullX && isNullY ){
			return null;
		}

		var isStringX = x['constructor'] === String;
		if( isStringX ){
			var xValues = convert_string_to_array( x, ',', parseFloat );
		}
		if( isNullY ){
			if( isStringX ){
				if( xValues.length === 1 ){
					return action(xValues[0]);
				}else{
					return action(xValues);
				}
			}
			return action( x );
		}

		var isStringY = y['constructor'] === String;
		if( isStringY ){
			var yValues = convert_string_to_array( y, ',', parseFloat );
		}
		if( isStringX && isStringY ){
			if( xValues.length === 1 ){
				return action(xValues[0],yValues[0]);
			}else{
				return action(xValues,yValues);
			}
		}

		if( isStringX && ! isStringY ){
			if( xValues.length === 1 ){
				return action(xValues[0],y);
			}else{
				return action(xValues,y);
			}
		}

		if( ! isStringX && isStringY ){
			if( yValues.length === 1 ){
				return action(x,yValues[0]);
			}else{
				return action(x,yValues);
			}
		}

		return action( x, y );
	};
}

var sum = wrap_float_binary( wrap_binary( sum_simple ) );
console.info( 'Wrapped sum' );
console.info( sum( {x:10,y:10}, {x:3,y:4} ) );
console.info( sum( [1,2,3], [4,5,6] ) );
console.info( sum( 1, 6 ) );
console.info( sum( [1,2,3,4,5] ) );
console.info( sum('1','2') );
console.info( sum('1,2,3','1,2,3') );
console.info( sum('1,2,3') );
console.info( sum([1,2,3],'1,2,3') );
console.info( sum('1,2,3',[1,2,3]) );
console.info( sum('1',1) );
console.info( sum(1,'1') );

console.info( sum.toString() );
