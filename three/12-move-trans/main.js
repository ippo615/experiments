
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

		app.control = new THREE.TransformControls( app.camera, app.renderer.domElement );
		app.control.setMode( "translate" );
		app.scene.add( app.control );

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

	app.inits.splice( 0,0, init );

	app.renders.push( function(){
		app.camera.lookAt( app.mainObject.position );
		app.camera.updateProjectionMatrix();
		TWEEN.update();
		app.control.update();
		app.renderer.render(app.scene, app.camera);
	});

	app.activeObject = null;

	function createThingy(x,y,z,geometry,parent){
		var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
			color: Math.random() * 0xffffff
		}));
	
		object.position.x = x;
		object.position.y = y;
		object.position.z = z;

		object.rotation.x = Math.random() * 2 * Math.PI;
		object.rotation.y = Math.random() * 2 * Math.PI;
		object.rotation.z = Math.random() * 2 * Math.PI;

		parent.add(object);

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
			if( app.activeObject && app.activeObject === event.target ){
				app.control.detach();
				app.activeObject = null;
			}else{
				app.activeObject = event.target;
				app.control.attach( event.target );
			}
			//console.info( app.control );
			//console.info( event );
		}, false);

	}
	
	return app;

})(app);
