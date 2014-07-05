// Defining your function 'regularly' shows the function name when getting
// the code

function add(x,y){
	/** 
	 * Returns x+y
	 */

	return x+y;
}

console.info( 'add.toString():' );
console.info( add.toString() );

// You can also define your function as a variable but the function name will
// not appear in the output

var sub = function(x,y){
	/**
	 * Returns x-y
	 */

	return x-y;
};

console.info( 'sub.toString():' );
console.info( sub.toString() );

// Calling .toSource does not work in NodeJS but works in FF
// console.info( add.toSource(): );
// console.info( sub.toSource(): );
