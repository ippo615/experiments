var express = require('express');
var app = express();

// change .get to .post, .put, or .delete
app.get('/', function (request, response) {
	console.info( request );
	response.send( 'get /' );
});

app.route('/users')
	.get( function (request, response) {
		response.send( 'get /users' );
	}).put( function (request, response) {
		response.send( 'put /users' );
	}).post( function (request, response) {
		response.send( 'post /users' );
	}).delete( function (request, response) {
		response.send( 'delete /users' );
	});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
