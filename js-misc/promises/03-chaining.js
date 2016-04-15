var Q = require('q');
var Promise = Q.Promise;

// Promiser (tm) - a thing that makes promises. That's my definition
// (and my word to), ie it's totally made up to hopefully make this 
// memorable. All asynchronous functions can be promisers as long as
// they return a promise. What is a promise? A wrapped function that
// calls `reject` on error and `resolve` on success.

function addOne( x ){
	return new Promise(function(resolve,reject){
		resolve( x+1 );
	});
}

addOne( 5 )   // 5+1 = 6
.then(addOne) // 6+1 = 7
.then(addOne) //     = 8
.then(addOne) //     = 9
.then(function(x){
	console.info( x );
});


