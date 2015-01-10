
// TODO: Load from file data (ie not ajax, for drag and drop)

var StlPreview = (function(){

	function StlPreview( options ){
		this.filename = options.filename;
		this.width = ('width' in options) ? options.width : 320;
		this.height = ('height' in options) ? options.height : 240;
		this.parent = ('parent' in options) ? options.parent : null;
		this.showAABB = ('showAABB' in options) ? options.showAABB : false;

		var renderer;
		if( 'renderer' in options ){
			renderer = options.renderer;
		}else{
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(this.width,this.height);
		}
		this.renderer = renderer;

		if( this.parent ){
			this.parent.appendChild( this.renderer.domElement );
		}

		var scene;
		if( 'scene' in options ){
			scene = options.scene;
		}else{
			scene = new THREE.Scene();

			var light = new THREE.DirectionalLight(0xffffff, 2);
			light.position.set(1, 1, 1).normalize();
			scene.add(light);

			var light = new THREE.DirectionalLight(0xffffff);
			light.position.set(-1, -1, -1).normalize();
			scene.add(light);
		}
		this.scene = scene;

		var camera;
		if( 'camera' in options ){
			camera = options.camera;
		}else{
			camera = new THREE.PerspectiveCamera(
				50,
				this.width / this.height,
				1,
				10000
			);
			camera.position.z = -500;
			camera.lookAt( new THREE.Vector3(0,0,0) );
		}
		this.camera = camera;
		this.scene.add( this.camera );

		var materials;
		if( 'materials' in options ){
			materials = options.materials;
		}else{
			materials = [
				new THREE.MeshLambertMaterial({
					color: 0x0088FF
				})
			];
		}
		this.materials = materials;

		this.object = null;

		function makeOnLoad( that ){
			return function(event){
				event.content.computeBoundingBox();
				//event.content.computeFaceNormals();
				//event.content.computeVertexNormals();

				var center = event.content.boundingBox.max.clone().sub( event.content.boundingBox.min ).multiplyScalar(0.5);
				event.content.applyMatrix( (new THREE.Matrix4()).makeTranslation(
					-event.content.boundingBox.min.x - center.x,
					-event.content.boundingBox.min.y - center.y,
					-event.content.boundingBox.min.z - center.z
				) );
				that.object = new THREE.Object3D();
				var obj = THREE.SceneUtils.createMultiMaterialObject(
					event.content,
					that.materials
				);
				that.object.add( obj );

				if( that.showAABB ){
					var bbox = new THREE.BoundingBoxHelper( obj, 0xFFFFFF );
					bbox.update();
					that.object.add( bbox );
				}

				that.object.position.x = 0.0;
				that.object.position.y = 0.0;
				that.object.position.z = 0.0;
				that.scene.add(that.object);
			};
		}
		var loader = new THREE.STLLoader();
		loader.addEventListener( 'load', makeOnLoad(this) );
		loader.load( this.filename );

		this.renderLoop = makeRenderLoop( this );
	}

	function makeRenderLoop( that ){
		return function loop(){
			that.render();
			requestAnimationFrame(loop);
		}
	}

	StlPreview.prototype.render = function(){
		if( this.object ){
			this.object.rotation.z += 0.01;
			this.object.rotation.y += 0.01;
		}
		this.renderer.render(this.scene, this.camera);
	}
	StlPreview.prototype.setSize = function(w,h){
		this.renderer.setSize( w,h );
		this.camera.aspect = w/h;
		this.camera.updateProjectionMatrix();
	}

	return StlPreview;

})();
