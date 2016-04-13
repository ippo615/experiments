var express = require('express');
var app = express();

app.get('/', function (request, response) {
	response.send( request.query );
});
// Try navigating to
// http://localhost:3000/?q=12354
// http://localhost:3000/?a=1&b=2&c=3

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
