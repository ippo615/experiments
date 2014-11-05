
app = (function(app){

	app.move_to = function(x,y,z){
		new TWEEN.Tween( app.mainObject.children[4].position ).to( {
			x: x,
			y: y,
			z: z
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Moving on all axes';
	};
	app.move_by = function(x,y,z){
		new TWEEN.Tween( app.mainObject.children[4].position ).to( {
			x: app.mainObject.children[4].position.x + parseFloat(x),
			y: app.mainObject.children[4].position.y + parseFloat(y),
			z: app.mainObject.children[4].position.z + parseFloat(z)
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Moving on all axes';
	};

	app.move_x = function(x){
		new TWEEN.Tween( app.mainObject.children[4].position ).to( {
			x: parseFloat(x),
			y: app.mainObject.children[4].position.y,
			z: app.mainObject.children[4].position.z
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Moving on the x axis';
	};
	app.move_y = function(y){
		new TWEEN.Tween( app.mainObject.children[4].position ).to( {
			x: app.mainObject.children[4].position.x,
			y: y,
			z: app.mainObject.children[4].position.z
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Moving on the y axis';
	};
	app.move_z = function(z){
		new TWEEN.Tween( app.mainObject.children[4].position ).to( {
			x: app.mainObject.children[4].position.x,
			y: app.mainObject.children[4].position.y,
			z: z
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Moving on the z axis';
	};

	app.dispatcher.push( new Trigger({
		text: 'move',
		description: 'Moves along all axes',
		args: ['x','y','z'],
		action: app.move_to
	}) ).push( new Trigger({
		text: 'move to',
		description: 'Moves along all axes',
		args: ['x','y','z'],
		action: app.move_to
	}) ).push( new Trigger({
		text: 'move by',
		description: 'Moves along all axes',
		args: ['x','y','z'],
		action: app.move_by
	}) ).push( new Trigger({
		text: 'move x',
		description: 'Moves along the x axis',
		args: ['x'],
		action: app.move_x
	}) ).push( new Trigger({
		text: 'move y',
		description: 'Moves along the y axis',
		args: ['y'],
		action: app.move_y
	}) ).push( new Trigger({
		text: 'move z',
		description: 'Moves along the z axis',
		args: ['z'],
		action: app.move_z
	}) ).push( new Trigger({
		text: 'mx',
		description: 'Moves along the x axis',
		args: ['y'],
		action: app.move_x
	}) ).push( new Trigger({
		text: 'my',
		description: 'Moves along the y axis',
		args: ['y'],
		action: app.move_y
	}) ).push( new Trigger({
		text: 'mz',
		description: 'Moves along the z axis',
		args: ['z'],
		action: app.move_z
	}) ).push( new Trigger({
		text: 'mt',
		description: 'Moves along all axes',
		args: ['x','y','z'],
		action: app.move_to
	}) ).push( new Trigger({
		text: 'mb',
		description: 'Moves along all axes',
		args: ['x','y','z'],
		action: app.move_by
	}) );
	
	return app;
	
})(app);
