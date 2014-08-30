function permute( values, action, prefix ){

	prefix = prefix || [];

	var i, nValues = values.length;
	if (nValues === 0) {
		return action( prefix );
	}

	var choice;
	for (i = 0; i < nValues; i+=1) {

		// Take the last element from list and permute the remaining values
		choice = values.splice(i, 1)[0];
		prefix.push(choice);
		permute(values, action, prefix);

		// Put the element back in the list (in it's original location)
		prefix.pop();
		values.splice(i, 0, choice);
	}
}

function printText(text){
	console.info( text );
}
permute( [1,2,3], printText );
