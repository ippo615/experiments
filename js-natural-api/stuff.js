
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
Concept.prototype.regexp_str = function( ){
	return '(?:'+this.words.join( '|' )+')';
};
Concept.prototype.regexp = function( flags ){
	return new RegExp( this.regexp_str(), flags );
};
Concept.prototype.has_synonym = function( word ){
	// Try to defualt case
	if( this.words.indexOf( word ) > -1 ){
		return true;
	}

	// Otherwise try upper and lower case
	if( this.words.indexOf( word.toLowerCase() ) > -1 ){
		return true;
	}
	if( this.words.indexOf( word.toUpperCase() ) > -1 ){
		return true;
	}

	return false;
}

var sum = new Concept( 'sum add total'.split(' ') );
console.info( sum.regexp('gi').exec( 'The sum of 3 and 2 is 5' ) );
console.info( sum.regexp('gi').exec( 'The total of 3 and 2 is 5' ) );
console.info( sum.regexp('gi').exec( 'Adding 3 and 2 yields 5' ) );

function Vocab( concepts ){
	this.concepts = concepts || [];
}
Vocab.prototype.add_concept = function( concept ){
	this.concepts.push( concept );
};
Vocab.prototype.regexp = function( word, flags ){
	var i = this.concepts.length;
	while( i-- ){
		if( this.concepts[i].has_synonym( word ) ){
			return this.concepts[i].regexp( flags );
		}
	}
	return (new Concept( [word] )).regexp( flags );
};
Vocab.prototype.regexp_str = function( word ){
	var i = this.concepts.length;
	while( i-- ){
		if( this.concepts[i].has_synonym( word ) ){
			return this.concepts[i].regexp_str();
		}
	}
	return (new Concept( [word] )).regexp_str();
};

var diff = new Concept( 'difference subtract'.split(' ') );
var math = new Vocab( [sum, diff] );
console.info( math.regexp( 'sum', 'gi' ).exec( 'The total of 3 and 2 is 5' ) );
console.info( math.regexp( 'subtract', 'gi' ).exec( 'The difference of 3 and 2 is 1' ) );
console.info( math.regexp( 'product', 'gi' ).exec( 'The product of 3 and 2 is 6' ) );
console.info( math.regexp( 'quotient', 'gi' ).exec( 'The quotient of 3 and 2 is 3/2' ) );


function escape_special_chars( text, special ){
	var result = text;
	var specials = special.split('');
	var i=specials.length;
	while( i-- ){
		result = result.replace( specials[i], '\\'+specials[i] );
	}
	return result;
}
function Action( ){
	this.vocab = new Vocab();
	this.templates = [];
	this.regexpTemplates = [];

	// We're keeping track of inputs that we don't know how to handle
	// this will let us teach and improve the AI
	this.unknowns = [];

	// We'll keep track of both the name and position of each argument
	this.namedArguments = {};
	this.positionalArguments = [];
	this.function_ = function(){};
}
Action.prototype.set_vocab = function( vocab ){
	this.vocab = vocab;
	// re-compile all of the templates
};
Action.prototype.set_function = function( function_ ){

	this.function_ = function_;

	// Match the 1st parentical expression.
	// Then take that match and remove all the spaces in it - js identifiers
	// cannot have spaces in them so it's easier to remove all the spaces.
	// Then split that text at the commas.
	var functionText = function_.toString();
	var arguments = functionText.match(/\(([^)]*)\)/)[1].replace(/\s+/g,'').split(',');

	var i, arity = arguments.length;
	for( i=0; i<arity; i+=1 ){
		this.namedArguments[ arguments[i] ] = i;
		this.positionalArguments.push( arguments[i] );
	}

	return this;
};
Action.prototype.add_template = function( template ){
	this.templates.push( template );
};
Action.prototype._compile_templates = function(){
	var i, nTemplates = this.templates.length;
	for( i=0; i<nTemplates; i+=1 ){
		// Replace each word with it's equivalent concept
		var words = escape_special_chars(this.templates[i],'[]{}()+*.?\\').replace(/\s+/g,' ').split(' ');
		var concepts = [];
		var j, nWords = words.length;
		for( j=0; j<nWords; j+=1 ){
			// Is this a parameter/argument?
			if( words[j].charAt(0) === '$' ){
				concepts.push( '(.+?)' );
			// Or a concept
			}else{
				concepts.push( this.vocab.regexp_str( words[j], 'gi' ) );
			}
		}
		this.regexpTemplates.push( new RegExp( '^'+concepts.join('\\s+')+'$', 'i' ) );
		console.info( concepts );
	}
};
Action.prototype.parse_parameters = function( text ){
	var i, nTemplates = this.templates.length;
	for( i=0; i<nTemplates; i+=1 ){
		var matches = this.regexpTemplates[i].exec( text );
		if( matches === null ){
			continue;
		}
		var j, nProps = this.positionalArguments.length;
		var results = {};
		for( j=1; j<nProps+1; j+=1 ){
			results[this.positionalArguments[j-1]] =  matches[j];
		}
		return results;
	}
	return null;
};

Action.prototype.run = function( text ){
	var i, nTemplates = this.templates.length;
	for( i=0; i<nTemplates; i+=1 ){
		var matches = this.regexpTemplates[i].exec( text );
		if( matches === null ){
			continue;
		}
		var j, nProps = this.positionalArguments.length;
		var resultObj = {};
		var args = [];
		for( j=1; j<nProps+1; j+=1 ){
			resultObj[this.positionalArguments[j-1]] = matches[j];
			args.push( matches[j] );
		}
		try {
			var result = this.function_.apply(null,args);
			return result;
		}catch(e){
			continue;
		}
	}

	// We failed to understand the statement - keep track of it
	this.unknowns.push( text );
	return null;
};

var vocabAddition = new Vocab();
vocabAddition.add_concept( new Concept( 'sum add total'.split(' ') ) );
var knowAdd = new Action();
knowAdd.set_vocab( vocabAddition );
knowAdd.add_template( 'Add $x and $y' );
knowAdd.add_template( 'What is the result of adding $x and $y' );
knowAdd.add_template( 'What is the sum of $x and $y' );
knowAdd.set_function( function(x,y){
	return parseInt(x,10)+parseInt(y,10);
} );
console.info( knowAdd );
knowAdd._compile_templates();
console.info( knowAdd.parse_parameters('Add 32 and 17') );
console.info( knowAdd.parse_parameters('Sum 32 and 17') );
console.info( knowAdd.parse_parameters('What is the total of 5 and 12') );
console.info( knowAdd.run('What is the total of 5 and 12') );
console.info( knowAdd.run('What is the result of adding 6 and 22?') );
console.info( knowAdd.run('Why do you not know this?') );
console.info( knowAdd.unknowns );

