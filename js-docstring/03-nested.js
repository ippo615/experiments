
var math = function(){
	/** Acts as a namespace for a bunch of math stuff */
};

math.add = function(){
	/** Provides functions for adding stuff */
};
math.sub = function(){
	/** Provides functions for subtracting stuff */
};

math.add.simple = function( x, y ){
	/**
	 * Returns the sum of x and y.
	 * @param x {float} a number to add
	 * @param y {float} a number to add
	 */
	return x+y;
};

math.add.array = function( values ){
	/**
	 * Returns the sum of all the values in an array.
	 * @param values {array} numbers to sum
	 */
	var total = 0;
	var i,l = values.length;
	for( i=0; i<l; i+=1 ){
		total += values[i];
	}
	return total;
};

function showSourceAll( func, thisName ){
	var prop;
	for( prop in func ){
		showSourceAll( func[prop], thisName+'.'+prop );
	}
	console.info( '' );
	console.info( thisName + ' - source: ' );
	console.info( func.toString() );
}

showSourceAll( math, 'math' );
