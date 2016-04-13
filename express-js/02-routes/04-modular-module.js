var express = require('express');

var router = express.Router();
router.get( '/', function(request, response) {
	response.send( 'User get request' );
});
router.get( '/profile', function(request, response) {
	response.send( 'User profile' );
});
router.get( '/about', function(request, response) {
	response.send( 'User about page' );
});

module.exports = router;
