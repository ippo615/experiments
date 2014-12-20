
// Create an alias for vector (because I used Vector2 in several places)
var Vector2 = Vector;

// Global Settings
// WARNING: this are global, I should find a cleaner way to use them
var gravity = new Vector2(0.0, 900.0);
var parameters = {
	mouse_influence: 20,
	mouse_cut: 5,
	damping: 0.95
};
//var gui = new dat.GUI();
//gui.add(parameters,'mouse_influence').min(1).max(100).step(1);
//gui.add(parameters,'mouse_cut').min(1).max(100).step(1);
//gui.add(parameters,'damping').min(0.0).max(1.0).step(0.01);

window.requestAnimFrame =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};

var canvas, ctx, cloth;
// TODO: make mouse a class, make it use vectors
var mouse = {
	down: false,
	button: 1,
	x: 0,
	y: 0,
	px: 0,
	py: 0
};

function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	cloth.ui_update(0.0016); // TODO: measure actual elapsed time
	cloth.ui_draw(ctx);
	requestAnimFrame(update);
}

function init() {

	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	canvas.width = 640;
	canvas.height = 480;
	ctx.strokeStyle = '#888';

	// The general mouse behavior is:
	//  - left click+drag to move the cloth
	//  - other clicks cut the cloth

	canvas.onmousedown = function(e) {
		mouse.button = e.which;
		mouse.px = mouse.x;
		mouse.py = mouse.y;
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		mouse.down = true;
		e.preventDefault();
	};

	canvas.onmouseup = function(e) {
		mouse.down = false;
		e.preventDefault();
	};

	canvas.onmousemove = function(e) {
		mouse.px = mouse.x;
		mouse.py = mouse.y;
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		e.preventDefault();
	};

	canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};

	cloth = new Cloth(new Vector2(12, 12), new Vector2(20, 12));

	update();
}

window.onload = function() {
	init();
};
