// -------------------------------------------------------------------
//                                          Recursive Descent Parser
// -------------------------------------------------------------------

function makeSplitRegex( operators ){
	var opArray = [];
	for( var op in operators ){
		if( operators.hasOwnProperty( op ) ){
			opArray.push( op );
		}
	}
	return new RegExp('['+op.join('')+']');
}

function rdParseL( expression, operators, convert ){
	// Find which operator is left-most
	var leftMost = null;
	var minIndex = expression.length+1;
	for( var op in operators ){
		if( operators.hasOwnProperty( op ) ){
			var idx = expression.indexOf( op );
			if( -1 < idx && idx < minIndex ){
				leftMost = op;
				minIndex = idx;
			}
		}
	}
	
	if( leftMost === null ){
		// throw new Error('No operator ('+operators.+') found in: '+expression);
		return convert(expression);
	}

	var values = expression.split( leftMost );
	var left = values[0];
	values.shift();
	var right = values.join( leftMost );
	return operators[leftMost](
		convert( left ),
		rdParseL( right, operators, convert )
	);	
}
function rdParseR( expression, operators, convert ){
	// Find which operator is right-most
	var rightMost = null;
	var maxIndex = -1;
	for( var op in operators ){
		if( operators.hasOwnProperty( op ) ){
			var idx = expression.lastIndexOf( op );
			if( -1 < idx && maxIndex < idx ){
				rightMost = op;
				maxIndex = idx;
			}
		}
	}
	
	if( rightMost === null ){
		// throw new Error('No operator ('+operators.+') found in: '+expression);
		return convert(expression);
	}

	var values = expression.split( rightMost );
	var right = values.pop();
	var left = values.join( rightMost );
	return operators[rightMost](
		rdParseR( left, operators, convert ),
		convert( right )
	);
	
}

// -------------------------------------------------------------------
//                                                           Example
// -------------------------------------------------------------------

var operators = {
	'+': function(a,b){ return a+b; },
	'-': function(a,b){ return a-b; },
	'*': function(a,b){ return a*b; },
	'/': function(a,b){ return a/b; }
};
function base10( n ){ return parseInt( n, 10 ); }
console.info( rdParseL( '10*2-10+20+30+70+3-3+5/5', operators, base10 ) );
console.info( rdParseR( '10*2-10+20+30+70+3-3+5/5', operators, base10 ) );
console.info( ((10*2)-10+20+30+70+3-3+5)/5 );
