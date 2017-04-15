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
