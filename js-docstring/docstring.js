var Docstring = function(){
	/**
	 * Js Docstring
	 *
	 * Js Docstring is a library for manipulating documentation strings within
	 * your javascript functions
	 */
};

Docstring.raw = function(){
	/**
	 * Contains functions for extracting and cleaning raw docstrings
	 */
};

Docstring.raw.extract = function( func ){
	/**
	 * Extracts a docstring from a function.
	 *
	 * @param func {function}
	 *   the function whose docstring you want to get
	 * @returns docstring {string} the function's docstring
	 */

	var text = func.toString();
	// This regex is hard to read
	// We want a match starting at `/**` and ending at `*/` but `/` and `*`
	// are special regex characters so we must escape them as `\/` and `\*`
	// respectively. Then we want to match ANYTHING between them: `.`
	// matches anything except newlines so to match anything we use `(.|\n)`.
	// We want it repeated 0 or more times (hence the `*`) but we want to
	// stop at the first `*/` incase the user has other multi-line comments
	// in their code so we add the `?` to make it non-greedy.
	return text.match( /\/\*\*((.|\n)*?)\*\// )[0];
};

Docstring.raw.clean = function( docstring ){
	/**
	 * Removes the enclosing comment box from the docstring
	 *
	 * @param docstring {string} the raw docstring to clean
	 * @returns cleaned {string} the docstring without the enclosing comments
	 */
	var lines = docstring.split('\n');
	var middle = lines.slice( 1, lines.length-1 ).join('\n');
	return middle.replace( /^\s*\* ?/gm, '' );
};

Docstring.raw.extractTag = function( tag, docstring ){
	/**
	 * Extracts all of sections that match tag in the docstring.
	 *
	 * @param tag {string} the text that represents the tag
	 * @param docstring {string} the docstring to extract the tags from
	 * @returns results {object}
	 *   an object with 2 properties: `{tags:[...],docstring:'...'}`.
	 *   `tags` is an array of strings that are the tag section matches.
	 *   `docstring` is the remaining docstring with the matched tags removed.
	 */
	var symbol = '\n@'+tag;
	var workText = docstring;
	var paramTexts = [];
	var paramIndexStart = workText.indexOf(symbol);
	var paramIndexEnd = -1;
	while( paramIndexStart > -1 ){
		
		// This parameter section ends at the start of a new tag
		// or at the end of the entire string
		paramIndexEnd = workText.indexOf('\n@',paramIndexStart+1);
		if( paramIndexEnd < paramIndexStart ){
			paramIndexEnd = workText.length;
		}

		// Store the parameter text and remove it from the working copy
		paramTexts.push( workText.slice(paramIndexStart, paramIndexEnd) );
		workText = workText.slice(0,paramIndexStart) + workText.slice(paramIndexEnd,workText.length);

		// Look for the next parameter
		paramIndexStart = workText.indexOf(symbol);
	}

	return {
		tags: paramTexts,
		docstring: workText
	};
};

Docstring.parse = function(){
	/**
	 * Section that contains function which convert tag texts to objects
	 */
};

Docstring.parse.param = function( text ){
	/**
	 * Converts a matched `@param` tag into an object
	 *
	 * @param text {string} the @param tag text to parse
	 * @returns result {object}
	 *   has properties: `title`, `type`, and `description`
	 */
	var clean = text.replace(/\n/g,' ').replace(/@param\s+/g,'').replace(/\s+/g,' ');
	var matches = clean.match( /\s*(\S+)\s+({(\S+)})?/ );
	return {
		title: matches[1],
		type: matches[2].replace('{','').replace('}',''),
		description: clean.replace( /\s*(\S+)\s+({(\S+)})?/, '' )
	};
};
Docstring.parse.returns = function( text ){
	/**
	 * Converts a matched `@returns` tag into an object
	 *
	 * @param text {string} the @param tag text to parse
	 * @returns result {object}
	 *   has properties: `title`, `type`, and `description`
	 */
	var clean = text.replace(/\n/g,' ').replace(/@returns\s+/g,'').replace(/\s+/g,' ');
	var matches = clean.match( /\s*(\S+)\s+({(\S+)})?/ );
	return {
		title: matches[1],
		type: matches[2].replace('{','').replace('}',''),
		description: clean.replace( /\s*(\S+)\s+({(\S+)})?/, '' )
	};	
};

Docstring.extract = function( ){
	/**
	 * Section that as user-friendly functions for extracting arrays of
	 * data or objects from docstrings.
	 */
};

Docstring.extract.tag = function( tag, docstring ){
	/**
	 * Extracts all of a tag in a docstring as an array of objects.
	 * 
	 * @param tag {string} the tag docstring extract and parse
	 * @param docstring {string} the cleaned docstring to parse
	 * @returns results {object} 
	 */

	var results = Docstring.raw.extractTag(tag,docstring);
	var tags = results.tags;
	var remaining = results.docstring;
	var datas = [];
	var i, l = tags.length;
	for( i=0; i<l; i+=1 ){
		datas.push( Docstring.parse[tag]( tags[i] ) );
	}
	return {
		data: datas,
		docstring: remaining
	};
};

Docstring.generate = function(){
	/**
	 * Contains functions which parse entire module heirachies to create some
	 * type of output
	 */
};

Docstring.generate.object = function( root, funcName ){
	/**
	 * Converts the heirarchy to an object
	 *
	 * @param root {function} the function to start with
	 * @param funcName {string} the name of the function
	 * @returns result {object} represents the function
	 */

	var doc = Docstring.raw.clean( Docstring.raw.extract( root ) );
	var results = {};
	results.param = Docstring.extract.tag( 'param', doc );
	results.returns = Docstring.extract.tag( 'returns', results.param.docstring );
	results.title = results.returns.docstring.slice( 0, results.returns.docstring.indexOf('\n' ) );
	results.desc = results.returns.docstring;
	var children = [];
	var child;
	for( child in root ){
		children.push( Docstring.generate.object( root[child], funcName+'.'+child ) );
	}

	return {
		funcName: funcName,
		param: results.param.data,
		returns: results.returns.data,
		title: results.title,
		description: results.desc,
		children: children
	};
};

Docstring.generate.markdown = function( root, funcName ){
	/**
	 * Converts the function documentation to markdown text
	 *
	 * @param root {function} the function to start with
	 * @param funcName {string} the name of the function
	 * @returns result {string} markdown
	 */

	var obj = Docstring.generate.object( root, funcName );
	function objToMarkdown( obj ){
		var text = '';
		text += '# '+obj.funcName.replace(/\n|\r/g,'')+'\n';
		text += obj.description+'\n\n';

		var i, l = obj.param.length;
		if( l > 0 ){
			text += '\n## Parameters:\n'
			for( i=0; i<l; i+=1 ){
				text += '### '+obj.param[i].title+' {'+obj.param[i].type+'} '+'\n';
				text += obj.param[i].description + '\n';
			}
		}

		var i, l = obj.returns.length;
		if( l > 0 ){
			text += '\n## Returns:\n'
			for( i=0; i<l; i+=1 ){
				text += '### '+obj.returns[i].title+' {'+obj.returns[i].type+'} '+'\n';
				text += obj.returns[i].description + '\n';
			}
		}

		var i, l = obj.children.length;
		for( i=0; i<l; i+=1 ){
			text += objToMarkdown( obj.children[i] );
		}

		return text+'\n\n';
	}

	return objToMarkdown( obj );
};

/*
var cDoc = Docstring.raw.clean( Docstring.raw.extract( Docstring.raw.extract ) );
console.info( Docstring.extract.tag( 'param', cDoc ) );

console.info( Docstring.generate.object( Docstring.generate, 'Docstring.generate' ) );
console.info( '' );
console.info( Docstring.generate.object( Docstring.generate.object, 'Docstring.generate.object' ) );

console.info( Docstring.generate.markdown( Docstring, 'Docstring' ) );
*/