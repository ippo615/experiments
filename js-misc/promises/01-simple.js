var Q = require('q');
var Promise = Q.Promise;

// Create a promise
// A promise is (vaguely) a function that "resolves" a successful
// result or "rejects" an error. Those are 2 callbacks which are
// specified LATER (ie when `.then` is called)

var promise = new Promise(function(resolve, reject) {
	setTimeout( function(){
		if(Math.random() > 0.3){
			resolve("Stuff worked!");
		}else{
			reject(Error("It broke"));
		}
	}, 500);
});

// Run the actual code of the promise. If it is successful then the
// first callback will be run, if an error then the second callback
// will be run.
promise.then(function(result){
	console.info( "Success: "+result );
}, function(error){
	console.info( "Error: "+error );
} );
