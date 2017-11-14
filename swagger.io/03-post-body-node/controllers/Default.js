'use strict';

var url = require('url');


var Default = require('./DefaultService');

module.exports.controllers = {
	default: {}
};

module.exports.controllers.default.getMessages = function controllers_default_getMessages (req, res, next) {
  Default.controllers.default.getMessages(req.swagger.params, res, next);
};

module.exports.controllers.default.addMessageBody = function controllers_default_addMessageBody (req, res, next) {
  Default.controllers.default.addMessageBody(req.swagger.params, res, next);
};
