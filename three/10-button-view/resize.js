
app = (function(app){

	var hSize = 320;
	var vSize = 320;

	// Make the view take all the entire available size
	function onWindowResize() {
		app.sidebar.style.width = hSize+'px';
		app.sidebar.style.height = window.innerHeight;

		app.renderSizeX = app.window.innerWidth - hSize;
		app.renderSizeY = app.window.innerHeight;
		app.camera.aspect = app.renderSizeX / app.renderSizeY;
		app.camera.updateProjectionMatrix();
		app.renderer.setSize( app.renderSizeX, app.renderSizeY );

	}
	
	app.inits.push( function(){
		app.window.addEventListener('resize', onWindowResize, false);
		onWindowResize();
	} );

	return app;
	
})(app);
