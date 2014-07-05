
function add(x,y){
	/** 
	 * Returns x+y
	 * 
	 * @param x {int} a number to add
	 * @param y {int} the other number to add
	 */
	/* */
	return x+y;
}

function getFunctionDocstring( func ){
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
}

function cleanDocstring( docstring ){
	var lines = docstring.split('\n');
	var middle = lines.slice( 1, lines.length-1 ).join('\n');
	return middle.replace( /^\s*\* ?/gm, '' );

}

console.info( getFunctionDocstring(add) );
console.info( cleanDocstring( getFunctionDocstring(add) ) );
