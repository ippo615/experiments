
var app = (function(app){

	// inits and renders should be priority queues

	app.inits = [];
	app.init = function(options){
		for( var i=0, l=app.inits.length; i<l; i+=1 ){
		//for( var i=app.inits.length; i--; ){
			app.inits[i]( options );
		}
	};

	app.renders = [];
	app.render = function(){
		for( var i=0, l=app.renders.length; i<l; i+=1 ){
			app.renders[i]();
		}
	};

	app.animate = function(){
		requestAnimationFrame(app.animate);
		app.render();
	};

	app.window = window;

	return app;

})(app||{});
