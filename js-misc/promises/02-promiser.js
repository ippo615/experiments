var Q = require('q');
var Promise = Q.Promise;

// Promiser (tm) - a thing that makes promises. That's my definition
// (and my word to), ie it's totally made up to hopefully make this 
// memorable. All asynchronous functions can be promisers as long as
// they return a promise. What is a promise? A wrapped function that
// calls `reject` on error and `resolve` on success.

function delay( ms ){
	return new Promise(function(resolve,reject){
		setTimeout( function(){
			if(Math.random() > 0.3){
				resolve("Stuff worked!");
			}else{
				reject(Error("It broke"));
			}
		}, ms );
	});
}

// Actually the promise as promised by the promiser.
// Notice the order of the functions in the code and the order of the
// prints in the output.
delay(500).then(function(result){
	console.info( "500 Success: "+result );
}, function(error){
	console.info( "500 Error: "+error );
} );
delay(100).then(function(result){
	console.info( "100 Success: "+result );
}, function(error){
	console.info( "100 Error: "+error );
} );
delay(10).then(function(result){
	console.info( "10 Success: "+result );
}, function(error){
	console.info( "10 Error: "+error );
} );
delay(50).then(function(result){
	console.info( "50 Success: "+result );
}, function(error){
	console.info( "50 Error: "+error );
} );
