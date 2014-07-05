// Functions are objects in JavaScript so we can add properties to functions
// OR make an object as a function and not destroy its function-ness.

var add = function(x,y){
	/** 
	 * Returns x+y
	 */

	return x+y;
}

add.description = 'BLAH!!!';

add.array = function( values ){
	var total = 0;
	var i,l = values.length;
	for( i=0; i<l; i+=1 ){
		total += values[i];
	}
	return total;
}

console.info( add(1,2) );
console.info( add.description );
console.info( add.array( [1,2,3,4,5] ) );

console.info( 'add.toString():' );
console.info( add.toString() );
