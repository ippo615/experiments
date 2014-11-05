
app = (function(app){

	app.viewTop = function(){
		new TWEEN.Tween( app.mainObject.rotation ).to( {
			x: Math.PI/2.0,
			y: 0,
			z: 0
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Viewing the top of the printer (looking down z-axis)';
	};
	app.viewBottom = function(){
		new TWEEN.Tween( app.mainObject.rotation ).to( {
			x: -Math.PI/2.0,
			y: 0,
			z: 0
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Viewing the bottom of the printer (looking along z-axis)';
	};
	app.viewFront = function(){
		new TWEEN.Tween( app.mainObject.rotation ).to( {
			x: 0,
			y: 0,
			z: 0
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Viewing the front of the printer, looking at x-z plane';
	};
	app.viewBack = function(){
		new TWEEN.Tween( app.mainObject.rotation ).to( {
			x: 0,
			y: 0,
			z: Math.PI
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Viewing the back of the printer, looking at x-z plane';
	};
	app.viewLeft = function(){
		new TWEEN.Tween( app.mainObject.rotation ).to( {
			x: 0,
			y: Math.PI/2,
			z: 0
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Viewing the left side of the printer, looking at y-z plane';
	};
	app.viewRight = function(){
		new TWEEN.Tween( app.mainObject.rotation ).to( {
			x: 0,
			y: -Math.PI/2,
			z: 0
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Viewing the right side of the printer, looking at y-z plane';
	};
	app.viewAngle = function(){
		new TWEEN.Tween( app.mainObject.rotation ).to( {
			x: Math.PI/8.0,
			y: -Math.PI/4.0,
			z: 0
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		return 'Viewing the printer from a slight angle';
	};

	app.dispatcher.push( new Trigger({
		text: 'view angle',
		description: 'Look at an angle',
		args: [],
		action: app.viewAngle
	}) ).push( new Trigger({
		text: 'view front',
		description: 'Look at the front',
		args: [],
		action: app.viewFront
	}) ).push( new Trigger({
		text: 'view left',
		description: 'Look at the left side',
		args: [],
		action: app.viewLeft
	}) ).push( new Trigger({
		text: 'view right',
		description: 'Look at the right side',
		args: [],
		action: app.viewRight
	}) ).push( new Trigger({
		text: 'view top',
		description: 'looks down (from the top of the printer)',
		args: [],
		action: app.viewTop
	}) ).push( new Trigger({
		text: 'view bottom',
		args: [],
		action: app.viewBottom
	}) ).push( new Trigger({
		text: 'va',
		description: 'Look at an angle',
		args: [],
		action: app.viewAngle
	}) ).push( new Trigger({
		text: 'vf',
		description: 'Look at the front',
		args: [],
		action: app.viewFront
	}) ).push( new Trigger({
		text: 'vl',
		description: 'Look at the left side',
		args: [],
		action: app.viewLeft
	}) ).push( new Trigger({
		text: 'vr',
		description: 'Look at the right side',
		args: [],
		action: app.viewRight
	}) ).push( new Trigger({
		text: 'vt',
		description: 'looks down (from the top of the printer)',
		args: [],
		action: app.viewTop
	}) ).push( new Trigger({
		text: 'vb',
		args: [],
		action: app.viewBottom
	}) );
	
	return app;
	
})(app);
