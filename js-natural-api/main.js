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
		text.replace( /=(.+?)\b/g, '(.+?)' )
			.replace( /\$(.+?)\b/g, '(.+?)' )
			.replace( /\s+/g, '\\s+' ),
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
	'What is the sum of 5 and 10'
) );
