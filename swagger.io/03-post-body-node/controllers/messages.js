'use strict';
function messages(){
function get(req, res) {
	var name = req.swagger.params.name.value;
	var hello = name ? util.format('Hello, %s', name) : 'Hello, stranger!';
	res.json(hello);
}
function post(req, res) {
	var name = req.swagger.params.name.value;
	var hello = name ? util.format('Hello, %s', name) : 'Hello, stranger!';
	res.json(hello);
}

module.exports = {
	controller: {
		get: get,
		post: post
	}
};
}