
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

function get_parameters(text){
	return match_prefix( text, '\\$', '\\b' );
}

function escape_regex_special_chars( text, special ){
	var result = text;
	var specials = special.split('');
	var i=specials.length;
	while( i-- ){
		result = result.replace( specials[i], '\\'+specials[i] );
	}
	return result;
}

function get_template( text ){
	return new RegExp(
		'^'+escape_regex_special_chars(text,'[]{}()+*.?\\')
				.replace( /=(.+?)\b/g, '(.+?)' )
				.replace( /\$(.+?)\b/g, '(.+?)' )
				.replace( /\s+/g, '\\s+' )+'$',
		'ig'
	);
}

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

function template(){
	this.prefix = '\\$';
}

console.info( get_parameters( 'What is sum of $x and $y ' ) );

function parse_template( template, text ){
	var variables = get_parameters(template);
	var regTemp = get_template(template);
	var matches = regTemp.exec( text );
	var result = {};
	var i, nProps = variables.length;
	for( i=1; i<nProps+1; i+=1 ){
		result[variables[i-1]] =  matches[i];
	}
	return result;
}

console.info( parse_template(
	'What is sum of $x and $y?',
	'What is sum of 5 and 1,2,3,4?'
) );
'What is the sum of $x and $y?'
'What is the total of $x and $y?'
'Add $x and $y.'
'Sum $x and $y.'
'Add $x to $y.'

function Concept( words ){
	this.words = words || [];
}
Concept.prototype.regexp = function( flags ){
	return new RegExp( '(?:'+this.words.join( '|' )+')', flags );
};
Concept.prototype.has_synonym = function( word ){
	return this.words.indexOf( word ) > -1;
}

var sum = new Concept( 'sum add total'.split(' ') );
console.info( sum.regexp('gi').exec( 'The sum of 3 and 2 is 5' ) );
console.info( sum.regexp('gi').exec( 'The total of 3 and 2 is 5' ) );
console.info( sum.regexp('gi').exec( 'Adding 3 and 2 yields 5' ) );

function Vocab( concepts ){
	this.concepts = concepts || [];
}
Vocab.prototype.regexp = function( word, flags ){
	var i = this.concepts.length;
	while( i-- ){
		if( this.concepts[i].has_synonym( word ) ){
			return this.concepts[i].regexp( flags );
		}
	}
	return (new Concept( [word] )).regexp( flags );
};

var diff = new Concept( 'difference subtract'.split(' ') );
var math = new Vocab( [sum, diff] );
console.info( math.regexp( 'sum', 'gi' ).exec( 'The total of 3 and 2 is 5' ) );
console.info( math.regexp( 'subtract', 'gi' ).exec( 'The difference of 3 and 2 is 1' ) );
console.info( math.regexp( 'product', 'gi' ).exec( 'The product of 3 and 2 is 6' ) );
console.info( math.regexp( 'quotient', 'gi' ).exec( 'The quotient of 3 and 2 is 3/2' ) );
