/*
var lazy = require("lazy"),
fs = require("fs");

new lazy(fs.createReadStream('./data'))
	.lines
	.forEach(function(line){
		console.log(line.toString());
	});
*/

var fs = require('fs');
var readline = require('readline');
var d3 = require( './vendor/d3.min.js' );

var rd = readline.createInterface({
	input: fs.createReadStream('./data'),
	terminal: false
});

var dateTimeToString = d3.time.format( '%a %b %e %Y %X GMT%Z' );
rd.on('line', function(line) {
	// Save to log file
	var object = JSON.parse( line );
	object.time = dateTimeToString(new Date(object.time));
	
	fs.appendFile( 'newData', JSON.stringify( 
		object
	)+'\n', function(err){
		if( err ){
			console.info( 'An error occured:' );
			console.info( err );
			//console.info( this );
		}
		return;
	} );
	
	//fs.appendFile( 'newData', JSON.stringify( object )+'\n', function(err){console.log(err);} );
});
