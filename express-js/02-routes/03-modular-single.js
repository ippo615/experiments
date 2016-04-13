var express = require('express');

// This can be it's own module
var userRouter = express.Router();
userRouter.get( '/', function(request, response) {
	response.send( 'User get request' );
});
userRouter.get( '/profile', function(request, response) {
	response.send( 'User profile' );
});
userRouter.get( '/about', function(request, response) {
	response.send( 'User about page' );
});

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
