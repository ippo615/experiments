function add(x,y){
	/** 
	 * Returns x+y
	 */

	return x+y;
}

function getFunctionArguments( func ){
	var text = func.toString();
	// Match the 1st parentical expression.
	// Then take that match and remove all the spaces in it - js identifiers
	// cannot have spaces in them so it's easier to remove all the spaces.
	// Then split that text at the commas.
	return text.match(/\(([^)]*)\)/)[1].replace(/^\s+/g,'').split(',');
}

console.info( getFunctionArguments(add) );
