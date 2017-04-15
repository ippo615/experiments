var express = require('express');
var router = express.Router();
var Users = require('../models/user');

function makeServeUser( req,res,next ){
	return (function(req,res,next){ return function(err, user) {
		if (err) {
		    console.log('GET Error: There was a problem retrieving user ('+req.query.username+'): '+err);
		} else {
			res.json(user);
			/*
			res.format({
				//HTML response will render the 'edit.jade' template
				html: function(){
					res.render('path/to/view', {
						user: user
					});
				},
				//JSON response will return the JSON output
				json: function(){
					res.json(user);
				}
			});
			*/
		}
	} })(req,res,next);
}

// http://localhost:3000/users/create?username=b123&email=b@b.com
router.get('/create', function(req, res, next) {
	// for posts use `req.body.username` etc...
	var username = req.query.username;
	var email = req.query.email;
	Users.create({
            username : username,
            email : email
        }, makeServeUser(req,res,next) );
});

// NOTE: '/:username' includes the extension
// so /user123.json -> req.params.username === 'user123.json'
// http://localhost:3000/users/b123
router.get('/:username', function(req, res, next) {
	Users.findOne({
		username: req.params.username
	}, makeServeUser(req,res,next) );
});

module.exports = router;
