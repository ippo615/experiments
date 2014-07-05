var text = '';
text += 'Returns x+y\n';
text += '\n';
text += '@param x {int} a number to add\n';
text += '@param y {int} the other number to add\n';


function jsDocExtractTag( tag, text ){
	var symbol = '@'+tag;
	var workText = text;
	var paramTexts = [];
	var paramIndexStart = workText.indexOf(symbol);
	var paramIndexEnd = -1;
	while( paramIndexStart > -1 ){
		
		// This parameter section ends at the start of a new tag
		// or at the end of the entire string
		paramIndexEnd = workText.indexOf('@',paramIndexStart+1);
		if( paramIndexEnd < paramIndexStart ){
			paramIndexEnd = workText.length;
		}

		// Store the parameter text and remove it from the working copy
		paramTexts.push( workText.slice(paramIndexStart, paramIndexEnd) );
		workText = workText.slice(0,paramIndexStart) + workText.slice(paramIndexEnd,workText.length);

		// Look for the next parameter
		paramIndexStart = workText.indexOf(symbol);
	}

	return paramTexts;

}

console.info(jsDocExtractTag('param',
	'Returns x+y\n'+
	'\n'+
	'@param x {int} a number to add\n'+
	'@param y {int} the other number to add\n'
));

console.info(jsDocExtractTag('param',
	'Returns x+y\n'+
	'\n'+
	'@param x {int} \n'+
	'x is one of the numbers\n'+
	'that will be added\n'+
	'@param y {int} the other number to add\n'
));


console.info(jsDocExtractTag('returns',
	'Returns x+y\n'+
	'\n'+
	'@returns {int} the sum\n'
));

function jsDocParseParam( text ){
	var clean = text.replace(/\n/g,' ').replace(/@param\s+/g,'').replace(/\s+/g,' ');
	var matches = clean.match( /\s*(\S+)\s+({(\S+)})?/ );
	return {
		title: matches[1],
		type: matches[2].replace('{','').replace('}',''),
		description: clean.replace( /\s*(\S+)\s+({(\S+)})?/, '' )
	};
}

console.info(jsDocParseParam(
	'@param x {int} \n'+
	'is one of the numbers\n'+
	'that will be added\n'
));

function jsDocGetParameters( docstring ){
	var paramTexts = jsDocExtractTag('param',docstring);
	var parameters = [];
	var i, l = paramTexts.length;
	for( i=0; i<l; i+=1 ){
		parameters.push( jsDocParseParam( paramTexts[i] ) );
	}
	return parameters;
}

console.info(jsDocGetParameters( 
	'Returns x+y\n'+
	'\n'+
	'@param x {int} \n'+
	'x is one of the numbers\n'+
	'that will be added\n'+
	'@param y {int} the other number to add\n'
));