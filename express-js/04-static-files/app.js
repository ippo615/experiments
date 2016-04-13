var express = require('express');
var app = express();

// NOTE: it does not work on individual files only directories
// localhost:3000/sample.txt
app.use(express.static('sample.txt'));

// localhost:3000/image-0.jpg
// localhost:3000/image-1.jpg
// localhost:3000/folder/image-a.jpg
// localhost:3000/folder/image-b.jpg
app.use(express.static('images'));

// localhost:3000/static/sample.txt
app.use('/static',express.static('sample.txt'));

// localhost:3000/static/image-0.jpg
// localhost:3000/static/image-1.jpg
// localhost:3000/static/folder/image-a.jpg
// localhost:3000/static/folder/image-b.jpg
app.use('/static',express.static('images'));

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
