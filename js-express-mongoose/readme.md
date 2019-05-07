
# Basic Setup

	npm install -g express

	# Create scaffold of project
	cd /path/to/project
	express 01-hello-world
	
	# install mongodeb

	# Install mongodb driver and mongoose
	cd 01-hello-world
	npm install mongodb --save
	npm install mongoose --save

	# Create a directory for a database models
	mkdir models

# Create a database

Launch your mongo client

	mongo

In the mongo client create a new database called `01-hello-world`:

	use 01-hello-world

# Install your app

	npm install

# Setup

## Database connection

There is a file called `models/db.js` which used mongoose to connect
to the database. It should be imported in the `app.js` before any of
the actual models get imported.

## Models

Each model should create a mongoose schema an export it, for example:

	var mongoose = require('mongoose');

	var user = mongoose.Schema({
		username: {
			type: 'String',
			required: true
		},
		email: {
			type: 'String',
			required: true,
			unique: true
		}
	});

	module.exports = mongoose.model('users', user);

The models can be imported into the routes that require them.

## Routes

Each route is responsible for importing the models that they need.
For example `routes/user.js` needs the user model:

	var express = require('express');
	var router = express.Router();
	var Users = require('../models/user');

	router.get('/:username', function(req, res, next) {
		Users.findOne({
			username: req.params.username
		}, makeServeUser(req,res,next) );
	});

	module.exports = router;

## The app

The `app.js` should import express, then the database, then the routes
(note it does not need to import the models).

