var express = require('express');
var userRouter = require('./04-modular-module');

// This is the 'main' app which can import the userRouter

var app = express();

app.get('/', function (request, response) {
	console.info( request );
	response.send( 'get /' );
});

app.use( '/user', userRouter );

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
