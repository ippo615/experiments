
app = (function(app){

	app.inits = [];
	app.init = function(options){
		//for( var i=0, l=app.inits.length; i<l; i+=1 ){
		for( var i=app.inits.length; i--; ){
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

})({});


app = (function(app){

	app.dispatcher = new Dispatcher();

	function clear_input_text(){
		document.getElementById('in-text-cmd').value='';
	}
	function auto_complete_text(){
		var text = document.getElementById('in-text-cmd').value;
		var matches = app.dispatcher.find_matches(text);
		document.getElementById('in-text-cmd').value = matches[0].text;
	}

	function update_hints(){
		var text = document.getElementById('in-text-cmd').value;
		var matches = app.dispatcher.find_matches(text);
		var html = '';
		for( var i=0,l=matches.length; i<l; i+=1 ){
			html += matches[i].toHtml()+'<br/>';
		}
		document.getElementById('out-hint').innerHTML = html;
	}

	function try_to_run(){
		var text = document.getElementById('in-text-cmd').value;
		var result = app.dispatcher.exec(text);
		document.getElementById('out-hint').innerHTML = result;
	}

	function quick_run(){
		var text = document.getElementById('in-text-cmd').value;
		var matches = app.dispatcher.find_matches_without_args(text);
		if( matches.length === 1 ){
			var result = matches[0].exec( text );
			document.getElementById('out-hint').innerHTML = result;
			return true;
		}
		return false;
	}

	function onKeyUp( event ){
		switch( event.keyCode ){
			case 13: // enter
			//case 32: // space
				try {
					try_to_run();
				}catch(e){}
				return;
		}
		if( quick_run() ){
			clear_input_text();
		}else{
			update_hints();
		}
	}
	function onKeyDown( event ){
		switch( event.keyCode ){
			// esc
			case 27:
				clear_input_text();
				update_hints();
				return;

			// tab
			case 9:
				auto_complete_text();
				event.preventDefault();
				event.stopPropagation();
				return false;
		}
	}

	app.inits.push( function(){
		document.getElementById('in-text-cmd-hint').innerHTML = app.dispatcher.toHtml();
		document.getElementById('in-text-cmd').addEventListener('keyup',onKeyUp,false);
		document.getElementById('in-text-cmd').addEventListener('keydown',onKeyDown,false);
	});

	return app;
	
})(app);

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
		}, 750 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start().onUpdate(function(){
			console.info( 'fu' );
		});
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


app = (function(app){

	function init() {

		app.container = document.getElementById('rendering-area');
		app.sidebar = document.getElementById('sidebar');

		document.body.appendChild(app.container);

		app.scene = new THREE.Scene();

		app.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
		app.camera.position.z = 300;
		app.scene.add( app.camera );

		app.mainObject = new THREE.Object3D();
		app.scene.add(app.mainObject);

		app.renderer = new THREE.WebGLRenderer();
		app.renderer.setClearColor(0xf0f0f0);
		app.renderer.setSize(window.innerWidth, window.innerHeight);
		app.renderer.sortObjects = false;
		app.container.appendChild(app.renderer.domElement);

		app.domEvents = new THREEx.DomEvents(app.camera, app.renderer.domElement);

		var light = new THREE.DirectionalLight(0xffffff, 2);
		light.position.set(1, 1, 1).normalize();
		app.scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(-1, -1, -1).normalize();
		app.scene.add(light);

		var geometry = new THREE.BoxGeometry(20, 20, 20);

		//for (var i = 0; i < 20; i++) {
		//	createRandomly( geometry, scene );
		//}
		for( var x=0; x<3; x+=1 ){
			for( var y=0; y<3; y+=1 ){
				createThingy( x*60-60, y*60-60, 0, geometry, app.mainObject );
			}
		}

		document.getElementById('btn-view-default').addEventListener('click', app.viewAngle, false);
		document.getElementById('btn-view-front').addEventListener('click', app.viewFront, false);
		document.getElementById('btn-view-top').addEventListener('click', app.viewTop, false);
		document.getElementById('btn-view-bottom').addEventListener('click', app.viewBottom, false);
		document.getElementById('btn-view-left').addEventListener('click', app.viewLeft, false);
		document.getElementById('btn-view-right').addEventListener('click', app.viewRight, false);

	}

	app.inits.push( init );

	app.renders.push( function(){
		app.camera.lookAt( app.mainObject.position );
		app.camera.updateProjectionMatrix();
		TWEEN.update();
		app.renderer.render(app.scene, app.camera);
	});

	function createThingy(x,y,z,geometry,scene){
		var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
			color: Math.random() * 0xffffff
		}));
	
		object.position.x = x;
		object.position.y = y;
		object.position.z = z;

		object.rotation.x = Math.random() * 2 * Math.PI;
		object.rotation.y = Math.random() * 2 * Math.PI;
		object.rotation.z = Math.random() * 2 * Math.PI;

		app.scene.add(object);

		app.domEvents.addEventListener(object, 'mouseover', function(event){
			//console.info( event );
			new TWEEN.Tween( event.target.scale ).to( {
				x: 3,
				y: 3,
				z: 3
			}, 750 ).easing( TWEEN.Easing.Elastic.Out ).start();
		}, false);
		app.domEvents.addEventListener(object, 'mouseout', function(event){
			//console.info( event );
			new TWEEN.Tween( event.target.scale ).to( {
				x: 1,
				y: 1,
				z: 1
			}, 750 ).easing( TWEEN.Easing.Elastic.Out ).start();
		}, false);
		app.domEvents.addEventListener(object, 'click', function(event){
			console.info( event );
		}, false);

	}
	
	return app;

})(app);

